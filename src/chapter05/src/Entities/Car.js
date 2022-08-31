import * as THREE from "three";
import { helper_CollisionsItems_v02 } from '../../../_CORE/helpers/helper_CollisionsItems_v02'

export class Car {
    constructor (root) {
        const {
            assets,
            CONSTANTS,
            emitter,
            materials,
        } = root

        const { position, rotation } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig.carProps

        this._model = assets.car.children[0]
        this._model.material = materials.car

        this._camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, .5, 10000)
        this._camera.position.y = 28
        this._model.add(this._camera)

        this._model.position.fromArray(position)
        this._model.rotation.fromArray(rotation)

        this._collision = assets.carCollision.children[0]
        this._collision.visible = false

        this._model.add(this._collision)

        this._frontObj = new THREE.Object3D()
        this._frontObj.position.set(0, 0, -.5)
        this._model.add(this._frontObj)

        this._backObj = new THREE.Object3D()
        this._backObj.position.set(0, 0, .5)
        this._model.add(this._backObj)



        this._collisionsWalls = new helper_CollisionsItems_v02()
        const checkCollision = (obj, d) => {
            const [is] = this._collisionsWalls.checkCollisions(this._model, obj, d)
            return is;
        }


        this.isFreeze = true

        let keys = {}

        this._onChangeStateIsStay = () => {}


        this._spd = 0
        this._acc = 0.1
        this._deceleration = 0.02
        this._maxSpdFront = -6
        this._maxSpdBack = 1
        this._spdRot = 0.03

        this._isCarStay = false



        this.update = data => {
            if (this.isFreeze) {
                return;
            }

            /** move car *************/
            if (this._spd < 0) {
                if (!checkCollision(this._frontObj, 30)) {
                    this._model.translateZ(this._spd * data.count)
                } else {
                    this._spd = 0
                }
            }
            if (this._spd > 0) {
                if (!checkCollision(this._backObj, 30)) {
                    this._model.translateZ(this._spd * data.count)
                } else {
                    this._spd = 0
                }
            }


            /** acceleration update speed *********/
            if (keys['up']) {
                this._spd -= this._acc
            }
            if (keys['down']) {
                this._spd += this._acc
            }


            /** slowdown update speed *********/
            if (Math.abs(this._spd) > 0.001) {
                if (this._spd > 0) {
                    this._spd -= this._deceleration
                    if (this._spd < 0) {
                        this._spd = 0
                    }
                }
                if (this._spd < 0) {
                    this._spd += this._deceleration
                    if (this._spd > 0) {
                        this._spd = 0
                    }
                }
                this._spd = Math.min(this._maxSpdBack, Math.max(this._maxSpdFront, this._spd))

                /** update car rotation ***********/
                const rotBySpeed = Math.min(1, Math.max(0, Math.abs(this._spd)))
                if (keys['left']) {
                    if (this._spd < 0) {
                        this._model.rotation.y += (this._spdRot * rotBySpeed)
                    }
                    if (this._spd > 0) {
                        this._model.rotation.y -= (this._spdRot * rotBySpeed)
                    }

                }
                if (keys['right']) {
                    if (this._spd < 0) {
                        this._model.rotation.y -= (this._spdRot * rotBySpeed)
                    }
                    if (this._spd > 0) {
                        this._model.rotation.y += (this._spdRot * rotBySpeed)
                    }
                }
            } else {
                this._spd = 0
            }

            /** callback change state stay or move *****/
            if (this._isCarStay && this._spd !== 0) {
                this._isCarStay = false
                this._onChangeStateIsStay('carStart')
            }
            if (!this._isCarStay && this._spd === 0) {
                this._isCarStay = true
                this._onChangeStateIsStay('carStop')
            }
        }
        
        emitter.subscribe('keyEvent')(data => keys = data)
        //emitter.subscribe('frameUpdate')(update)
    }

    setCollisionForDraw (mesh) {
        this._collisionsWalls.setItemToCollision(mesh)
    }

    removeCollisionForDraw (mesh) {
        this._collisionsWalls.removeItemFromCollision(mesh)
    }

    getModel () {
        return this._model
    }

    getCollision () {
        return this._collision
    }

    getCamera () {
        return this._camera
    }

    toggleFreeze (val) {
        console.log('freeze')
        this.isFreeze = val
    }

    onChangeCarStateMove (fn) {
        this._onChangeStateIsStay = fn
    }

    getPosition () {
        return this._model.position
    }

    getQuaternion () {
        return this._model.quaternion
    }
}