import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6
const S = 40
const S2 = S * 2
const SM = 41
const SMH = 3000

export const createElemFinal = ({

}) => {
    const v = []
    const c = []
    const u = []
    const col = []


    /** sides ***/



    const colorPolygonOuter = fillColorFace([1, 1, 1])
    const colorSideOuter = [
        ...colorPolygonOuter,
    ]

    const colorPolygonInner = fillColorFace([1, 1, 1])
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
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [-S, -S2 -(i * S2), -S],
                [-S, -S2 - (i * S2), S],
                [-S, -(i * S2), S],
                [-S, - (i * S2), -S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [S, -S2 -(i * S2), -S],
                [S, -S2 - (i * S2), S],
                [S, -(i * S2), S],
                [S, - (i * S2), -S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [S, -S2 -(i * S2), S],
                [-S, -S2 - (i * S2), S],
                [-S, -(i * S2), S],
                [S, - (i * S2), S],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])
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
            [-SM, -SMH, SM],
            [-SM, -SMH, -SM],
            [-SM, 0, -SM],
            [-SM, 0, SM],
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


