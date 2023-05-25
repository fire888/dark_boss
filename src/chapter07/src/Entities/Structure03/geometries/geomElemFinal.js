import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'
import { FINAL_STRUCTURE } from '../../../constants/const_structures'

const S = 80
const S2 = S * 2
const SM = 81
const SMH = 3000

export const createElemFinal = ({

}) => {
    const v = []
    const c = []
    const u = []
    const col = []


    /** sides ***/
    const colorPolygonInner = fillColorFace(FINAL_STRUCTURE.COLOR_00)
    const colorSide = [
        ...colorPolygonInner,
    ]


    /** inner Part */
    for (let i = 0; i < 20; ++i) {
        v.push(
            ...createFace(
                [-S, -S2 -(i * S2), -S],
                [S, -S2 - (i * S2), -S],
                [S, -(i * S2), -S],
                [-S, - (i * S2), -S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['lines'])

        v.push(
            ...createFace(
                [-S, -S2 -(i * S2), S],
                [-S, -S2 - (i * S2), -S],
                [-S, -(i * S2), -S],
                [-S, - (i * S2), S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['lines'])

        v.push(
            ...createFace(
                [S, -S2 -(i * S2), -S],
                [S, -S2 - (i * S2), S],
                [S, -(i * S2), S],
                [S, - (i * S2), -S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['lines'])

        v.push(
            ...createFace(
                [S, -S2 -(i * S2), S],
                [-S, -S2 - (i * S2), S],
                [-S, -(i * S2), S],
                [S, - (i * S2), S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['lines'])
    }


    const v2 = []
    v2.push(
        ...createFace(
            [SM, -SMH, -SM],
            [-SM, -SMH, -SM],
            [-SM, 0, -SM],
            [SM, 0, -SM],
        )
    )
    v2.push(
        ...createFace(
            [-SM, -SMH, -SM],
            [-SM, -SMH, SM],
            [-SM, 0, SM],
            [-SM, 0, -SM],
        )
    )
    v2.push(
        ...createFace(
            [-SM, -SMH, SM],
            [SM, -SMH, SM],
            [SM, 0, SM],
            [-SM, 0, SM],
        )
    )
    v2.push(
        ...createFace(
            [SM, -SMH, SM],
            [SM, -SMH, -SM],
            [SM, 0, -SM],
            [SM, 0, SM],
        )
    )


    return { v, col, u, c, v2 }
}


