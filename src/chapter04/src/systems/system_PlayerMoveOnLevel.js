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

        const {
            speed,
            speedDown,
            speedRot,
        } = CONSTANTS.playerConfig

        const OFFSET_FROM_PLANES = 5


        /** set items to collisions */
        const collisionsFloor = new helper_CollisionsItems_v02()
        for (let key in level.allMeshes) {
            collisionsFloor.setItemToCollision(level.allMeshes[key])
        }

        const collisionsWalls = new helper_CollisionsItems_v02()
        for (let key in level.allMeshes) {
            if (key === 'road_wall') {
                level.allMeshes[key].userData['isCanWalk'] = true
            }

            collisionsWalls.setItemToCollision(level.allMeshes[key])
        }



        let keys = {}
        let isButtonsDisabled = false
        let isBlocked = false
        const isCanMove = {
            'up': true,
            'down': true,
        }
        const quaternionOld = new THREE.Quaternion()
        const quaternionNew = new THREE.Quaternion()
        const upDefaultVector = new THREE.Vector3(0, 1, 0)



        const rotatePlayerToTop = () => {
            isCanMove['up'] = false
            quaternionOld.copy(player._mainObj.quaternion)
            quaternionNew.setFromAxisAngle(upDefaultVector, Math.random() * Math.PI * 2 )
            helper_rotate(player._mainObj, quaternionOld, quaternionNew)
                .then(() => {
                    player._mainObj.up.copy(upDefaultVector)
                    isCanMove['up'] = true
                })
        }

    
    
        const update = data => {
            if (isButtonsDisabled) return;

            keys['left'] && (player._mainObj.rotateY(speedRot * data.count))
            keys['right'] && (player._mainObj.rotateY(-speedRot * data.count))


            if (isBlocked) return;

            /** check bottom floors */

            if (isCanMove['up']) {
                const [isCollision, collision] = collisionsFloor.checkCollisions(player._mainObj, player.bottomObj, OFFSET_FROM_PLANES + 0.2)


                /** free down without intercepts */
                if (!isCollision) {

                    /** if player not up - rotated to up */
                    !player._mainObj.up.equals(upDefaultVector) && rotatePlayerToTop()

                    player._mainObj.position.y += speedDown

                /** check collisionFloor */
                } else {

                    /** check is player in wall and must down - rotate to top */
                    if (
                        !collision.object.userData.isCanWalk &&
                        !player._mainObj.up.equals(upDefaultVector)
                    ) {

                        rotatePlayerToTop()

                    } else {

                        if (collision.distance < 4.5) {
                            player._mainObj.translateY(OFFSET_FROM_PLANES - collision.distance)
                        }
                    }
                }
            }



            /** check walls */
            {
                if (keys['up'] && isCanMove['up']) {


                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.frontObj, OFFSET_FROM_PLANES)

                    /** move player to front */
                    if (!isCollision) {


                        player._mainObj.translateZ(-speed * data.count)


                    /** rotate player to wall */
                    } else {


                        if (collision.object.userData.isCanWalk) {
                            if (isCanMove['up']) {

                                quaternionOld.copy(player._mainObj.quaternion)
                                const la = new THREE.Vector3().addVectors(player._mainObj.position, collision.face.normal)
                                player._mainObj.lookAt(la)
                                player._mainObj.up.copy(collision.face.normal)
                                player._mainObj.rotateX(Math.PI / 2)
                                quaternionNew.copy(player._mainObj.quaternion)

                                player._mainObj.setRotationFromQuaternion(quaternionOld)


                                isCanMove['up'] = false
                                helper_rotate(player._mainObj, quaternionOld, quaternionNew)
                                    .then(() => {
                                        isCanMove['up'] = true
                                    })
                            }
                        }
                    }
                }


                if (keys['down']) {
                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.backObj, OFFSET_FROM_PLANES)
                    if (!isCollision) {
                        player._mainObj.translateZ(speed * data.count)
                    }
                }

            }
        }
    
    
        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe('frameUpdate')(update)
        //emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)

    }
} 





const helper_rotate = (mesh, q1, q2) => {
    console.log('startRotate')
    return new Promise(res => {
        let n = 0
        const update = () => {
            n += 0.03
            n > 1 && (n = 1)
            mesh.quaternion.slerpQuaternions(q1, q2, n)

            if (n === 1) {
                return res()
            }

            setTimeout(update, 15)
        }

        update()
    })
}