'use_strict'

import * as THREE from 'three'
import helms from './helms.js'
import armors from './armors.js'
import gloves from './gloves.js'
import pants from './pants.js'
import boots from './boots.js'

class Player{
	constructor(charClass, helm, armor, gloves, pants, boots){
		this.dataPath = '../data/player/'
		this.charClass = charClass
		this.helm = helm
		this.armor = armor
		this.gloves = gloves
		this.pants = pants
		this.boots = boots
		this.player = new THREE.Object3D()
		this.skeleton
		this.speed = 0.04
		this.walkDir = [[0,0,0,0]]
		this.flying = false
		this.skeleton
		this.mixer
		this.clips
		this.clip
		this.action

        this.state = "iddle"
        this.previousState = ""
	}

	setAnimationMixer (model) {
		this.mixer = new THREE.AnimationMixer(model.scene)
	}

	setClips (clips) {
		this.clips = clips
	}

	setClip (clipName) {
		this.clip = THREE.AnimationClip.findByName(this.clips, clipName)

		this.setAction(this.clip)
	}

	setAction (clip) {
		this.action = this.mixer.clipAction(clip)
	}

	updateAction (action) {
		this.action = action
	}

	setState (state) {
		this.state = state
	}

	loadBaseModel(loader) {
		loader.load(this.dataPath + 'Player.gltf', (gltf) =>{
			this.player.add(gltf.scene)

			this.setAnimationMixer(gltf)
			this.setClips(gltf.animations)
			this.setClip('player_2')

			this.action.play()

			this.skeleton = gltf.scene.children[0].children[0].skeleton
		})
	}

	loadBodyParts(loader) {
		loader.load(this.dataPath + helms[this.helm][0] + '.gltf', (gltf) =>{// helm
			gltf.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(gltf.scene)
		})
		loader.load(this.dataPath + armors[this.armor][0] + '.gltf', (gltf) =>{// armor
			gltf.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(gltf.scene)
		})
		loader.load(this.dataPath + gloves[this.gloves][0] + '.gltf', (gltf) =>{// gloves
			gltf.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(gltf.scene)
		})
		loader.load(this.dataPath + pants[this.pants][0] + '.gltf', (gltf) =>{// pants
			gltf.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(gltf.scene)
		})
		loader.load(this.dataPath + boots[this.boots][0] + '.gltf', (gltf) =>{// boots
			gltf.scene.children[0].children[0].skeleton = this.skeleton
			this.player.add(gltf.scene)
		})
	}

	updateAnimation(delta) {
		if (!this.mixer) return

		if(this.state == this.previousState) return

		let newClip;
		let newAction;

		switch(this.state){
			case "iddle":
				newClip = "player_2";
				break;
			case "walking":
				newClip = "player_40";
				break;
			default:
				newClip = "player_2";
				break;
		}

		console.log(this.state)
		newClip = THREE.AnimationClip.findByName(this.clips, newClip)

		newAction = this.mixer.clipAction(newClip)

		this.action.fadeOut(0.05)

		newAction.reset()
			.fadeIn(0.1)
			.play()

		this.previousState = this.state
		
		this.updateAction(newAction)

		this.mixer.update(delta)
	}
}

export default Player