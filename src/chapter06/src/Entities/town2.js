import * as THREE from 'three'
import { tryToDivideRoom, roomStart } from './town2TryToDivide'
import { createRoom } from './geometryRoom/geomRoom'

const DOOR_SIZE = 40

export const createTown2 = (root) => {
    /** create areas */
    const arr = [roomStart]
    let resultArr = null
    const iterate = (arr) => {
        for (let i = 0; i < arr.length; ++i) {
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
                xx[1] <= sData.p1[0]
            ) {
                const d = xx[1] - xx[0]
                if (d > DOOR_SIZE) {
                    const id = Math.random() * 100000000000000
                    if (!sData.doors) {
                        sData.doors = []
                    }
                    sData.doors.push({
                        id,
                        x0: xx[0] + (d / 2) - DOOR_SIZE * .4,
                        x1: xx[0] + (d / 2) + DOOR_SIZE * .4 ,
                    })
                    if (!nData.doors) {
                        nData.doors = []
                    }
                    nData.doors.push({
                        id,
                        x0: xx[0] + (d / 2) - DOOR_SIZE * .4,
                        x1: xx[0] + (d / 2) + DOOR_SIZE * .4,
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
                zz[1] <= eData.p1[1]
            ) {
                const d = zz[1] - zz[0]
                if (d > DOOR_SIZE) {
                    const id = Math.random() * 100000000000000
                    if (!eData.doors) {
                        eData.doors = []
                    }
                    eData.doors.push({
                        id,
                        z0: zz[0] + (d / 2) - DOOR_SIZE * .4,
                        z1: zz[0] + (d / 2) + DOOR_SIZE * .4 ,
                    })
                    if (!wData.doors) {
                        wData.doors = []
                    }
                    wData.doors.push({
                        id,
                        z0: zz[0] + (d / 2) - DOOR_SIZE * .4,
                        z1: zz[0] + (d / 2) + DOOR_SIZE * .4,
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
                if (j === sData.doors.length - 1 && sData.doors[j - 1]) {
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
                    doors[resultArr[i].walls[key].doors[j].id] = {
                        ...resultArr[i].walls[key].doors[j],
                        dir: key
                    }
                }
            }
        }
    }

    console.log(doors)
    console.log('----', root.assets['walls'])


    return {
        mesh
    }
}