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
        this._model.add(this._camera)

        this._model.position.fromArray(position)
        this._model.rotation.fromArray(rotation)

        this._collision = assets.carCollision.children[0]
        this._collision.visible = false

        this._model.add(this._collision)



        this.isCanMove = {
            'forward': true,
            'back': true,
        }

        this._isFreeze = true

        let keys = {}





        const checkAndMoveFront = data => {
            //const [isCollision, collision] = collisionsWalls.checkCollisions(player.mesh, player.frontObj, OFFSET_FROM_PLANES)

            // /** update level new area */
            // if (isCollision) {
            //     if (collision.object.userData.type && collision.object.userData.type === 'alert') {
            //         emitter.emit('collision')(collision.object.userData.event)
            //     }
            // }

            //if (!isCollision) {
                this._model.translateZ(-10 * data.count)


        }



        // const checkAndMoveBack = data => {
        //     const [isCollision] = collisionsWalls.checkCollisions(player.mesh, player.backObj, OFFSET_FROM_PLANES)
        //     if (isCollision) return;
        //
        //     player.mesh.translateZ(speed * data.count)
        //     emitter.emit('playerMove')('back')
        // }



        const update = data => {
            if (this._isFreeze) {
                return;
            }

            //if (this.isFreeze) {
            //    return;
            //}
            //if (isButtonsDisabled) return;

            //keys['left'] && player.mesh.rotateY(speedRot * data.count)
            //keys['right'] && player.mesh.rotateY(-speedRot * data.count)

            //if (isBlocked) return;

            //checkBottomAndDropDownPlayer(data)
            keys['up'] && this.isCanMove['forward'] && checkAndMoveFront(data)
            //keys['down'] && this.isCanMove['back'] && checkAndMoveBack(data)
            //keys['p'] && console.log(`player.mesh.position.fromArray([${player.mesh.position.x}, ${player.mesh.position.y}, ${player.mesh.position.z}])`)
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
}