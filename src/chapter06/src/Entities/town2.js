import * as THREE from 'three'
import { tryToDivideRoom, roomStart } from './town2TryToDivide'
import { createRoom } from './geometryRoom/geomRoom'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr} from "./geometry/helpers";

const DOOR_SIZE = 30
const DOOR_SIZE_FULL = 60
const y0 = -62

export const createTown2 = (root) => {
    {
        const outerWallsData = JSON.parse(JSON.stringify(roomStart))
        const v = []
        const c = []

        for (let key in outerWallsData.walls) {
            if (key === 'n') {
                const wall = createOuterWall(
                    { p0: outerWallsData.walls[key].p1, p1: outerWallsData.walls[key].p0 },
                    root.assets['walls'].children[2]
                )
                v.push(...wall.v)
                c.push(...wall.c)
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

        const vertices = new Float32Array(v)
        const colors = new Float32Array(c)
        /** mesh main */
        const g = new THREE.BufferGeometry()
        g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        g.computeVertexNormals()
        const m = new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true }))
        root.studio.addToScene(m)
    }



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



    /** lines */
    const mesh = new THREE.Group()
    for (let i = 0; i < resultArr.length; ++i) {
        const materialW = new THREE.LineBasicMaterial({
            color: Math.random() * 0xFFFFFF
        })
        for (let key in resultArr[i].walls) {
            const {p0, p1, doors} = resultArr[i].walls[key]
            const y = -50
            const p = [p0[0], y, p0[1], p1[0], y, p1[1]]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
            const line = new THREE.Line(geometry, materialW);
            mesh.add(line)

            if (doors) {
                if (key === 'n') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            doors[i]['x0'], y, p0[1],
                            doors[i]['x0'], y, p0[1] + 5,
                            doors[i]['x1'], y, p0[1] + 5,
                            doors[i]['x1'], y, p0[1],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 's') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            doors[i]['x0'], y, p0[1],
                            doors[i]['x0'], y, p0[1] - 5,
                            doors[i]['x1'], y, p0[1] - 5,
                            doors[i]['x1'], y, p0[1],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 'e') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            p0[0], y, doors[i]['z0'],
                            p0[0] - 5, y, doors[i]['z0'],
                            p0[0] - 5, y, doors[i]['z1'],
                            p0[0], y, doors[i]['z1'],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
                if (key === 'w') {
                    for (let i = 0; i < doors.length; ++i) {
                        const p = [
                            p0[0], y, doors[i]['z0'],
                            p0[0] + 5, y, doors[i]['z0'],
                            p0[0] + 5, y, doors[i]['z1'],
                            p0[0], y, doors[i]['z1'],
                        ]
                        const geometry = new THREE.BufferGeometry()
                        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))
                        const line = new THREE.Line(geometry, materialW);
                        mesh.add(line)
                    }
                }
            }
        }
    }

    for (let i = 0; i < resultArr.length; ++i) {
        const m = createRoom(resultArr[i], root)
        root.studio.addToScene(m)
    }


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

    const vertices = new Float32Array(vDoors)
    const colors = new Float32Array(cDoors)
    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()
    const m = new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true }))
    root.studio.addToScene(m)


    return {
        mesh
    }
}