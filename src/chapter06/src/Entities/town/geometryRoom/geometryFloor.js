
import { createFace } from '../../../helpers/geomHelpers'
const uv6 = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]

const y0 = -61
const y00 = -64



const white1 = [1, 1, 1]
const white6 = [
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
]

export const createFloor = (data, colorW, colorB) => {

    data.colorRoom[0] *= 1.2
    data.colorRoom[1] *= 1.2
    data.colorRoom[2] *= 1.2

    const colorRoom6 = [
        ...data.colorRoom, ...data.colorRoom, ...data.colorRoom,
        ...data.colorRoom, ...data.colorRoom, ...data.colorRoom,
    ]

    const colorW6 = [...colorW, ...colorW, ...colorW, ...colorW, ...colorW, ...colorW]
    const colorB6 = [...colorB, ...colorB, ...colorB, ...colorB, ...colorB, ...colorB]

    const v = []
    const c = []
    const b = []
    const u = []


    const v2 = []
    const c2 = []


    const offset1 = 30
    const offset0 = 30 + 5

    const lX = (data.p1[0] - offset0) - (data.p0[0] + offset0)
    const lZ = (data.p2[1] + offset0) - (data.p1[1] - offset0) 

    const nX = Math.ceil(Math.abs(lX / 100))
    const nZ = Math.ceil(Math.abs(lZ / 100))

    const stepX = lX / nX
    const stepZ = lZ / nZ

    for (let i = 0; i < nX; ++i) {
        for (let j = 0; j < nZ; ++j) {
            v.push(
                ...createFace(
                    [data.p0[0] + offset0 + i * stepX,          y0,     data.p0[1] - offset0 + (j) * stepZ],
                    [data.p0[0] + offset0 + (i + 1) * stepX,    y0,     data.p0[1] - offset0 + (j) * stepZ],
                    [data.p0[0] + offset0 + (i + 1) * stepX,    y0,     data.p0[1] - offset0 + (j + 1) * stepZ],
                    [data.p0[0] + offset0 + i * stepX,          y0,     data.p0[1] - offset0 + (j + 1) * stepZ],
                )
            )
            c.push(...colorW6)
            //c2.push(...colorB6)
            u.push(...uv6)
        }
    }

    v.push(
        ...createFace(
            [data.p0[0] + offset1, y0, data.p0[1] - offset1],
            [data.p0[0] + offset0, y0, data.p0[1] - offset0],
            [data.p3[0] + offset0, y0, data.p3[1] + offset0],
            [data.p3[0] + offset1, y0, data.p3[1] + offset1],
        )
    )
    c.push(...colorRoom6)
    u.push(...uv6)
    v2.push(
        ...createFace(
            [data.p0[0] + offset1, y00, data.p0[1] - offset1],
            [data.p0[0] + offset0, y00, data.p0[1] - offset0],
            [data.p3[0] + offset0, y00, data.p3[1] + offset0],
            [data.p3[0] + offset1, y00, data.p3[1] + offset1],
        )
    )
    c2.push(...colorW6)




    v.push(
        ...createFace(
            [data.p0[0] + offset1, y0, data.p0[1] - offset1],
            [data.p1[0] - offset1, y0, data.p1[1] - offset1],
            [data.p1[0] - offset0, y0, data.p1[1] - offset0],
            [data.p0[0] + offset0, y0, data.p0[1] - offset0],
        )
    )
    c.push(...colorRoom6)
    u.push(...uv6)
    v2.push(
        ...createFace(
            [data.p0[0] + offset1, y00, data.p0[1] - offset1],
            [data.p1[0] - offset1, y00, data.p1[1] - offset1],
            [data.p1[0] - offset0, y00, data.p1[1] - offset0],
            [data.p0[0] + offset0, y00, data.p0[1] - offset0],
        )
    )
    c2.push(...colorW6)



    v.push(
        ...createFace(
            [data.p3[0] + offset0, y0, data.p3[1] + offset0],
            [data.p2[0] - offset0, y0, data.p2[1] + offset0],
            [data.p2[0] - offset1, y0, data.p2[1] + offset1],
            [data.p3[0] + offset1, y0, data.p3[1] + offset1],
        )
    )
    c.push(...colorRoom6)
    u.push(...uv6)
    v2.push(
        ...createFace(
            [data.p3[0] + offset0, y00, data.p3[1] + offset0],
            [data.p2[0] - offset0, y00, data.p2[1] + offset0],
            [data.p2[0] - offset1, y00, data.p2[1] + offset1],
            [data.p3[0] + offset1, y00, data.p3[1] + offset1],
        )
    )
    c2.push(...colorW6)

    v.push(
        ...createFace(
            [data.p1[0] - offset0, y0, data.p1[1] - offset0],
            [data.p1[0] - offset1, y0, data.p1[1] - offset1],
            [data.p2[0] - offset1, y0, data.p2[1] + offset1],
            [data.p2[0] - offset0, y0, data.p3[1] + offset0],
        )
    )
    c.push(...colorRoom6)
    u.push(...uv6)
    v2.push(
        ...createFace(
            [data.p1[0] - offset0, y00, data.p1[1] - offset0],
            [data.p1[0] - offset1, y00, data.p1[1] - offset1],
            [data.p2[0] - offset1, y00, data.p2[1] + offset1],
            [data.p2[0] - offset0, y00, data.p3[1] + offset0],
        )
    )
    c2.push(...colorW6)


    /** outer white **/
    v.push(
        ...createFace(
            [data.p0[0], y0, data.p0[1]],
            [data.p1[0], y0, data.p1[1]],
            [data.p1[0] - offset1, y0, data.p1[1] - offset1],
            [data.p0[0] + offset1, y0, data.p0[1] - offset1],
        )
    )
    c.push(...white6)
    //c2.push(...colorB6)
    u.push(...uv6)

    v.push(
        ...createFace(
            [data.p1[0] - offset1, y0, data.p1[1] - offset1],
            [data.p1[0], y0, data.p1[1]],
            [data.p2[0], y0, data.p2[1]],
            [data.p2[0] - offset1, y0, data.p2[1] + offset1],
        )
    )
    c.push(...white6)
    //c2.push(...colorB6)
    u.push(...uv6)

    v.push(
        ...createFace(
            [data.p3[0], y0, data.p3[1]],
            [data.p3[0] + offset1, y0, data.p3[1] + offset1],
            [data.p2[0] - offset1, y0, data.p2[1] + offset1],
            [data.p2[0], y0, data.p2[1]],
        )
    )
    c.push(...white6)
    //c2.push(...colorB6)
    u.push(...uv6)

    v.push(
         ...createFace(
             [data.p0[0], y0, data.p0[1]],
             [data.p0[0] + offset1, y0, data.p0[1] - offset1],
             [data.p3[0] + offset1, y0, data.p2[1] + offset1],
             [data.p3[0], y0, data.p3[1]],
         )
    )
    c.push(...white6)
    //c2.push(...colorB6)
    u.push(...uv6)

    return { v, c, b, u, c2, v2 }
}