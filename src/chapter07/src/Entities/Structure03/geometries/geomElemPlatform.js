import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6

export const createPlatformData = ({
    nX_pZ = [-hpW, 0, hpW],
    pX_pZ = [hpW, 0, hpW],
    pX_nZ = [hpW, 0, -hpW],
    nX_nZ = [-hpW, 0, -hpW],
    minusH = -5,
    w = 30,
    d = 30,
    color = COLOR_00
}) => {
    const v = []
    const c = []
    const u = []
    const col = []


    /** sides ***/



    const colorPolygon = fillColorFace(color)
    const colorSide = [
        ...colorPolygon,
    ]


    /** top part **/
    v.push(
        ...createFace(
            [...nX_pZ],
            [...pX_pZ],
            [...pX_nZ],
            [...nX_nZ],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['lines'])
    col.push(
        ...createFace(
            [...nX_pZ],
            [...pX_pZ],
            [...pX_nZ],
            [...nX_nZ],
        )
    )

    /** bottom part  ***/
    v.push(
        ...createFace(
            [nX_nZ[0], nX_nZ[1] + minusH, nX_nZ[2]],
            [pX_nZ[0], pX_nZ[1] + minusH, pX_nZ[2]],
            [pX_pZ[0], pX_pZ[1] +  minusH, pX_pZ[2]],
            [nX_pZ[0], nX_pZ[1] + minusH, nX_pZ[2]],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['lines'])

    /** front */
    v.push(
        ...createFace(
            [nX_pZ[0], nX_pZ[1] + minusH, nX_pZ[2]],
            [pX_pZ[0], pX_pZ[1] + minusH, pX_pZ[2]],
            [pX_pZ[0], pX_pZ[1], pX_pZ[2]],
            [nX_pZ[0], nX_pZ[1], nX_pZ[2]],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_00'])
    col.push(
        ...createFace(
            [nX_pZ[0], nX_pZ[1] + minusH, nX_pZ[2]],
            [pX_pZ[0], pX_pZ[1] + minusH, pX_pZ[2]],
            [pX_pZ[0], pX_pZ[1], pX_pZ[2]],
            [nX_pZ[0], nX_pZ[1], nX_pZ[2]],
        )
    )

    /** left */
    v.push(
        ...createFace(
            [nX_nZ[0], nX_nZ[1] + minusH, nX_nZ[2]],
            [nX_pZ[0], nX_pZ[1] + minusH, nX_pZ[2]],
            [nX_pZ[0], nX_pZ[1], nX_pZ[2]],
            [nX_nZ[0], nX_nZ[1], nX_nZ[2]],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_00'])
    col.push(
        ...createFace(
            [nX_nZ[0], nX_nZ[1] + minusH, nX_nZ[2]],
            [nX_pZ[0], nX_pZ[1] + minusH, nX_pZ[2]],
            [nX_pZ[0], nX_pZ[1], nX_pZ[2]],
            [nX_nZ[0], nX_nZ[1], nX_nZ[2]],
        )
    )

    /** right */
    v.push(
        ...createFace(
            [pX_pZ[0], pX_pZ[1] + minusH, pX_pZ[2]],
            [pX_nZ[0], pX_nZ[1] + minusH, pX_nZ[2]],
            [pX_nZ[0], pX_nZ[1], pX_nZ[2]],
            [pX_pZ[0], pX_pZ[1], pX_pZ[2]],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_00'])
    col.push(
        ...createFace(
            [pX_pZ[0], pX_pZ[1] + minusH, pX_pZ[2]],
            [pX_nZ[0], pX_nZ[1] + minusH, pX_nZ[2]],
            [pX_nZ[0], pX_nZ[1], pX_nZ[2]],
            [pX_pZ[0], pX_pZ[1], pX_pZ[2]],
        )
    )

    /** back ***/

    v.push(
        ...createFace(
            [pX_nZ[0], pX_nZ[1] + minusH, pX_nZ[2]],
            [nX_nZ[0], nX_nZ[1] + minusH, nX_nZ[2]],
            [nX_nZ[0], nX_nZ[1], nX_nZ[2]],
            [pX_nZ[0], pX_nZ[1], pX_nZ[2]],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_00'])
    col.push(
        ...createFace(
            [pX_nZ[0], pX_nZ[1] + minusH, pX_nZ[2]],
            [nX_nZ[0], nX_nZ[1] + minusH, nX_nZ[2]],
            [nX_nZ[0], nX_nZ[1], nX_nZ[2]],
            [pX_nZ[0], pX_nZ[1], pX_nZ[2]],
        )
    )

    return { v, col, u, c }
}


