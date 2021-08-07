import {
    setItemToFloorsCollision,
    removeItemFromFloorsCollision, 
} from '../components/component_collisionFloor'
import {
    setItemToWallCollision,
    removeItemFromWallCollision,
} from '../components/component_collisionWalls'
import * as THREE from 'three'
import { S, H } from '../constants/constants_elements'






const STANDART_ROOMS = ['room_02', 'room_03', 'room_04', 'room_05']
const START_ROOMS = ['outer_walls', 'outer_floor', 'outer_road']



export class Level {
    constructor(gameContext) {
        const { emitter, studio, store, prepareMeshes } = gameContext
        const { rooms, allMeshes } = prepareMeshes

        const group = new THREE.Group()
        studio.addToScene(group)
        const objRooms = {}


        //let isCanAddStairs = false
        let state = 'normal' // 'addBot' || 'addStairs' || 'addWell'


        const createRoom = (kv, key) => {
            const instanceKey = key || STANDART_ROOMS[Math.floor(Math.random() * STANDART_ROOMS.length)]

            const objKey = `r_${kv[0]}_${kv[1]}_${kv[2]}`

            const mesh = rooms[instanceKey].clone()
            mesh.position.set(kv[0] * S, kv[1] * H, kv[2] * S)
            setItemToFloorsCollision(mesh)
            setItemToWallCollision(mesh)
            group.add(mesh)
            objRooms[objKey] = mesh


            emitter.emit('levelChanged')({
                typeLevelChange: 'createRoom',
                instanceKey,
                objKey,
                kv,
                isAddBot: instanceKey === 'room_01'
            })

            instanceKey === 'room_06' && createRoom([kv[0], kv[1] + 1, kv[2]], 'room_dummy')
        }


        const removeRoom = kv => {
            const objKey = `r_${ kv[0] }_${ kv[1] }_${ kv[2] }`
            if (!objRooms[objKey]) return;


            const instanceKey = objRooms[objKey].name

            // objRooms[objKey].children[0].geometry.dispose()
            // objRooms[objKey].children[0].material.dispose()
            group.remove(objRooms[objKey])
            removeItemFromFloorsCollision(objRooms[objKey])
            removeItemFromWallCollision(objRooms[objKey])
            delete objRooms[objKey]


            emitter.emit('levelChanged')({
                typeLevelChange: 'destroyRoom',
                instanceKey,
                objKey,
                kv,
                isRemoveBot: instanceKey === 'room_01'
            })

            instanceKey === 'room_dummy' && removeRoom([kv[0], kv[1] - 1, kv[2]])
            instanceKey === 'room_06' && removeRoom([kv[0], kv[1] + 1, kv[2]])
        }






        createRoom([0, -1, 0], 'room_02')
        createRoom([0, -1, -1], 'room_02')
        createRoom([-1, -1, 0], 'room_02')
        createRoom([1, -1, 0], 'room_02')



        /** add remove start corridors */
        const startL = {}
        for (let i = 0; i < START_ROOMS.length; ++i) {
            const l = allMeshes[START_ROOMS[i]].clone()
            setItemToFloorsCollision(l)
            setItemToWallCollision(l)
            group.add(l)
            l.position.set(0, -1 * H, 0)
            startL[START_ROOMS[i]] = l
        }




        let wentLevels = 0
        let flagIsSpecial = false

        const initState = store.getState()
        let saveOldQuadrant = initState.app.playerQuadrant.oldQuadrant
        let saveNewQuadrant = initState.app.playerQuadrant.newQuadrant
        let saveIsStartCorridorShow = initState.app.level.isStartCorridorShow





        store.subscribe(() => {
            const newState = store.getState()

            if (saveIsStartCorridorShow && saveIsStartCorridorShow !== newState.app.level.isStartCorridorShow) {
                saveIsStartCorridorShow = false
                for (let key in startL) {
                    removeItemFromFloorsCollision(startL[key])
                    removeItemFromWallCollision(startL[key])
                    group.remove(startL[key])
                }
            }


            const { type, oldQuadrant, newQuadrant, counter } = newState.app.playerQuadrant


            if ( type !== 'CHANGE_QUADRANT' ) return;


            if (
                saveOldQuadrant[0] !== oldQuadrant[0] ||
                saveOldQuadrant[1] !== oldQuadrant[1] ||
                saveOldQuadrant[2] !== oldQuadrant[2] ||
                saveNewQuadrant[0] !== newQuadrant[0] ||
                saveNewQuadrant[1] !== newQuadrant[1] ||
                saveNewQuadrant[2] !== newQuadrant[2]
            ) {
                saveOldQuadrant = [...oldQuadrant]
                saveNewQuadrant = [...newQuadrant]
            } else {
                return;
            }


            //let keyCreateRoom = false
            let keyCreateRoom = STANDART_ROOMS[Math.floor(Math.random() * STANDART_ROOMS.length)]
            if (counter) {
                wentLevels = counter(wentLevels)

                if (flagIsSpecial) {
                    flagIsSpecial = false
                } else {
                    if (wentLevels < 3) {
                        state = 'normal'
                    } else if (wentLevels < 100) {
                        if (state === 'normal') {
                            state = 'addBot'
                        }
                    } else {
                        state = 'addStairs'
                    }


                    if (state === 'addBot') {
                        keyCreateRoom = 'room_01'
                        flagIsSpecial = true
                    }
                    if (state === 'addStairs') {
                        keyCreateRoom = 'room_06'
                        flagIsSpecial = true
                    }
                    if (state === 'addWell') {
                        keyCreateRoom = 'room_07'
                    }
                }
            }


            emitter.subscribe('changeLevelMode')(newMode => state = newMode)


            const oldKv = oldQuadrant, curKv = newQuadrant
            // move west
            if (curKv[0] < oldKv[0]) {
                console.log('----------- west')
                // remove east
                removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])

                // set center to east
                objRooms[`r_${curKv[0] + 1}_${curKv[1]}_${curKv[2]}`] = objRooms[`r_${oldKv[0]}_${oldKv[1]}_${oldKv[2]}`]

                // create west
                createRoom([oldKv[0] - 2, oldKv[1], oldKv[2]], keyCreateRoom)

                // remove north
                removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                createRoom([curKv[0], curKv[1], curKv[2] - 1], keyCreateRoom)

                // remove south
                removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create soush
                createRoom([curKv[0], curKv[1], curKv[2] + 1], keyCreateRoom)
            }

            // move east
            if (curKv[0] > oldKv[0]) {
                console.log('----------- east')
                // remove west
                removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])

                // set center to east
                objRooms[`r_${curKv[0] - 1}_${curKv[1]}_${curKv[2]}`] = objRooms[`r_${oldKv[0]}_${oldKv[1]}_${oldKv[2]}`]

                // create east
                createRoom([oldKv[0] + 2, oldKv[1], oldKv[2]], keyCreateRoom)

                // remove north
                removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                createRoom([curKv[0], curKv[1], curKv[2] - 1], keyCreateRoom)

                // remove south
                removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create south
                createRoom([curKv[0], curKv[1], curKv[2] + 1], keyCreateRoom)
            }


            // move north
            if (curKv[2] < oldKv[2]) {
                console.log('-----------north')
                // remove south
                removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])

                // set center to south
                objRooms[`r_${ curKv[0] }_${ curKv[1] }_${ curKv[2] + 1 }`] = objRooms[`r_${ oldKv[0] }_${ oldKv[1] }_${ oldKv[2] }`]

                // create north
                createRoom([oldKv[0], oldKv[1], oldKv[2] - 2], keyCreateRoom)

                // remove west
                removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create west
                createRoom([curKv[0] - 1, curKv[1], curKv[2]], keyCreateRoom)

                // remove east
                removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create east
                createRoom([curKv[0] + 1, curKv[1], curKv[2]], keyCreateRoom)
            }


            // move south
            if (curKv[2] > oldKv[2]) {
                console.log('-----------south')
                // remove north
                removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])

                // set center to north
                objRooms[`r_${ curKv[0] }_${ curKv[1] }_${ curKv[2] - 1 }`] = objRooms[`r_${ oldKv[0] }_${ oldKv[1] }_${ oldKv[2] }`]

                // create south
                createRoom([oldKv[0], oldKv[1], oldKv[2] + 2], keyCreateRoom)

                // remove west
                removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create west
                createRoom([curKv[0] - 1, curKv[1], curKv[2]], keyCreateRoom)

                // remove east
                removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create east
                createRoom([curKv[0] + 1, curKv[1], curKv[2]], keyCreateRoom)
            }

            // move top
            if (curKv[1] > oldKv[1] || curKv[1] < oldKv[1]) {
                console.log('-----------top')
                // remove north
                removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                createRoom([curKv[0], curKv[1], curKv[2] - 1])
                // remove south
                removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create south
                createRoom([curKv[0], curKv[1], curKv[2] + 1])
                // remove left
                removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create left
                createRoom([curKv[0] - 1, curKv[1], curKv[2]])
                // remove right
                removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create right
                createRoom([curKv[0] + 1, curKv[1], curKv[2]])
            }

        })
    }
}
