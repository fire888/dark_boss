import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6

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
                [-20, -40 -(i * 40), -20],
                [20, -40 - (i * 40), -20],
                [20, -(i * 40), -20],
                [-20, - (i * 40), -20],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [-20, -40 -(i * 40), 20],
                [-20, -40 - (i * 40), -20],
                [-20, -(i * 40), -20],
                [-20, - (i * 40), 20],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [20, -40 -(i * 40), -20],
                [20, -40 - (i * 40), 20],
                [20, -(i * 40), 20],
                [20, - (i * 40), -20],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])

        v.push(
            ...createFace(
                [20, -40 -(i * 40), 20],
                [-20, -40 - (i * 40), 20],
                [-20, -(i * 40), 20],
                [20, - (i * 40), 20],
            )
        )
        c.push(...colorSide)
        u.push(...tileUv['gor_pattern_01'])
    }

    v.push(
        ...createFace(
            [20, -1000, -20.5],
            [-20, -1000, -20.5],
            [-20, 1000, -20.5],
            [20, 1000, -20.5],
        )
    )
    c.push(...colorSideOuter)
    u.push(...tileUv['white'])




    return { v, col, u, c }
}


