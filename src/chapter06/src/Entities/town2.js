import * as THREE from 'three'
import { tryToDivideRoom, roomStart } from './town2TryToDivide'
import { createRoom } from './geometryRoom/geomRoom'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr} from "./geometry/helpers";
import { createMeshFromBuffer } from '../helpers/createBufferGeom'
import { createHelpLines }  from './geometryRoom/helpLines'

const DOOR_SIZE = 30
const DOOR_SIZE_FULL = 60
const y0 = -62

export const createTown2 = (root) => {

    /** create areas */
    const arr = [roomStart]
    let resultArr = null
    const iterate = (arr) => {
        for (let i = 0; i < arr.length; ++i) {
            const lX = arr[i].walls['s'].p1[0] - arr[i].walls['s'].p0[0]
            const lZ = arr[i].walls['e'].p1[1] - arr[i].walls['e'].p0[1]

            if (lX < 1000 && lZ < 1000 && Math.random() < .15) {
                arr[i].notDivide = true
            }

            if (arr[i].notDivide) {
                continue;
            }


            const newDataRooms = tryToDivideRoom(arr[i])
            if (!newDataRooms) {
                continue
            }
            const newArr = arr.filter(item => item.id !== arr[i].id)
            newArr.push(...newDataRooms)
            resultArr = newArr
            return void iterate(newArr)
        }
    }
    iterate(arr)

    /** doors */
    for (let i = 0; i < resultArr.length; ++i) {
        const sData = resultArr[i].walls['s']
        const eData = resultArr[i].walls['e']
        for (let j = 0; j < resultArr.length; ++j) {
            if (resultArr[i].id === resultArr[j].id) {
                continue;
            }

            const nData = resultArr[j].walls['n']

            const xx = [Math.max(sData.p0[0], nData.p0[0]), Math.min(sData.p1[0], nData.p1[0])]
            if (
                nData.p0[1] === sData.p0[1] &&
                xx[0] >= sData.p0[0] &&
                xx[0] <= sData.p1[0] &&
                xx[1] >= sData.p0[0] &&
                xx[1] <= sData.p1[0] &&

                xx[0] >= nData.p0[0] &&
                xx[0] <= nData.p1[0] &&
                xx[1] >= nData.p0[0] &&
                xx[1] <= nData.p1[0]
            ) {
                const d = xx[1] - xx[0]
                if (d > DOOR_SIZE_FULL) {
                    const id = Math.random() * 100000000000000
                    if (!sData.doors) {
                        sData.doors = []
                    }
                    sData.doors.push({
                        id,
                        x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                        x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                    })
                    if (!nData.doors) {
                        nData.doors = []
                    }
                    nData.doors.push({
                        id,
                        x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                        x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                    })
                }
            }

            const wData = resultArr[j].walls['w']

            const zz = [Math.max(wData.p0[1], eData.p0[1]), Math.min(wData.p1[1], eData.p1[1])]
            if (
                wData.p0[0] === eData.p0[0] &&
                zz[0] >= eData.p0[1] &&
                zz[0] <= eData.p1[1] &&
                zz[1] >= eData.p0[1] &&
                zz[1] <= eData.p1[1] &&

                zz[0] >= wData.p0[1] &&
                zz[0] <= wData.p1[1] &&
                zz[1] >= wData.p0[1] &&
                zz[1] <= wData.p1[1]
            ) {
                const d = zz[1] - zz[0]
                if (d > DOOR_SIZE_FULL) {
                    const id = Math.random() * 100000000000000
                    if (!eData.doors) {
                        eData.doors = []
                    }
                    eData.doors.push({
                        id,
                        z0: zz[0] + (d / 2) - DOOR_SIZE * .5,
                        z1: zz[0] + (d / 2) + DOOR_SIZE * .5,
                    })
                    if (!wData.doors) {
                        wData.doors = []
                    }
                    wData.doors.push({
                        id,
                        z0: zz[0] + (d / 2) - DOOR_SIZE * .5,
                        z1: zz[0] + (d / 2) + DOOR_SIZE * .5,
                    })
                }
            }
        }
    }
    /** create outer doors */
    const outerDoors = []
    for (let i = 0; i < resultArr.length; ++i) {
        const sData = resultArr[i].walls['n']
        if (sData.p0[1] === 0) {
            const xx = [sData.p0[0], sData.p1[0]]
            const d = xx[1] - xx[0]
            if (d > DOOR_SIZE_FULL) {
                const id = Math.random() * 100000000000000
                if (!sData.doors) {
                    sData.doors = []
                }
                sData.doors.push({
                    id,
                    x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                    x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                })

                outerDoors.push({
                    id,
                    x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                    x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                })
            }
        }
    }




    /** divide walls by doors */
    for (let i = 0; i < resultArr.length; ++i) {
        const nData = resultArr[i].walls['n']
        if (nData.doors) {
            nData.doors.sort((a, b) => a.x0 - b.x0)
            nData.wallSegments = []
            for (let j = 0; j < nData.doors.length; ++j) {
                if (j === 0) {
                    nData.wallSegments.push({
                        p0: [...nData.p0],
                        p1: [nData.doors[j].x0, nData.p0[1]],
                    })
                }
                if (nData.doors[j - 1]) {
                    nData.wallSegments.push({
                        p0: [nData.doors[j - 1].x1, nData.p0[1]],
                        p1: [nData.doors[j].x0, nData.p0[1]],
                    })
                }
                if (j === nData.doors.length - 1) {
                    nData.wallSegments.push({
                        p0: [nData.doors[nData.doors.length - 1].x1, nData.p0[1]],
                        p1: [...nData.p1],
                    })
                }
            }
        }
        const sData = resultArr[i].walls['s']
        if (sData.doors) {
            sData.doors.sort((a, b) => a.x0 - b.x0)
            sData.wallSegments = []
            for (let j = sData.doors.length - 1; j > -1; --j) {
                if (j === sData.doors.length - 1) {
                     sData.wallSegments.push({
                         p0: [...sData.p1],
                         p1: [sData.doors[j].x1, sData.p1[1]],
                     })
                }
                if (sData.doors[j - 1]) {
                    sData.wallSegments.push({
                        p0: [sData.doors[j].x0, sData.p1[1]],
                        p1: [sData.doors[j - 1].x1, sData.p1[1]],
                    })
                }
                if (j === 0) {
                   sData.wallSegments.push({
                       p0: [sData.doors[j].x0, sData.p1[1]],
                       p1: [...sData.p0],
                   })
                }
            }
        }
        const eData = resultArr[i].walls['e']
        if (eData.doors) {
            eData.doors.sort((a, b) => a.z0 - b.z0)
            eData.wallSegments = []
            for (let j = 0; j < eData.doors.length; ++j) {
                if (j === 0) {
                    eData.wallSegments.push({
                        p0: [...eData.p0],
                        p1: [eData.p0[0], eData.doors[j].z0],
                    })
                }
                if (eData.doors[j - 1]) {
                    eData.wallSegments.push({
                        p0: [eData.p0[0], eData.doors[j - 1].z1],
                        p1: [eData.p0[0], eData.doors[j].z0],
                    })
                }
                if (j === eData.doors.length - 1) {
                    eData.wallSegments.push({
                        p0: [eData.p0[0], eData.doors[j].z1],
                        p1: [...eData.p1],
                    })
                }
            }
        }
        const wData = resultArr[i].walls['w']
        if (wData.doors) {
            wData.doors.sort((a, b) => a.z0 - b.z0)
            wData.wallSegments = []
            for (let j = wData.doors.length - 1; j > -1; --j) {
                if (j === wData.doors.length - 1) {
                    wData.wallSegments.push({
                        p0: [...wData.p1],
                        p1: [wData.p1[0], wData.doors[j].z1],
                    })
                }
                if (wData.doors[j - 1]) {
                    wData.wallSegments.push({
                        p0: [wData.p1[0], wData.doors[j].z0],
                        p1: [wData.p1[0], wData.doors[j- 1].z1],
                    })
                }
                if (j === 0) {
                    wData.wallSegments.push({
                        p0: [wData.p1[0], wData.doors[j].z0],
                        p1: [...wData.p0],
                    })
                }
            }
        }
    }




    /** ROOMS MESHES */
    for (let i = 0; i < resultArr.length; ++i) {
        const m = createRoom(resultArr[i], root)
        root.studio.addToScene(m)
    }


    /** CREATE DOORS DATA */
    const doors = {}
    for (let i = 0; i < resultArr.length; ++i) {
        for (let key in resultArr[i].walls) {
            if (resultArr[i].walls[key].doors) {
                for (let j = 0; j < resultArr[i].walls[key].doors.length; ++j) {
                    let x = null, z = null
                    if (key === 'n' || key === 's') {
                        z = resultArr[i].walls[key].p0[1]
                    }
                    if (key === 'e' || key === 'w') {
                        x = resultArr[i].walls[key].p0[0]
                    }

                    doors[resultArr[i].walls[key].doors[j].id] = {
                        ...resultArr[i].walls[key].doors[j],
                        dir: key,
                        x, z,
                    }
                }
            }
        }
    }


    /** DOORS MESH **/
    const vDoors = []
    const cDoors = []

    for (let key in doors) {
        let l
        if (doors[key].x0) {
            l = doors[key].x1 - doors[key].x0
        } else {
            l = doors[key].z1 - doors[key].z0
        }

        const door = createDoorData(root, root.assets['walls'].children[1], l)

        if (doors[key].dir === 'n' || doors[key].dir === 's') {
            translateArr(door.v, doors[key].x0, y0, doors[key].z)
        } else {
            rotateArrY(door.v, -Math.PI / 2)
            translateArr(door.v, doors[key].x, y0, doors[key].z0)
        }

        vDoors.push(...door.v)
        cDoors.push(...door.c)
    }

    const doorsMesh = createMeshFromBuffer({ v: vDoors, c: cDoors })
    root.studio.addToScene(doorsMesh)




    /** OUTER WALLS */
    {
        const outerWallsData = JSON.parse(JSON.stringify(roomStart))
        const v = []
        const c = []

        for (let key in outerWallsData.walls) {
            if (key === 'n') {
                outerDoors.sort((a, b) => a.x0 - b.x0)
                const arrWalls = []
                const doorOffset = 10
                for (let i = outerDoors.length - 1; i > -1; --i) {
                    if (i === outerDoors.length - 1) {
                        arrWalls.push({
                            p0: [...outerWallsData.walls[key].p1],
                            p1: [outerDoors[i].x1 + doorOffset, outerWallsData.walls[key].p1[1]]
                        })
                    }
                    if (outerDoors[i - 1]) {
                        arrWalls.push({
                            p0: [outerDoors[i].x0 - doorOffset, outerWallsData.walls[key].p1[1]],
                            p1: [outerDoors[i - 1].x1 + doorOffset, outerWallsData.walls[key].p1[1]]
                        })
                    }
                    if (i === 0) {
                        arrWalls.push({
                            p0: [outerDoors[i].x0 - doorOffset, outerWallsData.walls[key].p1[1]],
                            p1: [...outerWallsData.walls[key].p0]
                        })
                    }
                }
                console.log(outerWallsData)
                for (let i = 0; i < arrWalls.length; ++i) {
                    const wall = createOuterWall(arrWalls[i], root.assets['walls'].children[2])
                    v.push(...wall.v)
                    c.push(...wall.c)

                }
            }

            if (key === 's') {
                const wall = createOuterWall(
                    { p0: outerWallsData.walls[key].p0, p1: outerWallsData.walls[key].p1 },
                    root.assets['walls'].children[2]
                )
                v.push(...wall.v)
                c.push(...wall.c)
            }

            if (key === 'e') {
                const wall = createOuterWall(
                    { p0: outerWallsData.walls[key].p1, p1: outerWallsData.walls[key].p0 },
                    root.assets['walls'].children[2]
                )
                v.push(...wall.v)
                c.push(...wall.c)
            }

            if (key === 'w') {
                const wall = createOuterWall(
                    { p0: outerWallsData.walls[key].p0, p1: outerWallsData.walls[key].p1 },
                    root.assets['walls'].children[2]
                )
                v.push(...wall.v)
                c.push(...wall.c)
            }
        }

        const mesh = createMeshFromBuffer({ v, c })
        root.studio.addToScene(mesh)
    }


    /** HELP LINES */
    // const meshLines = createHelpLines(resultArr)
    // root.studio.addToScene(meshLines)


    return {
    //    mesh
    }
}