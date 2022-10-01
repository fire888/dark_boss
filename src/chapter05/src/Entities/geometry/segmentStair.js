import {
    translateArr,
    rotateArr,
} from './helpers'


import { createDataColumn } from './dataColumn'
import { createSimpleColumn } from './dataColumnSimple'
import { createDataArcHalf } from './dataArcHalf'
import { createTopElem } from './dataTopElem'
import { createDataStairSimple } from './dataStairSimple'


const colorB = [0, 0, 0]



export const createSegmentStair = (data, color1, color2,) => {
    const { h, r, x, z, bridgeL, bridgeMinusH, hColumn, rColumn, i } = data

    const hh = h - 5
    const hCol = hColumn * (Math.random() * 0.35 + 0.1)

    const v = []
    const c = []
    const u = []


    /** stairs **/
    const stair = createDataStairSimple({ h, hh, colorB, color2, bridgeL, bridgeMinusH, r })
    v.push(...stair.v)
    c.push(...stair.c)
    u.push(...stair.u)


    /** bottom part column */
    const column = createDataColumn({
        h0: hh - hColumn - .1,
        h1: hh - hCol,
        capTop: true,
        capBottom: true,
    })
    translateArr(column.v, r, 0, r)
    v.push(...column.v)
    c.push(...column.c)
    u.push(...column.u)


    /** top part column */
    const simpleColumn = createSimpleColumn({ isColumn: true, h1: hh - hCol, h2: hh, color1:[0, 0, 0], color2})
    translateArr(simpleColumn.vertColumn, r, 0, r)
    v.push(...simpleColumn.vertColumn)
    c.push(...simpleColumn.colorsColumn)
    u.push(...simpleColumn.uvColumn)


    /** arc */
    const arcL = 40
    const hArc = hCol
    const halfArcData = createDataArcHalf({ hArc, arcL, color2 })
    translateArr(halfArcData.v, r - rColumn - arcL, hh - hCol, r)
    v.push(...halfArcData.v)
    c.push(...halfArcData.c)
    u.push(...halfArcData.u)


    /** top elem **/
    if (data.isTop) {
        const topElemData = createTopElem({
            isTopElem: true,
            color1: [0, 0, 0],
            color2,
            h2: hh,
        })
        translateArr(topElemData.vertTopElem, r, 0, r)
        v.push(...topElemData.vertTopElem)
        c.push(...topElemData.colorsTopElem)
        u.push(...topElemData.uvTopElem)
    }


    rotateArr(v, Math.PI - ((Math.PI / 2) * (i)))
    translateArr(v, x, 0, z)

    return { v, c, u }
}