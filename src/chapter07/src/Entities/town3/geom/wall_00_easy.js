import {
    angleFromCoords,
    rotateArrY,
    translateArr,
} from '../../../helpers/geomHelpers'

export const wall_00_easy = data => {
    const { p0, p1, h0, h1, } = data

    const h0_0 = h0 + (h1 - h0) * 0.3
    const h0_1 = h1 - (h1 - h0) * 0.3

    const vM00 = []
    const vM01 = []
    const vM02 = []
    const cM00 = []
    const cM01 = []
    const cM02 = []
    const uM00 = []
    const uM01 = []
    const uM02 = []

    const ind00 = []
    const ind01 = []
    const ind02 = []

    const dX = p1[0] - p0[0]
    const dZ = p1[1] - p0[1]

    const l = Math.sqrt((dX * dX) + (dZ * dZ))
    const angle = angleFromCoords(dX, dZ)


    /** Bottom */
    vM00.push(
        0, h0, 5,
        l, h0, 5,
        l, h0_0 - 4, 5,
        0, h0_0 - 4, 5,
    )
    ind00.push(0, 1, 2, 0, 2, 3)

    vM00.push(
        0, h0_0 - 4, 5,
        l, h0_0 - 4, 5,
        l, h0_0 - 3, 4,
        0, h0_0 - 3, 4,
    )
    ind00.push(4, 5, 6, 4, 6, 7)

    vM00.push(
        0, h0_0 - 3, 4,
        l, h0_0 - 3, 4,
        l, h0_0, 4,
        0, h0_0, 4,
    )
    ind00.push(8, 9, 10, 8, 10, 11)

    vM00.push(
        0, h0_0, 4,
        l, h0_0, 4,
        l, h0_0, 0,
        0, h0_0, 0,
    )
    ind00.push(12, 13, 14, 12, 14, 15)


    /** TOP ****/
    vM00.push(
        0, h0_1, 0,
        l, h0_1, 0,
        l, h0_1, 5,
        0, h0_1, 5,
    )
    ind00.push(16, 17, 18, 16, 18, 19)

    vM00.push(
        0, h0_1, 5,
        l, h0_1, 5,
        l, h1, 5,
        0, h1, 5,
    )
    ind00.push(20, 21, 22, 20, 22, 23)



    /** CENTER *******************/

    const countN = Math.floor(l / 5)
    const segmentL = l / countN

    for (let i = 0; i < countN; ++i) {
        const z = Math.random() * 3.5

        vM01.push(
            i * segmentL, h0_0, z,
            i * segmentL + segmentL, h0_0, z,
            i * segmentL + segmentL, h0_1, z,
            i * segmentL, h0_1, z,
        )

        const startInd = ind01[ind01.length - 1] + 1 || 0
        ind01.push(
            startInd + 0,
            startInd + 1,
            startInd + 2,
            startInd + 0,
            startInd + 2,
            startInd + 3
        )
    }

    for (let i = 1; i < countN; ++i) {
        const z = vM01[i * 4 * 3 - 1]
        const z1 = vM01[(i + 1) * 4 * 3 - 1]

        vM02.push(
            i * segmentL, h0_0, z,
            i * segmentL, h0_0, z1,
            i * segmentL, h0_1, z1,
            i * segmentL, h0_1, z,
        )

        const startInd = ind02[ind02.length - 1] + 1 || 0
        ind02.push(
            startInd + 0,
            startInd + 1,
            startInd + 2,
            startInd + 0,
            startInd + 2,
            startInd + 3
        )
    }


    // vM01.push(
    //     0, 30, 0,
    //     l, 30, 0,
    //     l, 60, 0,
    //     0, 60, 0,
    // )
    // ind01.push(0, 1, 2, 0, 2, 3)


    // vM02.push(
    //     0, 60, 0,
    //     l, 60, 0,
    //     l, 90, 0,
    //     0, 90, 0,
    // )
    // ind02.push(0, 1, 2, 0, 2, 3)


    rotateArrY(vM00, -angle)
    rotateArrY(vM01, -angle)
    rotateArrY(vM02, -angle)

    translateArr(vM00, p0[0], -45, p0[1])
    translateArr(vM01, p0[0], -45, p0[1])
    translateArr(vM02, p0[0], -45, p0[1])

    return {
        vM00,
        ind00,
        vM01,
        ind01,
        vM02,
        ind02,

        cM00,
        cM01,
        cM02,
        uM00,
        uM01,
        uM02,
    }
}