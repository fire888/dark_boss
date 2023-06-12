import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6
const { sin, cos } = Math

export const createElemSuperWallData = () => {
    const v = []
    const c = []
    const u = []
    const col = []

    const colorPolygon = fillColorFace(COLOR_00)


    // v.push(
    //     1000, 0, 1000,
    //     -1000, 0, 1000,
    //     -1000, 1000, 1000,
    //
    //     1000, 0, 1000,
    //     -1000, 1000, 1000,
    //     1000, 1000, 1000,
    // )

    u.push(
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0,
    )

    c.push(
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    )

    const W = 10000

    v.push(
        -W, 0, -W,
        W, 0, -W,
        W, W, -W,

        -W, 0, W,
        W, 0, W,
        W, 0, -W,

        -W, 0, W,
        W, 0, -W,
        -W, 0, -W,

        -W, 0, -W,
        W, W, -W,
        -W, W, -W,
    )

    u.push(
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0,
        0, 0,
    )

    c.push(
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    )

    return { v, col, u, c }
}


