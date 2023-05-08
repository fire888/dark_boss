import {H} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {
    tileUv,
    randomTile,
} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const { sin, cos } = Math

export const createColumnData = ({
                              h = H,
                              w = 3,
                              bottomW = 5,
                              bottomH = 5,
                              topW = 5,
                              topH =15,
                          }) => {
    const v = []
    const c = []
    const u = []
    const col = []

    const sideV = []

    const h1 = bottomH + 2
    const h2 = h - topH - 2
    const h3 = h - topH

    const SIDES = 8
    const R1 = 3
    const R2 = 5

    const colorPolygon = fillColorFace(COLOR_00)

    /** base *****/
    for (let i = 0; i < SIDES; ++i) {
        let a0 = (i - 1) / SIDES * Math.PI * 2
        if (i === 0) {
            a0 = (SIDES - 1) / SIDES * Math.PI * 2
        }
        const a1 = i / SIDES  * Math.PI * 2


        v.push(
            0, -8, 0,
            sin(a1) * R2, 0, cos(a1) * R2,
            sin(a0) * R2, 0, cos(a0) * R2,

            ...createFace(
                [sin(a0) * R2, 0, cos(a0) * R2],
                [sin(a1) * R2, 0, cos(a1) * R2],
                [sin(a1) * R2, bottomH, cos(a1) * R2],
                [sin(a0) * R2, bottomH, cos(a0) * R2],
            ),

            ...createFace(
                [sin(a0) * R2, bottomH, cos(a0) * R2],
                [sin(a1) * R2, bottomH, cos(a1) * R2],
                [sin(a1) * R1, h1, cos(a1) * R1],
                [sin(a0) * R1, h1, cos(a0) * R1],
            ),
        )

        u.push(
            ...tileUv['three'],
            ...tileUv['line_p0'],
            ...tileUv['line_p1'],
        )

        c.push(
            ...COLOR_00,
            ...COLOR_00,
            ...COLOR_00,
            ...colorPolygon,
            ...colorPolygon,
        )
    }

    let savedL = h1
    while (savedL < h2) {
        let currentL = Math.random() * 30 + 2
        if (savedL + currentL > h2) {
            currentL = h2 - savedL
        }

        for (let i = 0; i < SIDES; ++i) {
            let a0 = (i - 1) / SIDES * Math.PI * 2
            if (i === 0) {
                a0 = (SIDES - 1) / SIDES * Math.PI * 2
            }
            const a1 = i / SIDES * Math.PI * 2


            v.push(
                ...createFace(
                    [sin(a0) * R1, savedL, cos(a0) * R1],
                    [sin(a1) * R1, savedL, cos(a1) * R1],
                    [sin(a1) * R1, savedL + currentL, cos(a1) * R1],
                    [sin(a0) * R1, savedL + currentL, cos(a0) * R1],
                ),
            )

            u.push(
                ...randomTile(),
            )

            c.push(
                ...colorPolygon,
            )
        }

        savedL = savedL + currentL
    }

    /** top *****/
    for (let i = 0; i < SIDES; ++i) {
        let a0 = (i - 1) / SIDES * Math.PI * 2
        if (i === 0) {
            a0 = (SIDES - 1) / SIDES * Math.PI * 2
        }
        const a1 = i / SIDES  * Math.PI * 2


        v.push(
            ...createFace(
                [sin(a0) * R1, h2, cos(a0) * R1],
                [sin(a1) * R1, h2, cos(a1) * R1],
                [sin(a1) * R2, h3, cos(a1) * R2],
                [sin(a0) * R2, h3, cos(a0) * R2],
            ),

            ...createFace(
                [sin(a0) * R2, h3, cos(a0) * R2],
                [sin(a1) * R2, h3, cos(a1) * R2],
                [sin(a1) * R2, h, cos(a1) * R2],
                [sin(a0) * R2, h, cos(a0) * R2],
            ),

            0, h + 12, 0,
            sin(a0) * R2, h, cos(a0) * R2,
            sin(a1) * R2, h, cos(a1) * R2,

        )

        u.push(
            ...tileUv['line_p0'],
            ...tileUv['line_p1'],
            ...tileUv['three'],
        )

        c.push(
            ...colorPolygon,
            ...colorPolygon,

            ...COLOR_00,
            ...COLOR_00,
            ...COLOR_00,
        )
    }


    return { v, col, u, c }
}
