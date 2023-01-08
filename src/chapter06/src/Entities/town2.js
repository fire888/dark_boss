import * as THREE from 'three'
import { tryToDivideRoom, roomStart } from './town2TryToDivide'
import { createRoom } from '../Entities/geometryRoom/geomRoom'

const DOOR_SIZE = 40

export const createTown2 = () => {
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

    console.log(resultArr)


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
        const m = createRoom(resultArr[i])
        mesh.add(m)
    }




    return {
        mesh
    }
}