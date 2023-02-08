'use_strict'

import * as THREE from 'three'
import helms from './helms.js'
import armors from './armors.js'
import gloves from './gloves.js'
import pants from './pants.js'
import boots from './boots.js'

class Player{
	constructor(charClass, helm, armor, gloves, pants, boots){
		this.playerPath = '../data/player/'
		this.charClass = charClass
		this.helm = helm
		this.armor = armor
		this.gloves = gloves
		this.pants = pants
		this.boots = boots
		this.player = new THREE.Object3D()
		this.baseModel
		this.skeleton
		this.speed = 0.04
		this.walkDir = [[0,0,0,0]]
		this.flying = false
		this.skeleton
		this.mixer
		this.clips
		this.clip
		this.action
	}
	
	loadBaseModel(loader){
		loader.load(this.playerPath + 'Player.gltf', (gltf) =>{
			this.baseModel = gltf
			this.player.add(this.baseModel.scene)
			this.mixer = new THREE.AnimationMixer(this.baseModel.scene)
			this.clips = this.baseModel.animations
			this.clip = THREE.AnimationClip.findByName(this.clips, 'player_40')
			this.action = this.mixer.clipAction(this.clip)
			this.action.play()
			//console.log(this.baseModel)
			this.skeleton = this.baseModel.scene.children[0].children[0].skeleton
			//console.log(this.skeleton)
		})
	}
	
	loadBodyParts(loader){
		loader.load(this.playerPath + helms[this.helm][0] + '.gltf', (gltf) =>{// helm
			let root = gltf
			root.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(root.scene)
			//console.log(root.scene.children[0].children[7].material)
		})
		loader.load(this.playerPath + armors[this.armor][0] + '.gltf', (gltf) =>{// armor
			let root = gltf
			root.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(root.scene)
		})
		loader.load(this.playerPath + gloves[this.gloves][0] + '.gltf', (gltf) =>{// gloves
			let root = gltf
			root.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(root.scene)
		})
		loader.load(this.playerPath + pants[this.pants][0] + '.gltf', (gltf) =>{// pants
			let root = gltf
			root.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(root.scene)
		})
		loader.load(this.playerPath + boots[this.boots][0] + '.gltf', (gltf) =>{// boots
			let root = gltf
			root.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(root.scene)
		})
	}
	
	xx(){
		console.log('funcionou')
	}
}

export default Player