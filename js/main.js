'use_strict'

import * as THREE from 'three'
import {OrbitControls} from 'OrbitControls'
import {GLTFLoader} from 'GLTFLoader'
import Player from './player.js'

// global vars
const canvas = document.getElementById('frame')
const renderer = new THREE.WebGLRenderer({canvas})
const scene = new THREE.Scene()
const manager = new THREE.LoadingManager()
const loadGLTF = new GLTFLoader(manager)

// common settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputEncoding = THREE.sRGBEncoding

// common vars
const collidableMeshList = [];
var loadStage = 0

manager.onStart = (url, itemsLoaded, itemsTotal) =>{
	//console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}
manager.onProgress = (url, itemsLoaded, itemsTotal) =>{
	//console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}
manager.onError = (url) =>{
	console.log('There was an error loading ' + url)
	//loaded = false
}
manager.onLoad = () =>{
	console.log('Loading completed!')
	loadStage = 1
}


// camera
const fov = 65
const aspect = 1
const near = 0.01
const far = 1000
const cameraOffsetX = 3
const cameraOffsetY = 4.2
const cameraOffsetZ = 3
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(cameraOffsetX, cameraOffsetY, cameraOffsetZ);
camera.lookAt(0, 0, 0);
scene.add(camera);

// more functionalities
//const controls = new OrbitControls(camera, renderer.domElement);

// light test
const ambiLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambiLight);

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
dirLight.castShadow = true;
dirLight.position.set(3, 3, 3);
scene.add(dirLight);

dirLight.shadow.mapSize.width = 512
dirLight.shadow.mapSize.height = 512
dirLight.shadow.camera.near = 0.001
dirLight.shadow.camera.far = 500


// terrain load test
var isFloor
var modelSrc = '../data/world1/Terrain1.gltf'
loadGLTF.load(modelSrc, function(gltf){
	//gltf.scenes[0].children[0].castShadow = true
	gltf.scenes[0].children[0].receiveShadow = true
	scene.add(gltf.scene)
	const floor = gltf.scenes[0].children[0]
	collidableMeshList.push(gltf.scenes[0].children[0])
	isFloor = 1
})

var modelSrc = '../data/Object1/StoneMuWall01.gltf'
loadGLTF.load(modelSrc, function(gltf){
	const obj = gltf.scene
	//gltf.scenes[0].children[0].castShadow = true
	gltf.scenes[0].children[0].receiveShadow = true
	scene.add(obj)
	collidableMeshList.push(gltf.scenes[0].children[0])
	obj.position.set(21, 0, 0)
	obj.rotation.y = deg2rad(90)
})
var modelSrc = '../data/Object1/StoneMuWall02.gltf'
loadGLTF.load(modelSrc, function(gltf){
	const obj = gltf.scene
	//gltf.scenes[0].children[0].castShadow = true
	gltf.scenes[0].children[0].receiveShadow = true
	scene.add(obj)
	collidableMeshList.push(gltf.scenes[0].children[0])
	obj.position.set(22, -1, 2.5)
	obj.rotation.y = deg2rad(90)
})
var modelSrc = '../data/Object1/Bridge01.gltf'
loadGLTF.load(modelSrc, function(gltf){
	const obj = gltf.scene
	//gltf.scenes[0].children[0].castShadow = true
	gltf.scenes[0].children[0].receiveShadow = true
	scene.add(obj)
	collidableMeshList.push(gltf.scenes[0].children[0])
	obj.position.set(28.5, 0, 2)
	obj.rotation.y = deg2rad(-90)
})



// player class
const player = new Player(0, 0, 0, 0, 0, 0)
player.loadBaseModel(loadGLTF)
player.loadBodyParts(loadGLTF)

// player common vars
//const playerSpeed = 0.03
const walkDir = [[0,0,0,0]]; // [[forward][backward][left][right]]
let flying = false







function main(){
	
	// event handlers
	addEventListener('keydown', keydown);
	addEventListener('keyup', keyup);
	
	
	animate()
	
	
	
}

function resizeRendererToDisplay(renderer){
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
	const width = canvas.clientWidth * pixelRatio | 0;
	const height = canvas.clientHeight * pixelRatio | 0;
	const needResize = canvas.width !== width || canvas.height !== height;
	if(needResize){
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function keydown(event){
	//console.log(event.keyCode);
	switch(event.keyCode){
		case 87:// w
			walkDir[0][0] = 1;
		break;
		case 83:// s
			walkDir[0][1] = 1;
		break;
		case 65:// a
			walkDir[0][2] = 1;
			
		break;
		case 68:// d
			walkDir[0][3] = 1;
			
		break;
		case 81:// 1
			//player.position.y += player.speed;
			
		break;
		case 69:// e
			//player.position.y -= player.speed;
			
		break;
		case 32:// e
			console.log(player.player.position)
			
		break;
	}
}

function keyup(event){
	switch(event.keyCode){
		case 87:// w
			walkDir[0][0] = 0;
		break;
		case 83:// s
			walkDir[0][1] = 0;
		break;
		case 65:// a
			walkDir[0][2] = 0;
		break;
		case 68:// d
			walkDir[0][3] = 0;
		break;
	}
}

function walk(){
	if(walkDir[0][0] == 1 && walkDir[0][2] == 1){// foward left
		player.player.position.z -= player.speed - ((player.speed / 10) * 2.9);// -29%
		player.player.position.x -= player.speed - ((player.speed / 10) * 2.9);// -29%
	}else if(walkDir[0][0] == 1 && walkDir[0][3] == 1){// foward right
		player.player.position.z -= player.speed - ((player.speed / 10) * 2.9);// -29%
		player.player.position.x += player.speed - ((player.speed / 10) * 2.9);// -29%
	}else if(walkDir[0][1] == 1 && walkDir[0][2] == 1){// backward left
		player.player.position.z += player.speed - ((player.speed / 10) * 2.9);// -29%
		player.player.position.x -= player.speed - ((player.speed / 10) * 2.9);// -29%
	}else if(walkDir[0][1] == 1 && walkDir[0][3] == 1){// backward right
		player.player.position.z += player.speed - ((player.speed / 10) * 2.9);// -29%
		player.player.position.x += player.speed - ((player.speed / 10) * 2.9);// -29%
	}else if(walkDir[0][0] == 1){// forward
		player.player.position.z -= player.speed;
	}else if(walkDir[0][1] == 1){// backward
		player.player.position.z += player.speed;
	}else if(walkDir[0][2] == 1){// left
		player.player.position.x -= player.speed;
	}else if(walkDir[0][3] == 1){// right
		player.player.position.x += player.speed;
	}
}

function playerOrientation(){
	// [[forward][backward][left][right]]
	if(walkDir[0][0] == 1 && walkDir[0][2] == 1){// forward left
		player.player.rotation.y = deg2rad(180 + 45)
	}else if(walkDir[0][0] == 1 && walkDir[0][3] == 1){// forward right
		player.player.rotation.y = deg2rad(180 - 45)
	}else if(walkDir[0][1] == 1 && walkDir[0][2] == 1){// backward left
		player.player.rotation.y = deg2rad(-45)
	}else if(walkDir[0][1] == 1 && walkDir[0][3] == 1){// backward right
		player.player.rotation.y = deg2rad(45)
	}else if(walkDir[0][0] == 1){// forward
		player.player.rotation.y = deg2rad(180)
	}else if(walkDir[0][1] == 1){// backward
		player.player.rotation.y = deg2rad(0)
	}else if(walkDir[0][2] == 1){// left
		player.player.rotation.y = deg2rad(-90)
	}else if(walkDir[0][3] == 1){// right
		player.player.rotation.y = deg2rad(90)
	}
}

function floorCollision(){
	let differential
	const offsetY = 0.05
	var globalRay = new THREE.Raycaster(player.player.position, new THREE.Vector3(player.player.position.x, -100, player.player.position.z).normalize())
	var linearCollision = globalRay.intersectObjects(collidableMeshList)
	
	if(linearCollision.length > 0){
		differential = linearCollision[0].distance - offsetY
		if(differential > 0){
			flying = true
		}
	}
	if(flying == true){
		player.player.position.y -= differential
	}
}

function deg2rad(degrees){
	return degrees * (Math.PI / 180);
}

function animate(){
	requestAnimationFrame(animate)
	// animation
	playerOrientation()
	walk()
	
	if(loadStage == 2 && player.mixer != null){
		//console.log("teste")
		player.mixer.update(0.005)
	}
	// end of animation
	render()
	update()
}

function update(){
	var delta = 0.001
	if(resizeRendererToDisplay(renderer)){
		const canvas = renderer.domElement
		camera.aspect = canvas.clientWidth / canvas.clientHeight
		camera.updateProjectionMatrix()
	}
	
	if(loadStage == 1){
		player.player.scale.set(0.01, 0.01, 0.01)
		player.player.position.y = 1
		scene.add(player.player)
		const skeletonHelper = new THREE.SkeletonHelper(player.player.children[0].children[0])
		skeletonHelper.scale.set(0.01, 0.01, 0.01)
		//scene.add(skeletonHelper)
		loadStage = 2
	}
	
	camera.position.set(player.player.position.x + cameraOffsetX, player.player.position.y + cameraOffsetY, player.player.position.z + cameraOffsetZ);// camera follows player
	//camera.lookAt(player.player)
	camera.updateProjectionMatrix()
	floorCollision()
	//controls.update()
}

function render(){
	renderer.render(scene, camera)
}

/* vertex collision system
for(var vertexIndex = 1; vertexIndex < cube.geometry.attributes.position.array.length; vertexIndex+=3){
	var localVertex = new THREE.Vector3().fromBufferAttribute(cube.geometry.attributes.position, vertexIndex).clone()
	var globalVertex = localVertex.applyMatrix4(cube.matrix)
	var directionVector = globalVertex.sub(cube.position)
	
	var vertexRay = new THREE.Raycaster(cube.position, directionVector.clone().normalize())
	var vertexCollisions = vertexRay.intersectObjects(collidableMeshList)
	
	if(vertexCollisions.length > 0 && vertexCollisions[0].distance < directionVector.length()){
		let calcDistanceY = cube.position.y + vertexCollisions[0].uv.y
		cube.position.y = calcDistanceY
	}
}
 */


main()