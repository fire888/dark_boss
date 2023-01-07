import * as THREE from 'three'

const S1 = 1000
const S2 = 1000
const minS = 200

const idGen = () => {
    let count = 0
    return () => {
        ++count
        return count
    }
}

export const createTown2 = () => {
    const mesh = new THREE.Group()

    const gId = idGen()

    const room = {
        id: gId(),
        walls: {
            'n': { id: gId(), p0: [0, 0], p1: [S1, 0] },
            'e': { id: gId(), p0: [S1, 0], p1: [S1, S2] },
            's': { id: gId(), p0: [0, S2], p1: [S1, S2] },
            'w': { id: gId(), p0: [0, 0], p1: [0, S2] },
        }
    }


    const tryToDivideRoom = (roomData) => {
        const { walls } = roomData
        let isXBig = false
        let isZBig = false
        let divideAxis = null

        if (walls['s'].p1[0] - walls['s'].p0[0] > minS) {
            console.log(walls['s'].p1[0] - walls['s'].p0[0])
            isXBig = true
            divideAxis = 'x'
        }
        if (walls['e'].p1[1] - walls['e'].p0[1] > minS) {
            isZBig = true
            divideAxis = 'z'
        }

        if (isXBig && isZBig) {
            divideAxis = Math.random() < .5 ? 'x' : 'z'
        }

        console.log(isXBig, isZBig, divideAxis)

        if (!divideAxis) {
            console.log('nnn')
            return null
        }

        const newRooms = []
        if (divideAxis === 'x') {
            const newX = (walls['s'].p1[0] - walls['s'].p0[0]) * (0.3 + Math.random() * .6) + walls['s'].p0[0]
            newRooms.push(
                {
                    id: gId(),
                    walls: {
                        'n': {
                            id: gId(),
                            p0: [...walls['n'].p0],
                            p1: [newX, walls['n'].p1[1]]
                        },
                        'e': {
                            id: gId(),
                            p0: [newX, walls['e'].p0[1]],
                            p1: [newX, walls['e'].p1[1]]
                        },
                        's': {
                            id: gId(),
                            p0: [...walls['s'].p0],
                            p1: [newX, walls['s'].p1[1]]
                        },
                        'w': {
                            id: gId(),
                            p0: [...walls['w'].p0],
                            p1: [...walls['w'].p1]
                        },
                    }
                },
                {
                    id: gId(),
                    walls: {
                        'n': {
                            id: gId(),
                            p0: [newX, walls['n'].p0[1]],
                            p1: [...walls['n'].p1]
                        },
                        'e': {
                            id: gId(),
                            p0: [...walls['e'].p0],
                            p1: [...walls['e'].p1]
                        },
                        's': {
                            id: gId(),
                            p0: [newX, walls['s'].p0[1]],
                            p1: [...walls['s'].p1]
                        },
                        'w': {
                            id: gId(),
                            p0: [newX, walls['w'].p0[1]],
                            p1: [newX, walls['w'].p1[1]]
                        },
                    }
                },
            )
        }

        if (divideAxis === 'z') {
            const newZ = (walls['e'].p1[1] - walls['e'].p0[1]) * (0.3 + Math.random() * .6) + walls['e'].p0[1]
            newRooms.push(
                {
                    id: gId(),
                    walls: {
                        'n': {
                            id: gId(),
                            p0: [...walls['n'].p0],
                            p1: [...walls['n'].p1]
                        },
                        'e': {
                            id: gId(),
                            p0: [...walls['e'].p0],
                            p1: [walls['e'].p1[0], newZ]
                        },
                        's': {
                            id: gId(),
                            p0: [walls['s'].p0[0], newZ],
                            p1: [walls['s'].p1[0], newZ]
                        },
                        'w': {
                            id: gId(),
                            p0: [...walls['w'].p0],
                            p1: [walls['w'].p0[0], newZ]
                        },
                    }
                },
                {
                    id: gId(),
                    walls: {
                        'n': {
                            id: gId(),
                            p0: [walls['n'].p0[0], newZ],
                            p1: [walls['n'].p1[0], newZ]
                        },
                        'e': {
                            id: gId(),
                            p0: [walls['e'].p0[0], newZ],
                            p1: [...walls['e'].p1]
                        },
                        's': {
                            id: gId(),
                            p0: [...walls['s'].p0],
                            p1: [...walls['s'].p1]
                        },
                        'w': {
                            id: gId(),
                            p0: [walls['w'].p0[0], newZ],
                            p1: [...walls['w'].p1]
                        },
                    }
                },

            )
        }

        return newRooms
    }


    const arr = [room]
    let resultArr = null

    const iterate = (arr) => {
        for (let i = 0; i < arr.length; ++i) {
            const newDataRooms = tryToDivideRoom(arr[i])
            if (newDataRooms) {
                const newArr = arr.filter(item => item.id !== arr[i].id)
                newArr.push(...newDataRooms)
                resultArr = newArr
                return void iterate(newArr)
            }
        }
    }

    iterate(arr)


    for (let i = 0; i < resultArr.length; ++i) {
        const materialW = new THREE.LineBasicMaterial({
            color: Math.random() * 0xFFFFFF
        });
        for (let key in resultArr[i].walls) {
            const {p0, p1} = resultArr[i].walls[key]
            const y = 0//Math.random() * 100

            const p = [
                p0[0], y, p0[1],
                p1[0], y, p1[1],
            ]
            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(p), 3))



            const line = new THREE.Line(geometry, materialW);
            mesh.add(line)

        }
    }



    return {
        mesh
    }
}