// import {tryToDivideRoom, roomStart, getId} from './town2TryToDivide'
// const DOOR_SIZE = 30
// const DOOR_SIZE_FULL = 60

const MAX_N = 40


const createRoadLeftRightWall = () => {
    const walls = []
    let Z = 400
    let point = [0, Z]

    const iterate = n => {
        if (n > MAX_N) {
            return;
        }
        const newPoint = [
            point[0] + Math.random() * 50 + 50,
            Math.random() * 50 + Z,
        ]
        const leftWall = {
            p0: [...point],
            p1: [...newPoint],
            type: 'wall_00_easy',
            h0: 0,
            h1: 50,
        }
        walls.push(leftWall)


        walls.push({
            p0: [leftWall.p1[0], leftWall.p1[1] + 100],
            p1: [leftWall.p0[0], leftWall.p0[1] + 100],
            type: 'wall_00_easy',
            h0: 0,
            h1: 50,
        })



        point = newPoint
        iterate(n + 1)
    }
    iterate(0)

    return walls
}





export const createTown3Scheme = () => {
    const OFFSET_W = 6
    const walls = []

    // const roadArr = createRoadLeftRightWall()
    // walls.push(...roadArr)


    const createHouse = (center) => {
        const pNW = [
            center[0] - Math.random() * 150 + 40,
            center[1] + Math.random() * 150 + 40,
        ]
        const pNE = [
            center[0] + Math.random() * 150 + 40,
            center[1] + Math.random() * 150 + 40,
        ]
        const pSW = [
            center[0] - Math.random() * 150 + 40,
            center[1] - Math.random() * 150 + 40,
        ]
        const pSE = [
            center[0] + Math.random() * 150 + 40,
            center[1] - Math.random() * 150 + 40,
        ]

        const arr = []
        const floorsNum = Math.floor(Math.random() * 10)
        const height = Math.random() * 30 + 50
        for (let i = 0; i < floorsNum; ++i) {
            const h0 = i * height
            const h1 = i * height + height

            const outerWalls = []
            const innerWalls = []

            /** cap House */
            if (i === floorsNum - 1) {
                arr.push({
                    type: 'ceiling_00_easy',
                    p0: [...pSE],
                    p1: [...pSW],
                    p2: [...pNW],
                    p3: [...pNE],
                    h0: h1,
                })
            }

            /** ceil first floor */
            if (i === 0) {
                arr.push({
                    type: 'ceiling_00_easy',
                    p0: [...pSW],
                    p1: [...pSE],
                    p2: [...pNE],
                    p3: [...pNW],
                    h0: h1,
                })
            }


            /** first floor walls inner / outer door ******************************/
            if (i === 0) {
                /** DOOR *******/

                const doorLeftP = [
                    pSW[0] + 0.4 * (pSE[0] - pSW[0]),
                    pSW[1] + 0.4 * (pSE[1] - pSW[1]),
                ]
                const doorRightP = [
                    pSW[0] + 0.6 * (pSE[0] - pSW[0]),
                    pSW[1] + 0.6 * (pSE[1] - pSW[1]),
                ]

                arr.push({
                    type: 'door_00_easy',
                    h0,
                    h1,
                    p0: doorLeftP,
                    p1: doorRightP,
                })

                outerWalls.push(
                    {
                        p0: [...pSE],
                        p1: [...doorRightP],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                        isCapTop: i === floorsNum - 1,
                    },
                    {
                        p0: [...doorLeftP],
                        p1: [...pSW],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                        isCapTop: i === floorsNum - 1,
                    },
                )

                const doorLeftP_ = [
                    pSW[0] + 0.4 * (pSE[0] - pSW[0]),
                    pSW[1] + 0.4 * (pSE[1] + OFFSET_W - pSW[1] + OFFSET_W),
                ]
                const doorRightP_ = [
                    pSW[0] + 0.6 * (pSE[0] - pSW[0]),
                    pSW[1] + 0.6 * (pSE[1] +  OFFSET_W - pSW[1] + OFFSET_W),
                ]

                innerWalls.push(
                    {
                        p0: [pSW[0] + OFFSET_W, pSW[1] + OFFSET_W],
                        p1: [...doorLeftP_],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                    },
                    {
                        p0: [...doorRightP_],
                        p1: [pSE[0] - OFFSET_W, pSE[1] + OFFSET_W],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                    },
                )


                /** inner first floor */
                innerWalls.push(
                    {
                        p0: [pSE[0] - OFFSET_W, pSE[1] + OFFSET_W],
                        p1: [pNE[0] - OFFSET_W, pNE[1] - OFFSET_W],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                    },
                    {
                        p0: [pNE[0] - OFFSET_W, pNE[1] - OFFSET_W],
                        p1: [pNW[0] + OFFSET_W, pNW[1] - OFFSET_W],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                    },
                    {
                        p0: [pNW[0] + OFFSET_W, pNW[1] - OFFSET_W],
                        p1: [pSW[0] + OFFSET_W, pSW[1] + OFFSET_W],
                        type: 'wall_00_easy',
                        h0,
                        h1,
                    },
                )
            }


            /** normal walls *****************************/
            if (i !== 0) {
                /** south not door */
                outerWalls.push({
                    p0: [...pSE],
                    p1: [...pSW],
                    type: 'wall_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                })
            }

            outerWalls.push(
                {
                    p0: [...pNE],
                    p1: [...pSE],
                    type: 'wall_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
                {
                    p0: [...pNW],
                    p1: [...pNE],
                    type: 'wall_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
                {
                    p0: [...pSW],
                    p1: [...pNW],
                    type: 'wall_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
            )


            const cornersOuter = [
                {
                    p0: [...pNW],
                    p1: [...pSW],
                    p2: [...pSE],
                    type: 'corner_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
                {
                    p0: [...pSW],
                    p1: [...pSE],
                    p2: [...pNE],
                    type: 'corner_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
                {
                    p0: [...pSE],
                    p1: [...pNE],
                    p2: [...pNW],
                    type: 'corner_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
                {
                    p0: [...pNE],
                    p1: [...pNW],
                    p2: [...pSW],
                    type: 'corner_00_easy',
                    h0,
                    h1,
                    isCapTop: i === floorsNum - 1,
                },
            ]
            arr.push(
                ...outerWalls,
                ...cornersOuter,
            )


            arr.push (...innerWalls)
        }

        return arr
    }




    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            const r = createHouse([-300 + i * 300, -300 + j * 300])
            walls.push(...r)
        }
    }


    return {
        walls,
    }
}