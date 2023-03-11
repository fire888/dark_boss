import {
    angleFromCoords,
    rotateArrY,
    translateArr,
} from '../../../helpers/geomHelpers'

let isFirst = true
const L = 5
const L2 = 0

const offsetL = 3
const TICK = 6
const DEP = 7
const DEP_2 = -15

export const door_00_easy = data => {
    if (isFirst) {
        isFirst = false
    }
    const { p0, p1, h0, h1 } = data

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

    const dX = p0[0] - p1[0]
    const dZ = p0[1] - p1[1]
    const l = Math.sqrt((dX * dX) + (dZ * dZ))
    const angle = angleFromCoords(dX, dZ)

    vM02.push(
        -offsetL, h0, DEP, // 0
        -offsetL + TICK, h0, DEP, // 1
        -offsetL + TICK, h1 - DEP, DEP, // 2
        -offsetL, h1, DEP, // 3

        l + offsetL - TICK, h0, DEP, // 4
        l + offsetL, h0, DEP, // 5
        l + offsetL, h1, DEP, // 6
        l + offsetL - TICK, h1 - DEP, DEP, // 7

        -offsetL, h0, DEP_2 , //8
        -offsetL + TICK, h0, DEP_2 , // 9
        -offsetL + TICK, h1 - DEP, DEP_2 , // 10
        -offsetL, h1, DEP_2, // 11

        l + offsetL - TICK, h0, DEP_2 , // 12
        l + offsetL, h0, DEP_2 , // 13
        l + offsetL, h1, DEP_2 , // 14
        l + offsetL - TICK, h1 - TICK, DEP_2 , // 15
    )
    ind02.push(
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6 , 7,
        3, 2, 7, 3, 7, 6,

        8, 0, 3, 8, 3, 11,
        1, 9, 10, 1, 10, 2,
        12, 4, 7, 12, 7, 15,
        5, 13, 14, 5, 14, 6,
        7, 2, 10, 7, 10, 15,
        3, 6, 14, 3, 14, 11,

        9, 8, 11, 9, 11, 10,
        13, 12, 15, 13, 15, 14,
        15, 10, 11, 15, 11, 14
    )




    rotateArrY(vM02, -angle)
    translateArr(vM02, p1[0], -45, p1[1])


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