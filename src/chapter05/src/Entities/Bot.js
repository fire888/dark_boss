import * as THREE from 'three'
import { GLTFCopy } from '../../../_CORE/helpers/helper_GLTFcopy'


const OFFSETS = {
    'room_01': { x: 55, z: 75}
}

export class Bot {
    constructor () {
        this.inScene = false

        this._state = 'go' // || 'rotate' || 'say'

        this._targetAngle = null


        this.container = new THREE.Group()

        this._modelGroup = new THREE.Group()
        this._modelGroup.position.x = OFFSETS['room_01'].x
        this._modelGroup.position.z = OFFSETS['room_01'].z
        this._modelGroup.rotation.y = Math.random() * (2 * Math.PI)
        this.container.add(this._modelGroup)

        this._objFrom = new THREE.Object3D()
        this._modelGroup.add(this._objFrom)


        this._objTo = new THREE.Object3D()
        this._objTo.position.set(0, 0, 1)
        this._modelGroup.add(this._objTo)


        const copy = GLTFCopy(Bot.botScene)
        this.model = copy.scene.children[0]
        this.model.children[1].material = Bot.botMaterial
        this._animations = Bot.botScene.animations
        this._mixer = new THREE.AnimationMixer(this.model.children[1])
        this._walkAction = this._mixer.clipAction(this._animations[1])
        this._walkAction.play()
        this._walkAction.timeScale = .7

        this._speakAction = this._mixer.clipAction(this._animations[0])
        this._speakAction.timeScale = .4

        this._modelGroup.add(this.model)
    }


    update (data) {
        this._mixer.update(data.delta)

        if (!this._componentCollision) return;

        this._updateState()
    }


    setCollisionMesh (mesh) {
        this._collisionMeshes = [mesh]
        this.container.add(mesh)
        mesh.material.visible = false


        this._componentCollision = createComponentCollisionWalls(this._objFrom, this._objTo, 7, this._collisionMeshes)
    }

    removeCollisionMesh () {
        this._collisionMeshes = null
        this._componentCollision = null
    }


    prepareToSay (pos) {
        this._state = 'say'
        this._walkAction.stop()
        this._speakAction.play()
        this._modelGroup.lookAt(pos.x, this.container.position.y, pos.z)
    }


    /** internal *****************************/

    _updateState () {
        if (this._state === 'go') {
            const isNear = this._componentCollision.check()
            if (!isNear) {
                this._modelGroup.translateZ(0.05)
            } else {
                this._startRotate()
            }
        }

        if (this._state === 'rotate') {
            this._modelGroup.rotation.y += ((this._targetAngle - this._modelGroup.rotation.y) < 0) ? -.01 : .01
            this._modelGroup.rotation.y %= 2 * Math.PI
            const isComplete = Math.abs(this._modelGroup.rotation.y - this._targetAngle) < .5
            isComplete && this._startGo()
        }
    }



    _startGo () {
        this._state = 'go'
        this._walkAction.play()
        this._speakAction.stop()
    }


    _startRotate() {
        this._state = 'rotate'
        this._targetAngle = (this._modelGroup.rotation.y + 1.5 + Math.random() * 4) % (2 * Math.PI)
    }
}

Bot.botScene = null
Bot.botMaterial = null







export const createComponentCollisionWalls = (objFrom, objTo, offset, arrWalls) => {
    const vec3Src2 = new THREE.Vector3()
    const vec3Ray2 = new THREE.Vector3()

    return {
        check: () => {
            objTo.getWorldPosition(vec3Ray2)
            objFrom.getWorldPosition(vec3Src2)
            vec3Ray2.sub(vec3Src2)

            const raycasterWalls = new THREE.Raycaster(vec3Src2, vec3Ray2, 0, 20)
            const intersectsWalls = raycasterWalls.intersectObject(arrWalls[0], true)

            return !!intersectsWalls[0]
        }
    }
}