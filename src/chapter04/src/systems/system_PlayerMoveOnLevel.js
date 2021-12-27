import { helper_CollisionsItems_v02 } from '../../../_CORE/helpers/helper_CollisionsItems_v02'
import * as THREE from 'three'



export class system_PlayerMoveOnLevel {
    constructor (root) {
        const { 
            emitter, 
            CONSTANTS,
            player,
            level,
        } = root



        /** set items to collisions */
        const collisionsWalls = new helper_CollisionsItems_v02()
        for (let key in level.allMeshes) {
            if (key === 'road_wall') {
                level.allMeshes[key].userData['isWallWalking'] = true
            }

            collisionsWalls.setItemToCollision(level.allMeshes[key])
        }



        const {
            speed,
            speedDown,
            speedRot,
        } = CONSTANTS.playerConfig

        let isBlocked = false
        player.toggleBlocked = val => isBlocked = val

        let isButtonsDisabled = false
        let keys = {}
    
        const quaternionOld = new THREE.Quaternion()
        const quaternionNew = new THREE.Quaternion()

        const UP_VECTOR = new THREE.Vector3(0, 1, 0)
        const OFFSET_FROM_PLANES = 17
        const OFFSET_FROM_PLANES_TO_DROP = 17.2
        const OFFSET_FROM_PLANES_TO_STAIR = 16.5






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

            /** move player to top if on stairs */
            if (collision.distance < OFFSET_FROM_PLANES_TO_STAIR) {
                player.mesh.translateY(OFFSET_FROM_PLANES - collision.distance)
            }
        }




        const checkAndMoveFront = data => {
            const [isCollision, collision] = collisionsWalls.checkCollisions(player.mesh, player.frontObj, OFFSET_FROM_PLANES)

            if (!isCollision) {
                player.mesh.translateZ(-speed * data.count)
            } else if (collision.object.userData['isWallWalking']) {
                rotatePlayerToCollisionTarget(collision)
            }
        }
        
        


        const checkAndMoveBack = data => {
            const [isCollision] = collisionsWalls.checkCollisions(player.mesh, player.backObj, OFFSET_FROM_PLANES)
            if (!isCollision) return;
                
            player.mesh.translateZ(speed * data.count)
        }


    
    
        const update = data => {
            if (isButtonsDisabled) return;

            keys['left'] && player.mesh.rotateY(speedRot * data.count)
            keys['right'] && player.mesh.rotateY(-speedRot * data.count)

            if (isBlocked) return;

            checkBottomAndDropDownPlayer(data)
            keys['up'] && checkAndMoveFront(data)
            keys['down'] && checkAndMoveBack(data)
        }
    
    


        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe('frameUpdate')(update)
        emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)
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

