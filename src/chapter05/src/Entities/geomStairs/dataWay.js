import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare,
    translateArr,
    rotateArr,
} from '../geomGallery/helpers'
import { lCol, lW } from '../../constants/constants_elements'

import { createDataSideColumn } from '../geomGallery/dataSideColumn'
import { createTopElem } from '../geomGallery/dataTopElem'

const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math

const hPI = PI / 2
const colorB = [0, 0, 0]



const createScheme = () => {
    const r = 20
    const stepH = 30
    const count = 25
    const tickness = 7
    const hColumn = stepH * 4
    const rColumn = 3
    const offset = 50

    const lBridge = offset + offset - r - r



    const scheme = []
    for (let i = 0; i < count; ++i) {
        const h = stepH * i
        const hh = h - tickness

        let x = 0
        let z = 0

        const p = i % 4
        if (p < 1) {
            x = -offset
            z = -offset
        } else if (p < 2) {
            x = offset
            z = -offset
        } else if (p < 3) {
            x = offset
            z = offset
        } else if (p < 4) {
            x = -offset
            z = offset
        }

        scheme.push({
            offset,
            h,
            hh,
            r,
            x,
            z,
            bridgeMinusH: stepH,
            bridgeL: lBridge,
            hColumn,
            rColumn,
            i,
            isTop: count - i < 5,
        })
    }

    return scheme
}


const createSegment = (data, color1, color2,) => {
    console.log(data.isTop)
    const { h, /*hh,*/ r, x, z, bridgeL, bridgeMinusH, hColumn, rColumn, i } = data

    const hh = h - 5

    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)

    const hCol = hColumn * (Math.random() * 0.35 + 0.1)

    const v = []
    const c = []
    const u = []

    v.push(
        /** place */

        ...createFace(
            [-r, h, r],
            [r, h, r],
            [r, h, -r],
            [-r, h, -r],
        ),

        ...createFace(
            [-r, hh, r],
            [r, hh, r],
            [r, h, r],
            [-r, h, r],
        ),

        ...createFace(
            [-r, hh, -r],
            [-r, hh, r],
            [-r, h, r],
            [-r, h, -r],
        ),

        ...createFace(
            [r, hh, r],
            [r, hh, -r],
            [r, h, -r],
            [r, h, r],
        ),

        ...createFace(
            [r, hh, -r],
            [-r, hh, -r],
            [-r, h, -r],
            [r, h, -r],
        ),

        // bottom
        ...createFace(
            [r, hh, -r],
            [r, hh, r],
            [-r, hh, r],
            [-r, hh, -r],
        ),

        /** connect */

        ...createFace(
            [-r, h, -r],
            [r, h, -r],
            [r, h - bridgeMinusH, -r - bridgeL],
            [-r, h - bridgeMinusH, -r - bridgeL],
        ),

        ...createFace(
            [-r, hh - bridgeMinusH, -r - bridgeL],
            [-r, hh, -r],
            [-r, h, -r],
            [-r, h - bridgeMinusH, -r - bridgeL],
        ),


        ...createFace(
            [r, hh, -r],
            [r, hh - bridgeMinusH, -r - bridgeL],
            [r, h - bridgeMinusH, -r - bridgeL],
            [r, h, -r],
        ),

        ...createFace(
            [-r, hh - bridgeMinusH, -r - bridgeL],
            [r, hh - bridgeMinusH, -r - bridgeL],
            [r, hh, -r],
            [-r, hh, -r],
        ),


        /** column */
        ...createFace(
            [r - rColumn, hh - hCol, r - rColumn],
            [r - rColumn, hh - hCol, r + rColumn],
            [r - rColumn, hh, r + rColumn],
            [r - rColumn, hh, r - rColumn],
        ),
        ...createFace(
            [r - rColumn, hh - hCol, r + rColumn],
            [r + rColumn, hh - hCol, r + rColumn],
            [r + rColumn, hh, r + rColumn],
            [r - rColumn, hh, r + rColumn],
        ),
        ...createFace(
            [r + rColumn, hh - hCol, r + rColumn],
            [r + rColumn, hh - hCol, r - rColumn],
            [r + rColumn, hh, r - rColumn],
            [r + rColumn, hh, r + rColumn],
        ),
        ...createFace(
            [r + rColumn, hh - hCol, r - rColumn],
            [r - rColumn, hh - hCol, r - rColumn],
            [r - rColumn, hh, r - rColumn],
            [r + rColumn, hh, r - rColumn],
        ),
    )

    const f = createDataSideColumn({
        h0: hh - hColumn - .1,
        h1: hh - hCol,
        color1: [0, 0, 0],
        color2,
        rBase: 5,
        hBase: 5,
        hBaseToTrunk: 1,
        hCapital: 2,
        rCapital: 6,
        hTrunkToCapital: 1,
        rTrunk:3,
    })

    const copy1 = [...f.frontVert]
    translateArr(copy1, r, 0, r)
    v.push(...copy1)

    const copy2 = [...f.frontVert]
    rotateArr(copy2, hPI)
    translateArr(copy2, r, 0, r)
    v.push(...copy2)

    const copy3 = [...f.frontVert]
    rotateArr(copy3, PI)
    translateArr(copy3, r, 0, r)
    v.push(...copy3)

    rotateArr(f.frontVert, PI + hPI)
    translateArr(f.frontVert, r, 0, r)
    v.push(...f.frontVert)

    const rBase = 5
    v.push(...createFace(
        [r - rBase, hh - hColumn -.1, r - rBase],
        [r + rBase, hh - hColumn -.1, r - rBase],
        [r + rBase, hh - hColumn -.1, r + rBase],
        [r - rBase, hh - hColumn -.1, r + rBase],
    ))

    const rCapital = 6
    v.push(...createFace(
        [r - rCapital, hh - hCol, r + rCapital],
        [r + rCapital, hh - hCol, r + rCapital],
        [r + rCapital, hh - hCol, r - rCapital],
        [r - rCapital, hh - hCol, r - rCapital],
    ))



    c.push(
        ...fillColorFace(color2),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(color2),

        /** column **/
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),

        ...f.frontColors,
        ...f.frontColors,
        ...f.frontColors,
        ...f.frontColors,

        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
    )

    u.push(
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvBr,
        ...uvBr,
        ...uvCl,
        ...uvCl,

        /** col */
        ...uvBr,
        ...uvBr,
        ...uvBr,
        ...uvBr,
        ...uvBr,

        ...f.frontUV,
        ...f.frontUV,
        ...f.frontUV,
        ...f.frontUV,

        ...uvBr,
        ...uvBr,
    )

    /** arc */
    const arcC = 5
    const arcL = r * 2 - 2
    const arcStep = arcL / arcC
    const hArc = hCol

    for (let i = 0; i < arcC; ++i) {
        const xSt = r - arcL - rColumn

        const phase0 = cos(i / arcC * (hPI))
        const phase1 = cos((i + 1) / arcC * (hPI))
        const hhArc = hh - hCol
        v.push(
            xSt + (i * arcStep), hhArc + (phase0 * hArc), r,
            xSt + ((i + 1) * arcStep), hhArc + (phase1 * hArc), r,
            xSt + (arcL), hh, r,
        )

        v.push(
            xSt + (i * arcStep), hhArc + (phase0 * hArc), r - 2,
            xSt + (arcL), hh, r - 2,
            xSt + ((i + 1) * arcStep), hhArc + (phase1 * hArc), r - 2,
        )

        c.push(
            ...color2,
            ...color2,
            ...color2,
        )
        c.push(
            ...color2,
            ...color2,
            ...color2,
        )

        u.push(0, 0, .3, 0, .3, .3)
        u.push(0, 0, .3, 0, .3, .3)


        v.push(...createFace(
            [xSt + (i * arcStep), hhArc + (phase0 * hArc), r],
            [xSt + (i * arcStep), hhArc + (phase0 * hArc), r - 2],
            [xSt + ((i + 1) * arcStep), hhArc + (phase1 * hArc), r - 2],
            [xSt + ((i + 1) * arcStep), hhArc + (phase1 * hArc), r],
        ))

        c.push(...fillColorFace(colorB))
        u.push(...uvCl)
    }

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



export const createWay = ({
  color1,
  color2,
  h2,
}) => {
    const scheme = createScheme()

    const vertP = []
    const colorsP = []
    const uvTopP = []
    for (let i = 0; i < scheme.length; ++i) {
        const { v, c, u } = createSegment(scheme[i], color1, color2)
        vertP.push(...v)
        colorsP.push(...c)
        uvTopP.push(...u)
    }

    return {
        vertP,
        colorsP,
        uvTopP,
    }
}


