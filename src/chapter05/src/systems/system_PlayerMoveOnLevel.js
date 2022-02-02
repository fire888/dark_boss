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



        let currentArea = 0
        player.mesh.position.fromArray([0, -40, 0])



        const collisionsWalls = new helper_CollisionsItems_v02()
        const updateLevel = changerAreaLevel(assets.areas, studio, collisionsWalls, emitter)
        updateLevel(currentArea)


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


        let isButtonsDisabled = false
        let keys = {}
    
        const quaternionOld = new THREE.Quaternion()
        const quaternionNew = new THREE.Quaternion()

        const UP_VECTOR = new THREE.Vector3(0, 1, 0)
        const OFFSET_FROM_PLANES = 17
        const OFFSET_FROM_PLANES_TO_DROP = 17.2



        const rotatePlayerToTop = () => {
            quaternionOld.copy(player.mesh.quaternion)
            quaternionNew.setFromAxisAngle(UP_VECTOR, Math.random() * Math.PI * 2)

            isBlocked = true
            helper_rotate(player.mesh, quaternionOld, quaternionNew)
                .then(() => {
                    player.mesh.up.copy(UP_VECTOR)
                    isBlocked = false
                })
        }



        const rotatePlayerToCollisionTarget = collision => {
            quaternionOld.copy(player.mesh.quaternion)
            const la = new THREE.Vector3().addVectors(player.mesh.position, collision.face.normal)
            player.mesh.lookAt(la)
            player.mesh.up.copy(collision.face.normal)
            player.mesh.rotateX(Math.PI / 2)
            quaternionNew.copy(player.mesh.quaternion)

            player.mesh.setRotationFromQuaternion(quaternionOld)

            isBlocked = true
            helper_rotate(player.mesh, quaternionOld, quaternionNew)
                .then(() => {
                    isBlocked = false
                })
        } 



        const checkBottomAndDropDownPlayer = data => {
            const [isCollision, collision] = collisionsWalls.checkCollisions(player.mesh, player.bottomObj, OFFSET_FROM_PLANES_TO_DROP)

            /** move player to top if on stairs */
            if (isCollision && OFFSET_FROM_PLANES > collision.distance) {
                player.mesh.translateY(OFFSET_FROM_PLANES - collision.distance)

                return;
            }


            /** free down without intercepts */
            if (!isCollision) {
                /** if player not up - rotated to up */
                !player.mesh.up.equals(UP_VECTOR) && rotatePlayerToTop()
                player.mesh.position.y += (speedDown * data.count)

                return;
            }

            /** check is player in wall and must down - rotate to top */
            if (
                !collision.object.userData['isWallWalking'] &&
                !player.mesh.up.equals(UP_VECTOR)
            ) {
                rotatePlayerToTop()
                
                return;
            }
        }


        const checkAndMoveFront = data => {
            const [isCollision, collision] = collisionsWalls.checkCollisions(player.mesh, player.frontObj, OFFSET_FROM_PLANES)

            /** update level new area */
            if (isCollision) {
                if (collision.object.userData.area !== currentArea) {
                    currentArea = collision.object.userData.area
                    updateLevel(currentArea)
                }

                if (collision.object.userData.type && collision.object.userData.type === 'alert') {
                    emitter.emit('collision')(collision.object.userData.event)                        
                    //console.log(collision.object.userData.event)
                }
            }

            if (!isCollision) {
                player.mesh.translateZ(-speed * data.count)
                emitter.emit('playerMove')('forward')
            } else if (collision.object.userData['isWallWalking']) {
                rotatePlayerToCollisionTarget(collision)
            }
        }
        
        

        const checkAndMoveBack = data => {
            const [isCollision] = collisionsWalls.checkCollisions(player.mesh, player.backObj, OFFSET_FROM_PLANES)
            if (isCollision) return;
                
            player.mesh.translateZ(speed * data.count)
            emitter.emit('playerMove')('back')
        }



        const update = data => {
            if (isButtonsDisabled) return;

            keys['left'] && player.mesh.rotateY(speedRot * data.count)
            keys['right'] && player.mesh.rotateY(-speedRot * data.count)

            if (isBlocked) return;

            checkBottomAndDropDownPlayer(data)
            keys['up'] && this.isCanMove['forward'] && checkAndMoveFront(data)
            keys['down'] && this.isCanMove['back'] && checkAndMoveBack(data)
            keys['p'] && console.log(`player.mesh.position.fromArray([${player.mesh.position.x}, ${player.mesh.position.y + 25}, ${player.mesh.position.z}])`)
        }
    


        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe('frameUpdate')(update)


        this._collisionsWalls = collisionsWalls
    }


    addItemToPlayerCollision (item) {
        this._collisionsWalls.setItemToCollision(item)
    }
} 





const helper_rotate = (mesh, quat1, quat2) => {
    return new Promise(resolve => {
        let n = 0

        const update = () => {
            n += 0.03
            n > 1 && (n = 1)

            mesh.quaternion.slerpQuaternions(quat1, quat2, n)

            if (n === 1) {
                return resolve()
            }

            setTimeout(update, 15)
        }

        update()
    })
}




const changerAreaLevel = (areas, studio, collisionsWalls, emitter) => {
    const changeViewLevel = (ind, action) => {
        if (!areas[ind]) return;

        for (let i = 0; i < areas[ind].length; ++i) {
            const mesh = areas[ind][i]
            if (action === 'remove') studio.removeFromScene(mesh)
            if (action === 'add') studio.addToScene(mesh)
        }
    }

    const changeCollisionLevel = (ind, action) => {
        if (!areas[ind]) return;

        for (let i = 0; i < areas[ind].length; ++i) {
            const mesh = areas[ind][i]
            if (action === 'remove') collisionsWalls.removeItemFromCollision(mesh)
            if (action === 'add') collisionsWalls.setItemToCollision(mesh)
        }
    }


    const updateLevel = index => {
        console.log(index)
        emitter.emit('levelChanged')(index)


        changeViewLevel(index - 4, 'remove')
        changeViewLevel(index - 3, 'remove')
        changeViewLevel(index - 2, 'add')
        changeViewLevel(index - 1, 'add')
        changeViewLevel(index, 'add')
        changeViewLevel(index + 1, 'add')
        changeViewLevel(index + 2, 'add')
        changeViewLevel(index + 3, 'add')


        changeCollisionLevel(index - 3, 'remove')
        changeCollisionLevel(index - 2, 'remove')
        changeCollisionLevel(index - 1, 'add')
        changeCollisionLevel(index, 'add')
        changeCollisionLevel(index + 1, 'add')
        changeCollisionLevel(index + 2, 'add')
    }


    return updateLevel
}

