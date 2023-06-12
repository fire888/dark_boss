import {
    angleFromCoords,
    rotateArrY,
    translateArr,
} from '../../../helpers/geomHelpers'

let isFirst = true
const L = 5
const L2 = 0
const Z = 6
export const corner_00_easy = data => {
    if (isFirst) {
        console.log(data)
        isFirst = false
    }
    let { p0, p1, p2, h0, h1, isCapTop } = data
    if (isCapTop) {
        h1 += .5
    }

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

    {
        const dX = p0[0] - p1[0]
        const dZ = p0[1] - p1[1]
        const l = L//Math.sqrt((dX * dX) + (dZ * dZ))
        const angle = angleFromCoords(dX, dZ)

        const v = [
            L2, h0, Z, // 0
            l, h0, Z, // 1
            l, h1, Z, // 2
            L2, h1, Z, // 3

            l, h0, Z, // 4
            l, h0, 0, // 5
            l, h1, 0, // 6
            l, h1, Z, // 7
        ]
        ind01.push(
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
        )
        rotateArrY(v, -angle)
        vM01.push(...v)
    }

    {
        const dX = p1[0] - p2[0]
        const dZ = p1[1] - p2[1]
        const l = L// Math.sqrt((dX * dX) + (dZ * dZ))
        const angle = angleFromCoords(dX, dZ)

        const v = [
            -l, h0, Z, // 8
            -L2, h0, Z, // 9
            -L2, h1, Z, // 10
            -l, h1, Z, // 11

            -l, h0, Z, // 12
            -l, h0, 0,
            -l, h1, 0,
            -l, h1, Z, // 15
        ]
        ind01.push(
            8, 9, 10, 8, 10, 11,
            13, 12, 15, 13, 15, 14,
        )
        rotateArrY(v, -angle)
        vM01.push(...v)
    }


    {
        vM01.push(
            vM01[9 * 3], // 16
            vM01[9 * 3 + 1],
            vM01[9 * 3 + 2],

            vM01[0 * 3], // 17
            vM01[0 * 3 + 1],
            vM01[0 * 3 + 2],

            vM01[3 * 3], // 18
            vM01[3 * 3 + 1],
            vM01[3 * 3 + 2],

            vM01[10 * 3], // 19
            vM01[10 * 3 + 1],
            vM01[10 * 3 + 2],
        )
        ind01.push(16, 17, 18, 16, 18, 19)
    }

    if (isCapTop) {
        vM01.push(
            vM01[2 * 3], // 20
            vM01[2 * 3 + 1],
            vM01[2 * 3 + 2],

            vM01[15 * 3], // 21
            vM01[15 * 3 + 1],
            vM01[15 * 3 + 2],

            vM01[10 * 3], // 22
            vM01[10 * 3 + 1],
            vM01[10 * 3 + 2],

            vM01[3 * 3], // 23
            vM01[3 * 3 + 1],
            vM01[3 * 3 + 2],



            vM01[6 * 3], // 24
            vM01[6 * 3 + 1],
            vM01[6 * 3 + 2],

            vM01[14 * 3], // 25
            vM01[14 * 3 + 1],
            vM01[14 * 3 + 2],

            vM01[11 * 3], // 26
            vM01[11 * 3 + 1],
            vM01[11 * 3 + 2],

            vM01[7 * 3], // 27
            vM01[7 * 3 + 1],
            vM01[7 * 3 + 2],
        )
        ind01.push(
            20, 21, 22, 20, 22, 23,
            24, 25, 26, 24, 26, 27,
        )
    }

    translateArr(vM01, p1[0], -45, p1[1])

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