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


        const helperNear = helper_near(15)



        let keys = {}
        let isButtonsDisabled = false
        let isBlocked = false
        const isCanMove = {
            'up': true,
            'down': true,
        }

        let isDropDownY = true


    
    
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
                if (keys['up']) {
                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.frontObj, offsetWallCollision)
                    if (!isCollision) {
                        player._mainObj.translateZ(-speed * data.count)
                    } else {
                        if (collision.object.userData.isCanWalk) {
                            
                            helperNear.setToHistory(true)
                            if (helperNear.checkHistoryLen) {
                                if (!isDropDownY) {
                                   // player._camera.rotation.x = Math.PI / 2 
                                }
                                
                                isDropDownY = false
                                console.log(collision.face.normal)
                                
                                // NORMALNO БЕЗ ПОТОЛКА
                                const la = new THREE.Vector3().addVectors(player._mainObj.position, collision.face.normal)
                                player._mainObj.lookAt(la)
                                player._mainObj.rotateX(Math.PI / 2)
                                
                                
                                //player._mainObj.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)



                                // const n = collision.face.normal.clone();
                                // n.transformDirection( player._mainObj.matrixWorld );
                                // n.multiplyScalar( 10 );
                                // n.add( collision.point );
                                // player._mainObj.lookAt( n );








                                
                                //player._mainObj.setRotationFromAxisAngle(collision.face.normal,  Math.PI / 2)
                                
                                //player._mainObj.rotation.x = Math.PI / 2
                                //player._mainObj.up = collision.face.normal
                                helperNear.clearHistory()
                            }
                        } else {
                            helperNear.clearHistory()
                        }
                        
                    }
                    // else {
                    //     if (collision.distance < (offsetWallCollision))  {
                            
                    //     }                        
                    // }
                }

                if (keys['down']) {
                    helperNear.clearHistory()

                    const [isCollision, collision] = collisionsWalls.checkCollisions(player._mainObj, player.backObj, offsetWallCollision)
                    if (!isCollision) {
                        player._mainObj.translateZ(speed * data.count)
                    } 
                    // else {
                    //     if (collision.distance < (offsetWallCollision))  {
                            
                    //     }                        
                    // }
                }

            }

            //debugger;
            // if (!keys) return;
    
            // if (keys['up']) {
            //     if (!isCanMove['up']) return;
    
            //     if (root.systemCollisionItems) {
            //         const [ isBlockedByItem ] 
            //             = root.systemCollisionItems.checkCollisions(player._mainObj, player.frontObj, offsetWallCollision)
                    
                        
    
            //         if (isBlockedByItem) return;
            //     }
    
            //     player._mainObj.translateZ(-speed * data.count)
            //     emitter.emit('playerMove')({ pos: player._mainObj.position, dir: 'up' })
            // }
    
            // if (keys['down']) {
            //     if (!isCanMove['down']) return;
    
            //     if (root.systemCollisionItems) {
            //         const [ isBlockedByItem ] 
            //             = root.systemCollisionItems.checkCollisions(player._mainObj, player.backObj, offsetWallCollision)
            //         if (isBlockedByItem) return;
            //     }
    
            //     player._mainObj.translateZ(speed * data.count)
            //     emitter.emit('playerMove')({ pos: player._mainObj.position, dir: 'down' })
            // }
        }
    
    
        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe('frameUpdate')(update)
        //emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)

    }
} 



const helper_near = (minoffset) => {
    let arrHistory = []
    return {
        clearHistory () { 
            arrHistory = []
        },
        setToHistory (val) {
            arrHistory.push(val)
        },
        checkHistoryLen () {
            return arrHistory.length > minoffset
        } 
    }
}