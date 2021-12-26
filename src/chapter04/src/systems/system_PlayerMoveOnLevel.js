import { helper_CollisionsItems_v02 } from '../../../_CORE/helpers/helper_CollisionsItems_v02'
import * as THREE from 'three'


export class system_PlayerMoveOnLevel {
    constructor (root) {
        const { 
            emitter, 
            CONSTANTS ,
            player,
            level,
        } = root

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
            offsetWallCollision,
            speedDown,
            speedRot,
        } = CONSTANTS.playerConfig



        console.log('player', player)
        console.log('emitter', emitter)
        console.log('level', level)
    


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

        let isDropDownY = true


        const quaternionOld = new THREE.Quaternion()
        const quaternionNew = new THREE.Quaternion()
        //player._mainObj.matrixAutoUpdate = false
    
    
        const update = data => {
            if (isButtonsDisabled) return;

            keys['left'] && (player._mainObj.rotateY(speedRot * data.count))
            keys['right'] && (player._mainObj.rotateY(-speedRot * data.count))


            if (isBlocked) return;

            /** check bottom floors */
            // if (isDropDownY) {
            //     const [isCollision, collision] = collisionsFloor.checkCollisions(player._mainObj, player.bottomObj, offsetFromFloor)
            //     if (!isCollision) {
            //             player._mainObj.position.y += speedDown
            //     } else {
            //         if (collision.distance < (offsetFromFloor - offsetFromFloorFactor))  {
            //             player._mainObj.position.y = collision.point.y + offsetFromFloor
            //         }                        
            //     }
            // }

            /** check walls */
            {
                if (keys['up'] && isCanMove['up']) {
                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.frontObj, offsetWallCollision)
                    if (!isCollision) {
                        player._mainObj.translateZ(-speed * data.count)
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




                        } else {
                        }
                        
                    }
                }

                if (keys['down']) {
                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.backObj, offsetWallCollision)
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
    return new Promise(res => {
        let n = 0
        const update = () => {
            n += 0.01
            n > 1 && (n = 1)
            mesh.quaternion.slerpQuaternions(q1, q2, n)

            if (n === 1) {
                return res()
            }

            setTimeout(update, 0.015)
        }

        update()
    })
}