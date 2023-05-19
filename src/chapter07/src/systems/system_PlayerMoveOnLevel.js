import { helper_CollisionsItems_v02 } from '../../../_CORE/helpers/helper_CollisionsItems_v02'
import * as THREE from 'three'



export class system_PlayerMoveOnLevel {
    constructor (root) {


        const {
            emitter,
            CONSTANTS,
            player,
            assets,
            studio,
        } = root


        //player.mesh.position.fromArray([0, -40, 0])
        player.mesh.position.fromArray([0, 0, 0])

        this._collisionsBottom = new helper_CollisionsItems_v02()
        this._collisionsWalls = new helper_CollisionsItems_v02()

        const {
            speed,
            speedDown,
            speedRot,
        } = CONSTANTS.playerConfig

        let isBlocked = true
        player.toggleBlocked = val => isBlocked = val

        this.isCanMove = {
            'forward': true,
            'back': true,
        }
        player.toggleCanMove = (dir, val) => this.isCanMove[dir] = val


        this.isFreeze = false
        let keys = {}

        const OFFSET_FROM_PLANES = 17
        const OFFSET_FROM_PLANES_TO_DROP = 17.2




        const checkBottomAndDropDownPlayer = data => {
            const [isCollision, collision] = this._collisionsBottom.checkCollisions(player.mesh, player.bottomObj, OFFSET_FROM_PLANES_TO_DROP)

            /** move player to top if on stairs */
            if (isCollision && OFFSET_FROM_PLANES > collision.distance) {
                player.mesh.translateY(OFFSET_FROM_PLANES - collision.distance)

                return;
            }


            //console.log(data.count)
            /** free down without intercepts */
            if (!isCollision) {
                player.mesh.position.y += (speedDown * data.count)
            }

        }


        const checkAndMoveFront = data => {
            const [isCollision, collision] = this._collisionsWalls.checkCollisions(player.mesh, player.frontObj, OFFSET_FROM_PLANES)

            /** update level new area */
            if (isCollision) {
                if (collision.object.userData.type && collision.object.userData.type === 'alert') {
                    emitter.emit('collision')(collision.object.userData.event)
                }
                return;
            }

            player.mesh.translateZ(-speed * data.count)
            emitter.emit('playerMove')('forward')
        }



        const checkAndMoveBack = data => {
            const [isCollision] = this._collisionsWalls.checkCollisions(player.mesh, player.backObj, OFFSET_FROM_PLANES)
            if (isCollision) return;

            player.mesh.translateZ(speed * data.count)
            emitter.emit('playerMove')('back')
        }


        let isSoundWalk = false
        let savedPos = new THREE.Vector3()

        this.update = data => {
            if (this.isFreeze) {
                return;
            }

            keys['left'] && player.mesh.rotateY(speedRot * data.count)
            keys['right'] && player.mesh.rotateY(-speedRot * data.count)

            if (isBlocked) return;
            

            savedPos.x = player.mesh.position.x
            savedPos.y = player.mesh.position.y
            savedPos.z = player.mesh.position.z


            keys['up'] && this.isCanMove['forward'] && checkAndMoveFront(data)
            keys['down'] && this.isCanMove['back'] && checkAndMoveBack(data)



            if (
                savedPos.x === player.mesh.position.x &&
                savedPos.z === player.mesh.position.z &&
                isSoundWalk
            ) {
                isSoundWalk = false
                //root.system_Sound.stopWalk()
            }


            let isMustStartSound = false
            if (
                (savedPos.x !== player.mesh.position.x || savedPos.z !== player.mesh.position.z) &&
                !isSoundWalk
            ) {
                isMustStartSound = true
            }


            checkBottomAndDropDownPlayer(data)

            if (savedPos.y > player.mesh.position.y) {
                isSoundWalk = false
                //root.system_Sound.stopWalk()
                isMustStartSound = false
            }

            if (isMustStartSound) {
                isSoundWalk = true
                //root.system_Sound.startWalk()
            }

            keys['p'] && console.log(`player.mesh.position.fromArray([${player.mesh.position.x}, ${player.mesh.position.y}, ${player.mesh.position.z}])`)
        }



        emitter.subscribe('keyEvent')(data => keys = data)
        //emitter.subscribe('frameUpdate')(update)
    }


    addItemToPlayerCollision (item) {
        this._collisionsBottom.setItemToCollision(item)
    }

    removeItemFromPlayerCollision (item) {
        this._collisionsBottom.removeItemFromCollision(item)
    }

    addItemToPlayerCollisionWalls (item) {
        this._collisionsWalls.setItemToCollision(item)
    }
    
    removeItemToPlayerCollisionWalls (item) {
        this._collisionsWalls.removeItemFromCollision(item)
    }

    toggleFreeze (val = !this.isFreeze) {
        this.isFreeze = val
    }
}


