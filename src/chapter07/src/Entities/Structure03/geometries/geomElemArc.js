import {H, W} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";
import { COLOR_00 } from '../../../constants/constants_elements'

const hpW = W / 6
const { sin, cos } = Math

export const createElemArcData = ({
    w = W / 3,
    h = H - 5,
    d = W / 3 / 2,
    segmentsNum = 5,
}) => {
    const v = []
    const c = []
    const u = []
    const col = []

    const colorPolygon = fillColorFace(COLOR_00)



    let startAngle = - Math.PI / 2
    const num = 8
    let stepAngle = Math.PI / num
    const thickness = 5
    const r0 = (w / 2) - thickness
    const r1 = (w / 2)

    const hR0 = h - r1 - 8

    const topBlockWTop = 5
    const topBlockWBottom = topBlockWTop - 1.3
    const topBlockLevelBottom = hR0 + r0


    for (let i = 1; i < num + 1; ++i) {
        const angle0 = startAngle + (stepAngle * (i - 1))
        const angle1 = startAngle + (stepAngle * (i))

        /** front */
        v.push(
            ...createFace(
                [sin(angle0) * r0, hR0 + cos(angle0) * r0, d],
                [sin(angle1) * r0, hR0 + cos(angle1) * r0, d],
                [sin(angle1) * r1, hR0 + cos(angle1) * r1, d],
                [sin(angle0) * r1, hR0 + cos(angle0) * r1, d],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['empty'])

        v.push(
            ...createFace(
                [sin(angle0) * r1, hR0 + cos(angle0) * r1, d],
                [sin(angle1) * r1, hR0 + cos(angle1) * r1, d],
                [sin(angle1) * r1, h, d],
                [sin(angle0) * r1, h, d],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['empty'])




        /** bottom ark */
        v.push(
            ...createFace(
                [sin(angle0) * r0, hR0 + cos(angle0) * r0, -d],
                [sin(angle1) * r0, hR0 + cos(angle1) * r0, -d],
                [sin(angle1) * r0, hR0 + cos(angle1) * r0, d],
                [sin(angle0) * r0, hR0 + cos(angle0) * r0, d],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['columnSide_0'])



        /** back sise */
        v.push(
            ...createFace(
                [sin(angle1) * r0, hR0 + cos(angle1) * r0, -d],
                [sin(angle0) * r0, hR0 + cos(angle0) * r0, -d],
                [sin(angle0) * r1, hR0 + cos(angle0) * r1, -d],
                [sin(angle1) * r1, hR0 + cos(angle1) * r1, -d],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['empty'])

        v.push(
            ...createFace(
                [sin(angle1) * r1, hR0 + cos(angle1) * r1, -d],
                [sin(angle0) * r1, hR0 + cos(angle0) * r1, -d],
                [sin(angle0) * r1, h, -d],
                [sin(angle1) * r1, h, -d],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['empty'])
    }



    {
        v.push(
            ...createFace(
                [-topBlockWBottom, topBlockLevelBottom, d + 1],
                [topBlockWBottom, topBlockLevelBottom, d + 1],
                [topBlockWTop, h, d + 1],
                [-topBlockWTop, h, d + 1],
            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['face_00'])
    }


    {
        v.push(
            ...createFace(
                [topBlockWBottom, topBlockLevelBottom, -d - 1],
                [-topBlockWBottom, topBlockLevelBottom, -d - 1],
                [-topBlockWTop, h, -d - 1],
                [topBlockWTop, h, -d - 1],

            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['face_00'])
    }


    /** left ***/
    {
        v.push(
            ...createFace(
                [-w / 2 + 1, hR0, -d],
                [-w / 2 + 1, hR0, d],
                [-w / 2 + 1, h, d],
                [-w / 2 + 1, h, -d],

            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['briks'])
    }

    {
        v.push(
            ...createFace(
                [w / 2 - 1, hR0, d],
                [w / 2 - 1, hR0, -d],
                [w / 2 - 1, h, -d],
                [w / 2 - 1, h, d],

            )
        )
        c.push(...colorPolygon)
        u.push(...tileUv['briks'])
    }


    /** bottom */
    v.push(
        ...createFace(
            [-w / 2, hR0, -d],
            [-r0, hR0, -d],
            [-r0, hR0, d],
            [-w / 2, hR0, d],

        )
    )
    c.push(...colorPolygon)
    u.push(...tileUv['lines'])

    v.push(
        ...createFace(
            [r0, hR0, -d],
            [w / 2, hR0, -d],
            [w / 2, hR0, d],
             [r0, hR0, d],

        )
    )
    c.push(...colorPolygon)
    u.push(...tileUv['lines'])


    return { v, col, u, c }
}


