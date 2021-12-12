
import * as THREE from 'three'
import { S, H } from '../constants/constants_elements'
import { uiState } from '../store/createStore'


const STANDART_ROOMS = ['room_02', 'room_03', 'room_04', 'room_05']
const START_ROOMS = ['outer_walls', 'outer_floor', 'outer_road']


export class Level {
    constructor(gameContext) {
        this._root = gameContext

        const {
            emitter,
            studio,
            assets,
            materials,
            systemCollisionFloor,
            systemCollisionItems,
        } = gameContext
        const { rooms, allMeshes, collisionsBotsRooms } = createLevelMeshes(assets, materials)

        this._instanceRooms = rooms

        this.collisionsBotsRooms = collisionsBotsRooms


        this._group = new THREE.Group()
        studio.addToScene(this._group)
        this._objRooms = {}


        this._state = 'normal' // 'addBot' || 'addStairs' || 'addWell'
        emitter.subscribe('changeLevelMode')(newMode => {
            console.log('changeLevelMode', newMode)
            this._state = newMode
        })


        this._createRoom([0, -1, 0], 'room_02')
        this._createRoom([0, -1, -1], 'room_02')
        this._createRoom([-1, -1, 0], 'room_02')
        this._createRoom([1, -1, 0], 'room_02')



        /** add remove start corridors */
        this._startL = {}
        for (let i = 0; i < START_ROOMS.length; ++i) {
            const l = allMeshes[START_ROOMS[i]].clone()
            systemCollisionFloor.setItemToCollision({ mesh: l })
            systemCollisionItems.setItemToCollision({ mesh: l })
            this._group.add(l)
            l.position.set(0, -1 * H, 0)
            this._startL[START_ROOMS[i]] = l
        }


        this._wentLevels = 0
        this._flagIsSpecial = false


        const { oldQuadrant, newQuadrant } = uiState.playerQuadrant
        this._saveOldQuadrant = oldQuadrant
        this._saveNewQuadrant = newQuadrant
        this._saveIsStartCorridorShow = uiState.level.isStartCorridorShow
    }

    changeQuadrant (data) {
        console.log(data)

        const {
            systemCollisionFloor,
            systemCollisionItems,
            emitter,
        } = this._root


        if (this._saveIsStartCorridorShow && this._saveIsStartCorridorShow !== data.level.isStartCorridorShow) {
            this._saveIsStartCorridorShow = false
            for (let key in this._startL) {
                systemCollisionFloor.removeItemFromCollision(this._startL[key])
                systemCollisionItems.removeItemFromCollision(this._startL[key])
                this._group.remove(this._startL[key])
            }
            emitter.emit('removeStartBots')()
        }


        const { oldQuadrant, newQuadrant, counter } = data.playerQuadrant



        if (
            this._saveOldQuadrant[0] !== oldQuadrant[0] ||
            this._saveOldQuadrant[1] !== oldQuadrant[1] ||
            this._saveOldQuadrant[2] !== oldQuadrant[2] ||
            this._saveNewQuadrant[0] !== newQuadrant[0] ||
            this._saveNewQuadrant[1] !== newQuadrant[1] ||
            this._saveNewQuadrant[2] !== newQuadrant[2]
        ) {
            this._saveOldQuadrant = [...oldQuadrant]
            this._saveNewQuadrant = [...newQuadrant]
        } else {
            return;
        }


        let keyCreateRoom = STANDART_ROOMS[Math.floor(Math.random() * STANDART_ROOMS.length)]
        if (counter) {
            this._wentLevels = counter(this._wentLevels)
            if (this._flagIsSpecial) {
                this._flagIsSpecial = false
            } else {
                if (this._wentLevels < 3) {
                    this._state = 'normal'
                } else if (this._wentLevels < 100) {
                    if (this._state === 'normal') {
                        this._state = 'addBot'
                    }
                } else {
                    this._state = 'addStairs'
                }


                if (this._state === 'addBot') {
                    keyCreateRoom = 'room_01'
                    this._flagIsSpecial = true
                }
                if (this._state === 'addStairs') {
                    keyCreateRoom = 'room_06'
                    this._flagIsSpecial = true
                }
                if (this._state === 'addWell') {
                    keyCreateRoom = 'room_07'
                }
            }
        }



            const oldKv = oldQuadrant, curKv = newQuadrant
            // move west
            if (curKv[0] < oldKv[0]) {
                console.log('----------- west')
                // remove east
                this._removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])

                // set center to east
                this._objRooms[`r_${curKv[0] + 1}_${curKv[1]}_${curKv[2]}`] = this._objRooms[`r_${oldKv[0]}_${oldKv[1]}_${oldKv[2]}`]

                // create west
                this._createRoom([oldKv[0] - 2, oldKv[1], oldKv[2]], keyCreateRoom)

                // remove north
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                this._createRoom([curKv[0], curKv[1], curKv[2] - 1], keyCreateRoom)

                // remove south
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create soush
                this._createRoom([curKv[0], curKv[1], curKv[2] + 1], keyCreateRoom)
            }

            // move east
            if (curKv[0] > oldKv[0]) {
                console.log('----------- east')
                // remove west
                this._removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])

                // set center to east
                this._objRooms[`r_${curKv[0] - 1}_${curKv[1]}_${curKv[2]}`] = this._objRooms[`r_${oldKv[0]}_${oldKv[1]}_${oldKv[2]}`]

                // create east
                this._createRoom([oldKv[0] + 2, oldKv[1], oldKv[2]], keyCreateRoom)

                // remove north
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                this._createRoom([curKv[0], curKv[1], curKv[2] - 1], keyCreateRoom)

                // remove south
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create south
                this._createRoom([curKv[0], curKv[1], curKv[2] + 1], keyCreateRoom)
            }


            // move north
            if (curKv[2] < oldKv[2]) {
                console.log('-----------north')
                // remove south
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])

                // set center to south
                this._objRooms[`r_${ curKv[0] }_${ curKv[1] }_${ curKv[2] + 1 }`] = this._objRooms[`r_${ oldKv[0] }_${ oldKv[1] }_${ oldKv[2] }`]

                // create north
                this._createRoom([oldKv[0], oldKv[1], oldKv[2] - 2], keyCreateRoom)

                // remove west
                this._removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create west
                this._createRoom([curKv[0] - 1, curKv[1], curKv[2]], keyCreateRoom)

                // remove east
                this._removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create east
                this._createRoom([curKv[0] + 1, curKv[1], curKv[2]], keyCreateRoom)
            }


            // move south
            if (curKv[2] > oldKv[2]) {
                console.log('-----------south')
                // remove north
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])

                // set center to north
                this._objRooms[`r_${ curKv[0] }_${ curKv[1] }_${ curKv[2] - 1 }`] = this._objRooms[`r_${ oldKv[0] }_${ oldKv[1] }_${ oldKv[2] }`]

                // create south
                this._createRoom([oldKv[0], oldKv[1], oldKv[2] + 2], keyCreateRoom)

                // remove west
                this._removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create west
                this._createRoom([curKv[0] - 1, curKv[1], curKv[2]], keyCreateRoom)

                // remove east
                this._removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create east
                this._createRoom([curKv[0] + 1, curKv[1], curKv[2]], keyCreateRoom)
            }

            // move top
            if (curKv[1] > oldKv[1] || curKv[1] < oldKv[1]) {
                console.log('-----------top')
                // remove north
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] - 1])
                // create north
                this._createRoom([curKv[0], curKv[1], curKv[2] - 1])
                // remove south
                this._removeRoom([oldKv[0], oldKv[1], oldKv[2] + 1])
                // create south
                this._createRoom([curKv[0], curKv[1], curKv[2] + 1])
                // remove left
                this._removeRoom([oldKv[0] - 1, oldKv[1], oldKv[2]])
                // create left
                this._createRoom([curKv[0] - 1, curKv[1], curKv[2]])
                // remove right
                this._removeRoom([oldKv[0] + 1, oldKv[1], oldKv[2]])
                // create right
                this._createRoom([curKv[0] + 1, curKv[1], curKv[2]])
            }

    }

    _createRoom (kv, key) {
        const {
            emitter,
            systemCollisionFloor,
            systemCollisionItems,
        } = this._root


        const instanceKey = key || STANDART_ROOMS[Math.floor(Math.random() * STANDART_ROOMS.length)]

        const objKey = `r_${kv[0]}_${kv[1]}_${kv[2]}`

        const mesh = this._instanceRooms[instanceKey].clone()
        mesh.position.set(kv[0] * S, kv[1] * H, kv[2] * S)
        systemCollisionFloor.setItemToCollision({ mesh })
        systemCollisionItems.setItemToCollision({ mesh })
        this._group.add(mesh)
        this._objRooms[objKey] = mesh


        emitter.emit('levelChanged')({
            typeLevelChange: 'createRoom',
            instanceKey,
            objKey,
            kv,
            isAddBot: instanceKey === 'room_01'
        })

        instanceKey === 'room_06' && this._createRoom([kv[0], kv[1] + 1, kv[2]], 'room_dummy')
    }


    _removeRoom(kv) {
        const {
            emitter,
            systemCollisionFloor,
            systemCollisionItems,
        } = this._root

        const objKey = `r_${ kv[0] }_${ kv[1] }_${ kv[2] }`
        if (!this._objRooms[objKey]) return;


        const instanceKey = this._objRooms[objKey].name


        this._group.remove(this._objRooms[objKey])
        systemCollisionItems.removeItemFromCollision(this._objRooms[objKey])
        systemCollisionFloor.removeItemFromCollision(this._objRooms[objKey])
        delete this._objRooms[objKey]


        emitter.emit('levelChanged')({
            typeLevelChange: 'destroyRoom',
            instanceKey,
            objKey,
            kv,
            isRemoveBot: instanceKey === 'room_01'
        })

        instanceKey === 'room_dummy' && this._removeRoom([kv[0], kv[1] - 1, kv[2]])
        instanceKey === 'room_06' && this._removeRoom([kv[0], kv[1] + 1, kv[2]])
    }

}


const createLevelMeshes = (assets, materials) => {
    const allMeshes = {}
    const rooms = {}
    const collisionsBotsRooms = {}

    assets['level-rooms'].traverse(child => {
        if (child.name.includes("room_")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            rooms[child.name] = mesh
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("collision_")) {
            const mesh = new THREE.Mesh(child.geometry)
            collisionsBotsRooms[child.name] = mesh
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_walls")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_road")) {
            const mesh = new THREE.Mesh(child.geometry, materials.green)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_floor")) {
            const mesh = new THREE.Mesh(child.geometry, materials.road)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
    })

    return {
        rooms,
        allMeshes,
        collisionsBotsRooms,
    }
}
