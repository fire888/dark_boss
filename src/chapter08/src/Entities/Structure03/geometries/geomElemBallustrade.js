import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6

export const createBallustrade = ({
    w = hpW,
    d = 3,
    h = 12,
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
            [-w, h, d],
            [w, h, d],
            [w, h, -d],
            [-w, h, -d],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_01'])

    v.push(
        ...createFace(
            [-w, h - 3, d],
            [w, h - 3, d],
            [w, h, d],
            [-w, h, d],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_01'])

    v.push(
        ...createFace(
            [w, h - 3, -d],
            [-w, h - 3, -d],
            [-w, h, -d],
            [w, h, -d],
        )
    )
    c.push(...colorSide)
    u.push(...tileUv['gor_pattern_01'])









    col.push(
        ...createFace(
            [-w, h, d],
            [w, h, d],
            [w, h, -d],
            [-w, h, -d],
        )
    )


    return { v, col, u, c }
}


