import { helper_CollisionsItems_v02 } from '../../../_CORE/helpers/helper_CollisionsItems_v02'




export class system_PlayerMoveOnLevel {
    constructor (root) {


        const { 
            emitter, 
            CONSTANTS,
            player,
            //assets,
            //studio,
        } = root


        //player.mesh.position.fromArray([0, -40, 0])
        //player.mesh.position.fromArray([0, 0, 0])
        //player.mesh.position.fromArray([500, 0, -100])


        const collisionsWalls = new helper_CollisionsItems_v02()

        const {
            speed,
            //speedDown,
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


        const checkAndMoveFront = data => {
            const [isCollision, collision] = collisionsWalls.checkCollisions(player.mesh, player.frontObj, OFFSET_FROM_PLANES)

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
            const [isCollision] = collisionsWalls.checkCollisions(player.mesh, player.backObj, OFFSET_FROM_PLANES)
            if (isCollision) return;
                
            player.mesh.translateZ(speed * data.count)
            emitter.emit('playerMove')('back')
        }



        this.update = data => {
            if (this.isFreeze) {
                return;
            }
            //if (isButtonsDisabled) return;

            keys['left'] && player.mesh.rotateY(speedRot * data.count)
            keys['right'] && player.mesh.rotateY(-speedRot * data.count)

            if (isBlocked) return;

            //checkBottomAndDropDownPlayer(data)
            keys['up'] && this.isCanMove['forward'] && checkAndMoveFront(data)
            keys['down'] && this.isCanMove['back'] && checkAndMoveBack(data)
            keys['p'] && console.log(`player.mesh.position.fromArray([${player.mesh.position.x}, ${player.mesh.position.y}, ${player.mesh.position.z}])`)
        }
    


        emitter.subscribe('keyEvent')(data => {
            keys = data
        })
        //emitter.subscribe('frameUpdate')(update)


        this._collisionsWalls = collisionsWalls
    }


    addItemToPlayerCollision (item) {
        this._collisionsWalls.setItemToCollision(item)
    }

    removeItemFromPlayerCollision (item) {
        this._collisionsWalls.removeItemFromCollision(item)
    }

    toggleFreeze (val = !this.isFreeze) {
        this.isFreeze = val
    }
}


