import {tryToDivideRoom, roomStart, getId} from './town2TryToDivide'
const DOOR_SIZE = 30
const DOOR_SIZE_FULL = 60

export const createTown2Scheme = () => {
    const arr = [roomStart]
    let resultArr = null
    const iterate = (arr) => {
        for (let i = 0; i < arr.length; ++i) {
            const lX = arr[i].walls['s'].p1[0] - arr[i].walls['s'].p0[0]
            const lZ = arr[i].walls['e'].p1[1] - arr[i].walls['e'].p0[1]

            if (lX < 500 && lZ < 500 && Math.random() < .4) {
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
                    const doorData = {
                        id: getId(),
                        x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                        x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                    }
                    if (!sData.doors) {
                        sData.doors = []
                    }
                    sData.doors.push(doorData)
                    if (!nData.doors) {
                        nData.doors = []
                    }
                    nData.doors.push(doorData)
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
                const doorData = {
                    id: getId(),
                    x0: xx[0] + (d / 2) - DOOR_SIZE * .5,
                    x1: xx[0] + (d / 2) + DOOR_SIZE * .5,
                    keyMode: 'bigDoor',
                }
                if (!sData.doors) {
                    sData.doors = []
                }
                sData.doors.push(doorData)
                outerDoors.push(doorData)
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

    const floors = []

    /** prepare ResultArr to make walls */
    const arrWallsPrepared = []
    for (let i = 0; i < resultArr.length; ++i) {
        //const colorRoom = [Math.random(), Math.random(), Math.random()]
        //const colorRoom = [0, 0, 0]
        const colorRoom = [Math.random() * .4, Math.random() * .4, Math.random() * .4]

        const nData = resultArr[i].walls['n']
        {
            const data = {
                p0: nData.p0,
                p1: nData.p1,
                arr: [],
                colorRoom,
            }
            if (nData.wallSegments) {
                for (let i = 0; i < nData.wallSegments.length; ++i) {
                    data.arr.push(nData.wallSegments[i])
                }
            }
            arrWallsPrepared.push(data)
        }
        const sData = resultArr[i].walls['s']
        {
            const data = {
                p0: sData.p1,
                p1: sData.p0,
                arr: [],
                colorRoom,
            }
            if (sData.wallSegments) {
                for (let i = 0; i < sData.wallSegments.length; ++i) {
                    data.arr.push(sData.wallSegments[i])
                }
            }
            arrWallsPrepared.push(data)
        }
        const eData = resultArr[i].walls['e']
        {
            const data = {
                 p0: eData.p0,
                 p1: eData.p1,
                 arr: [],
                colorRoom,
            }
            if (eData.wallSegments) {
                for (let i = 0; i < eData.wallSegments.length; ++i) {
                    data.arr.push(eData.wallSegments[i])
                }
            }
            arrWallsPrepared.push(data)
        }
        const wData = resultArr[i].walls['w']
        {
            const data = {
                p0: wData.p1,
                p1: wData.p0,
                arr: [],
                colorRoom,
            }
            if (wData.wallSegments) {
                for (let i = 0; i < wData.wallSegments.length; ++i) {
                    data.arr.push(wData.wallSegments[i])
                }
            }
            arrWallsPrepared.push(data)
        }

        const floorData = { 
            p0: sData.p0,
            p1: sData.p1,
            p2: nData.p1,
            p3: nData.p0,
            colorRoom,
        }
        floors.push(floorData)    
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
    for (let key in doors) {
        if (doors[key].x0) {
            doors[key].l = doors[key].x1 - doors[key].x0
            doors[key].p0 = [doors[key].x0, doors[key].z]
            doors[key].p1 = [doors[key].x1, doors[key].z]
            doors[key].angle = 0
        } else {
            doors[key].l = doors[key].z1 - doors[key].z0
            doors[key].p0 = [doors[key].x, doors[key].z0]
            doors[key].p1 = [doors[key].x, doors[key].z1]
            doors[key].angle = -Math.PI / 2
        }
    }



    /** CREATE OUTER WALLS DATA **/
    const outerWallsData = JSON.parse(JSON.stringify(roomStart))
    const arrOuterWalls = []
    for (let key in outerWallsData.walls) {
        if (key === 'n') {
            outerDoors.sort((a, b) => a.x0 - b.x0)
            const doorOffset = 10
            for (let i = outerDoors.length - 1; i > -1; --i) {
                if (i === outerDoors.length - 1) {
                    arrOuterWalls.push({
                        p0: [...outerWallsData.walls[key].p1],
                        p1: [outerDoors[i].x1 + doorOffset, outerWallsData.walls[key].p1[1]]
                    })
                }
                if (outerDoors[i - 1]) {
                    arrOuterWalls.push({
                        p0: [outerDoors[i].x0 - doorOffset, outerWallsData.walls[key].p1[1]],
                        p1: [outerDoors[i - 1].x1 + doorOffset, outerWallsData.walls[key].p1[1]]
                    })
                }
                if (i === 0) {
                    arrOuterWalls.push({
                        p0: [outerDoors[i].x0 - doorOffset, outerWallsData.walls[key].p1[1]],
                        p1: [...outerWallsData.walls[key].p0]
                    })
                }
            }
        }
        if (key === 's') {
            arrOuterWalls.push({ p0: outerWallsData.walls[key].p0, p1: outerWallsData.walls[key].p1 })
        }
        if (key === 'e') {
            arrOuterWalls.push({ p0: outerWallsData.walls[key].p1, p1: outerWallsData.walls[key].p0 })
        }
        if (key === 'w') {
            arrOuterWalls.push({ p0: outerWallsData.walls[key].p0, p1: outerWallsData.walls[key].p1 })
        }
    }


    return {
        arrOuterWalls,
        doors,
        arrWallsPrepared,
        floors,
    }
}