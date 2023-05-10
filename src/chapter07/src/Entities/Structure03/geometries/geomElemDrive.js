import {H} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {
    tileUv,
    randomTile,
} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const { sin, cos } = Math

export const createElemDrive = ({
                                     h = 41,
                                     h0 = 3,
                                     h00 = 5,
                                     w0 = 10,
                                     w = 3,
                                     h1 = h - 10,
                                     h11 = h - 7,
                                     w1 = 4.5,
                                     h2 = h - .5,
                                     bottomH = 5,
                                     topH = 15,
                                     color = COLOR_00
                                 }) => {
    const v = []
    const c = []
    const u = []
    const col = []

    const SIDES = 8


    const points = [
        [w0, 0, 'columnSide_0'],
        [w0, h0, 'line_p0'],
        [w, h00, 'line_p1'],
        [w, h1, 'columnSide_0'],
        [w1, h11, 'line_p1'],
        [w1, h2, 'line_p1'],
        [0, h, 'line_p1'],
    ]

    const colorPolygon = fillColorFace(color)

    for (let i = 1; i < points.length; ++i) {
        const r0 = points[i - 1][0]
        const r1 = points[i][0]

        for (let j = 0; j < SIDES; ++j) {
            let a0 = (j - 1) / SIDES * Math.PI * 2
            if (j === 0) {
                a0 = (SIDES - 1) / SIDES * Math.PI * 2
            }
            const a1 = j / SIDES  * Math.PI * 2

            v.push(
                ...createFace(
                    [sin(a0) * r0, points[i - 1][1], cos(a0) * r0],
                    [sin(a1) * r0, points[i - 1][1], cos(a1) * r0],
                    [sin(a1) * r1, points[i][1], cos(a1) * r1],
                    [sin(a0) * r1, points[i][1], cos(a0) * r1],
                ),
            )
            u.push(...tileUv[points[i][2]])
            c.push(...colorPolygon)
        }
    }

    /** collision */
    col.push(
        ...createFace(
            [-w0 / 2, 0, w0 / 2],
            [w0 / 2, 0, w0 / 2],
            [w0 / 2, h, w0 / 2],
            [-w0 / 2, h, w0 / 2],
        ),
        ...createFace(
            [w0 / 2, 0, w0 / 2],
            [w0 / 2, 0, -w0 / 2],
            [w0 / 2, h, -w0 / 2],
            [w0 / 2, h, w0 / 2],
        ),
        ...createFace(
            [w0 / 2, 0, -w0 / 2],
            [-w0 / 2, 0, -w0 / 2],
            [-w0 / 2, h, -w0 / 2],
            [w0 / 2, h, -w0 / 2],
        ),
        ...createFace(
            [-w0 / 2, 0, -w0 / 2],
            [-w0 / 2, 0, w0 / 2],
            [-w0 / 2, h, w0 / 2],
            [-w0 / 2, h, -w0 / 2],
        ),
    )


    return { v, col, u, c }
}
