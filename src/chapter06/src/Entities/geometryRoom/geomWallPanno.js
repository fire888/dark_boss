import {createFace, createFaceWithSquare} from "../../helpers/geomHelpers";

const white1 = [1, 1, 1]
const white6 = [
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
]

const h0 = 57
const h1 = h0 + 2
const z = 12
const ph0 = 30
const ph1 = 63
const frameW = 1.5


export const createPanel = ({
    l,
    colorRoom,
    leftOffset,
    rightOffset,
}) => {

    const x0 = leftOffset
    const x1 = l - rightOffset

    const colorRoom6 = [
        ...colorRoom, ...colorRoom, ...colorRoom,
        ...colorRoom, ...colorRoom, ...colorRoom,
    ]

    const c = []
    const v = []
    const u = []


    if (l < 30) {
        v.push(
            ...createFace(
                [x0, h0, z],
                [x1, h0, z],
                [x1, h1, z],
                [x0, h1, z],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [x0, h0 - 5, z - 10],
                [x1, h0 - 5, z - 10],
                [x1, h0, z],
                [x0, h0, z],
            )
        )
        c.push(...white6)
        u.push(
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1
        )
    }



    if (l > 30) {
        const lengthWall =  l - (leftOffset + rightOffset)
        const rPanel = lengthWall * .2
        const center = leftOffset + lengthWall / 2
        v.push(
            ...createFace(
                [center - rPanel, ph0, z + 1],
                [center + rPanel, ph0, z + 1],
                [center + rPanel, ph1, z + 1],
                [center - rPanel, ph1, z + 1],
            )
        )
        c.push(...colorRoom6)
        u.push(
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1
        )


        /** panel frame ***/
        v.push(
            ...createFace(
                [center - rPanel - frameW, ph0 - frameW, z + 2],
                [center + rPanel + frameW, ph0 - frameW, z + 2],
                [center + rPanel, ph0, z + 1],
                [center - rPanel, ph0, z + 1],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)
        v.push(
            ...createFace(
                [center - rPanel - frameW, ph0 - frameW - 1, z - 10],
                [center + rPanel + frameW, ph0 - frameW - 1, z - 10],
                [center + rPanel + frameW, ph0 - frameW, z + 2],
                [center - rPanel - frameW, ph0 - frameW, z + 2],
            )
        )
        c.push(...white6)
        u.push(
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1
        )
        ////////////////////
        v.push(
            ...createFace(
                [center + rPanel, ph0, z + 1],
                [center + rPanel + frameW, ph0 - frameW, z + 2],
                [center + rPanel + frameW, ph1 + frameW, z + 2],
                [center + rPanel, ph1, z + 1],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [center + rPanel + frameW, ph0 - frameW, z + 2],
                [center + rPanel + frameW, ph0 - frameW - 1, z - 10],
                [center + rPanel + frameW, ph1 + frameW + 1, z - 10],
                [center + rPanel + frameW, ph1 + frameW, z + 2],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        ////

        v.push(
            ...createFace(
                [center - rPanel - frameW, ph0 - frameW, z + 2],
                [center - rPanel, ph0, z + 1],
                [center - rPanel, ph1, z + 1],
                [center - rPanel - frameW, ph1 + frameW, z + 2],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [center - rPanel - frameW, ph0 - frameW - 1, z  - 10],
                [center - rPanel - frameW, ph0 - frameW, z + 2],
                [center - rPanel - frameW, ph1 + frameW, z + 2],
                [center - rPanel - frameW, ph1 + frameW, z  - 10],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)


        v.push(
            ...createFace(
                [center - rPanel, ph1, z + 1],
                [center + rPanel, ph1, z + 1],
                [center + rPanel + frameW, ph1 + frameW, z + 2],
                [center - rPanel - frameW, ph1 + frameW, z + 2],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)




        /** gor */
        v.push(
            ...createFace(
                [x0, h0, z],
                [center - rPanel - frameW, h0, z],
                [center - rPanel - frameW, h1, z],
                [x0, h1, z],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [x0, h0 - 5, z - 10],
                [center - rPanel - frameW, h0 - 5, z - 10],
                [center - rPanel - frameW, h0, z],
                [x0, h0, z],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [center + rPanel + frameW, h0, z],
                [x1, h0, z],
                [x1, h1, z],
                [center + rPanel + frameW, h1, z],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

        v.push(
            ...createFace(
                [center + rPanel + frameW, h0 - 5, z - 10],
                [x1, h0 - 5, z - 10],
                [x1, h0, z],
                [center + rPanel + frameW, h0, z],
            )
        )
        c.push(...white6)
        u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)

    }











    return { v, c, u }
}