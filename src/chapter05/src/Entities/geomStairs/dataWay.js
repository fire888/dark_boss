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

const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math



const createScheme = () => {
    const r = 20
    const stepH = 20
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
        })
    }

    return scheme
}


const createSegment = (data, color1, color2,) => {
    const { h, hh, r, x, z, bridgeL, bridgeMinusH, hColumn, rColumn, i } = data

    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)
    const uvArc = [0, 0, 0, 0, 0, 0]

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
            [r - rColumn, h - hColumn, r - rColumn],
            [r - rColumn, h - hColumn, r + rColumn],
            [r - rColumn, h, r + rColumn],
            [r - rColumn, h, r - rColumn],
        ),
        ...createFace(
            [r - rColumn, h - hColumn, r + rColumn],
            [r + rColumn, h - hColumn, r + rColumn],
            [r + rColumn, h, r + rColumn],
            [r - rColumn, h, r + rColumn],
        ),
        ...createFace(
            [r + rColumn, h - hColumn, r + rColumn],
            [r + rColumn, h - hColumn, r - rColumn],
            [r + rColumn, h, r - rColumn],
            [r + rColumn, h, r + rColumn],
        ),
        ...createFace(
            [r + rColumn, h - hColumn, r - rColumn],
            [r - rColumn, h - hColumn, r - rColumn],
            [r - rColumn, h, r - rColumn],
            [r + rColumn, h, r - rColumn],
        ),
    )

    c.push(
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2)
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
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvCl,
    )

    /** arc */
    const arcC = 7
    const arcL = r
    const arcStep = arcL / arcC
    for (let i = arcC; i > 0; --i) {
        const phase0 = sin((arcC - i) / arcC * (Math.PI / 2))
        const phase1 = sin((arcC - i + 1) / arcC * (Math.PI / 2))
        v.push(
            r - ((i) * arcStep) - rColumn, hh - ((arcC - i) * 5), r,
            r - ((i - 1) * arcStep) - rColumn, hh - ((arcC - i + 1) * 5), r,
            //r - ((i) * arcStep) - rColumn, hh - phase0 * 10, r,
            //r - ((i - 1) * arcStep) - rColumn, hh - phase1 * 10, r,
            r, hh, r,
        )

        c.push(
            ...color1,
            ...color1,
            ...color1,
        )

        u.push(
            ...uvArc,
        )
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