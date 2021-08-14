import * as THREE from 'three'

import { playerConfig } from '../constants/constants_elements'

import { createComponentCollisionFloors } from '../components/component_collisionFloor'
import { createComponentCollisionWalls } from '../components/component_collisionWalls'

import { FRAME_UPDATE } from '../constants/constants_elements'
import { showMessages, startPlay } from '../store/actions'



export class Player {
    constructor (gameContext) {
        const { emitter, studio, pr } = gameContext

        const {
            startPos,
            startRot,
            cameraData,
            frontObjPos,
            backObjPos,
            lightDataOne,
            speed,
            offsetFromFloor,
            offsetFromFloorFactor,
            speedDown,
            offsetWallCollision,
            speedRot,
        } = playerConfig


        this._camera = null
        let keys = {}
        let isButtonsDisabled = false
        this._isBlocked = true
        this._isCanMove = {
            'up': true,
            'down': true,
        }

        this._mainObj = new THREE.Object3D()
        this._mainObj.position.fromArray(startPos)
        this._mainObj.rotation.fromArray(startRot)

        const frontObj = new THREE.Object3D()
        frontObj.position.fromArray(frontObjPos)
        this._mainObj.add(frontObj)
        this.frontObj = frontObj

        const backObj = new THREE.Object3D()
        backObj.position.fromArray(backObjPos)
        this._mainObj.add(backObj)
        this.backObj = backObj

        {
            const { fov, ratio, near, far, pos } = cameraData
            this._camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
            this._camera.position.fromArray(pos)
            this._mainObj.add(this._camera)
        }

        {
            const { color, strenth, pos } = lightDataOne
            const light = new THREE.PointLight(color, strenth)
            light.position.fromArray(pos)
            this._mainObj.add(light)
        }


        this._checkFloors = createComponentCollisionFloors(this._mainObj, offsetFromFloor, offsetFromFloorFactor, speedDown)
        const checkWallsFront = createComponentCollisionWalls(this._mainObj, frontObj, offsetWallCollision)
        const checkWallsBack = createComponentCollisionWalls(this._mainObj, backObj, offsetWallCollision)

        let oldY = this._mainObj.position.y
        let countDropped = 0
        let isGameComplete = false

        const update = data => {
            if (isButtonsDisabled) return;
            if (this._isBlocked) return;

            this._checkFloors.check(data)

            if (!keys) return;

            if (keys['up']) {
                if (checkWallsFront.check()) return;
                if (!this._isCanMove['up']) return;

                this._mainObj.translateZ(-speed * data.count)
                emitter.emit('playerMove')({ pos: this._mainObj.position, dir: 'up' })
            }

            if (keys['down']) {
                if (checkWallsBack.check()) return;
                if (!this._isCanMove['down']) return;

                this._mainObj.translateZ(speed * data.count)
                emitter.emit('playerMove')({ pos: this._mainObj.position, dir: 'down' })
            }
            keys['left'] && (this._mainObj.rotation.y += (speedRot * data.count))
            keys['right'] && (this._mainObj.rotation.y -= (speedRot * data.count))


            if (oldY > this._mainObj.position.y) {
                ++countDropped
            } else {
                countDropped = 0
            }
            oldY = this._mainObj.position.y

            if (countDropped > 800 && !isGameComplete) {
                isGameComplete = true
                setTimeout(() => {
                    startPlay(pr.dispatch).startFinalFog()
                    setTimeout(() => {
                        showMessages(pr.dispatch).toggleFinalMessage(true)
                    }, 6000)
                }, 10000)
            }
        }


        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe(FRAME_UPDATE)(update)
        emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)


        studio.setCamera(this._camera)
        studio.addToScene(this._mainObj)
    }

    toggleBlocked (val) {
        this._isBlocked = val
    }

    toggleCanMove(key, val) {
        this._isCanMove[key] = val
    }

    getObj () {
        return this._mainObj
    }
    getCamera () {
        return this._camera
    }
    setToPos (x, y, z) {
        this._mainObj.position.set(x, y, z)
    }
}
