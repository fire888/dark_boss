import {
    angleFromCoords,
    rotateArrY,
    translateArr,
} from '../../../helpers/geomHelpers'

let isFirst = true
const L = 5
const L2 = 0
export const ceiling_00_easy = data => {
    if (isFirst) {
        console.log(data)
        isFirst = false
    }
    let { p0, p1, p2, p3, h0} = data
    h0 -= 45

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

    vM02.push(
        p0[0], h0, p0[1],
        p1[0], h0, p1[1],
        p2[0], h0, p2[1],
        p3[0], h0, p3[1],
    )
    ind02.push(0, 1, 2, 0, 2, 3)

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