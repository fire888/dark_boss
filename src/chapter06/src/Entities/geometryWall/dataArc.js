import {
    createFace,
    createUv,
    fillColorFace,
    translateArr,
    getAngle,
    rotateArrZ,
    fillColor6,
} from '../geometry/helpers'

import {
    COLOR1_1,
    COLOR1_6,
    COLOR2_1,
    COLOR2_6,
    COLOR3_1,
    COLOR3_6,
} from '../../constants/constants_materials'

export const createDataArc = data => {
    const {
        w = 50,
        wc = 10,
        t = 15,
        h0 = 0,
        h1 = 100,
        h2 = 180,
    } = data

    const th = t / 2
    const wh = w / 2


    const v = []
    const c = []


    /** arc ****************/
    const pointsA = []
    const count = 20
    for (let i = 0; i < count + 1; ++i) {
        const phase = (i / count) * Math.PI - (Math.PI / 2)
        const p = [Math.sin(phase) * wh, Math.cos(phase) * wh]
        pointsA.push(p)
    }

    for (let i = 0; i < pointsA.length; ++i) {
        if (!pointsA[i - 1]) {
            continue;
        }

        v.push(
            ...createFace(
                [pointsA[i][0], pointsA[i][1], th],
                [pointsA[i - 1][0], pointsA[i - 1][1], th],
                [pointsA[i - 1][0], pointsA[i - 1][1], -th],
                [pointsA[i][0], pointsA[i][1], -th],
            )
        )
        c.push(...COLOR3_6)

        if (pointsA[i][0] <= 0) {
            /** front */
            v.push(
                -wh - wc, h2 - (h1 - h0), th,
                pointsA[i - 1][0], pointsA[i - 1][1], th,
                pointsA[i][0], pointsA[i][1], th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
            v.push(
                -wh - wc, h2 - (h1 - h0), -th,
                pointsA[i][0], pointsA[i][1], -th,
                pointsA[i - 1][0], pointsA[i - 1][1], -th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        }
        if (pointsA[i][0] > 0) {
            v.push(
                wh + wc, h2 - (h1 - h0), th,
                pointsA[i - 1][0], pointsA[i - 1][1], th,
                pointsA[i][0], pointsA[i][1], th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
            v.push(
                wh + wc, h2 - (h1 - h0), -th,
                pointsA[i][0], pointsA[i][1], -th,
                pointsA[i - 1][0], pointsA[i - 1][1], -th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        }
        if (i === count / 2) {
            v.push(
                -wh - wc, h2 - (h1 - h0), th,
                pointsA[i][0], pointsA[i][1], th,
                wh + wc, h2 - (h1 - h0), th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
            v.push(
                wh + wc, h2 - (h1 - h0), -th,
                pointsA[i][0], pointsA[i][1], -th,
                -wh - wc, h2 - (h1 - h0), -th,
            )
            c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        }
        /** back */


    }

    if (h1 - h0 > 0) {
        translateArr(v, 0, h1 - h0, 0)
    }


    /** columns */
    if (h1 - h0 > 0) {
        v.push(
            /** left inner */
            ...createFace(
                [-wh, h0, th],
                [-wh, h0, -th],
                [-wh, h1, -th],
                [-wh, h1, th],
            ),
            /** right inner */
            ...createFace(
                [wh, h0, -th],
                [wh, h0, th],
                [wh, h1, th],
                [wh, h1, -th],
            ),
            /** left front */
            ...createFace(
                [-wh - wc, h0, th],
                [-wh, h0, th],
                [-wh, h1, th],
                [-wh - wc, h1, th],
            ),
            /** right front */
            ...createFace(
                [wh, h0, th],
                [wh + wc, h0, th],
                [wh + wc, h1, th],
                [wh, h1, th],
            ),

            /** left back */
            ...createFace(
                [-wh, h0, -th],
                [-wh - wc, h0, -th],
                [-wh - wc, h1, -th],
                [-wh, h1, -th],
            ),
            /** right back */
            ...createFace(
                [wh + wc, h0, -th],
                [wh, h0, -th],
                [wh, h1, -th],
                [wh + wc, h1, -th],
            ),

            /** left cap to top */
            -wh - wc, h1, th,
            -wh, h1, th,
            -wh - wc, h2, th,

            /** right cap to top */
            wh, h1, th,
            wh + wc, h1, th,
            wh + wc, h2, th,

            /** back */
            /** left cap to top */
            -wh - wc, h2, -th,
            -wh, h1, -th,
            -wh - wc, h1, -th,


            /** right cap to top */
            wh + wc, h2, -th,
            wh + wc, h1, -th,
            wh, h1, -th,
        )




        c.push(...COLOR3_6)
        c.push(...COLOR3_6)
        c.push(...COLOR2_6)
        c.push(...COLOR2_6)
        c.push(...COLOR2_6)
        c.push(...COLOR2_6)

        c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)
        c.push(...COLOR2_1, ...COLOR2_1, ...COLOR2_1)


        
    }

    /** cap l */
    v.push(
        ...createFace(
            [-wh - wc, h0, -th],
            [-wh - wc, h0, th],
            [-wh - wc, h2, th],
            [-wh - wc, h2, -th],
        )
    )
    c.push(...COLOR2_6)
    /** cap r */        
    v.push(
        ...createFace(
            [wh + wc, h0, th],
            [wh + wc, h0, -th],
            [wh + wc, h2, -th],
            [wh + wc, h2, th],
        )
    )
    c.push(...COLOR2_6)

    return { v, c }
}