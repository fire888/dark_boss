import * as THREE from "three";

export class Car {
    constructor (root) {
        const {
            assets,
            CONSTANTS,
            emitter,
        } = root

        const { position, rotation } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig.carProps

        this._model = assets.car.children[0]

        this._camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, .5, 1000)
        this._camera.position.y = 28
        this._model.add(this._camera)

        this._model.position.fromArray(position)
        this._model.rotation.fromArray(rotation)

        this._collision = assets.carCollision.children[0]
        this._collision.visible = false

        this._model.add(this._collision)


        this._isFreeze = true

        let keys = {}

        this._onChangeStateIsStay = () => {}



        const checkCollision = () => {
            return false;
        }


        this._spd = 0
        this._acc = 0.1
        this._deceleration = 0.02
        this._maxSpdFront = -6
        this._maxSpdBack = 1
        this._spdRot = 0.03

        this._isCarStay = false



        const update = data => {
            if (this._isFreeze) {
                return;
            }

            /** move car *************/
            if (!checkCollision(data)) {
                this._model.translateZ(this._spd * data.count)
            } else {
                this._spd = 0
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
        emitter.subscribe('frameUpdate')(update)


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
        this._isFreeze = val
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