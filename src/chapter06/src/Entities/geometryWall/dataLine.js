import {
    createFace,
    createUv,
    fillColorFace,
    translateArr,
    getAngle,
    rotateArrZ,
    fillColor6,
} from '../geometry/helpers'


export const createDataLine = (params, p1, p2) => {
    let {
        color1 = [1, 1, 1],
        color2 = [0, 0, 1],
        l = 100,
        w = 2,
        t = 20,
    } = params

    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const length = Math.sqrt(dx * dx + dy * dy)
    l = length


    const v = []
    const c = []
    const u2 = []


    const hw = w / 2
    const ht = t / 2

    v.push(
        ...createFace(
            [-hw, 0, ht],
            [hw, 0, ht],
            [hw, l, ht],
            [-hw, l, ht],
        ),
        ...createFace(
            [-hw, 0, -ht],
            [-hw, 0, ht],
            [-hw, l, ht],
            [-hw, l, -ht],
        ),
        ...createFace(
            [hw, 0, ht],
            [hw, 0, -ht],
            [hw, l, -ht],
            [hw, l, ht],
        ),
        ...createFace(
            [hw, 0, -ht],
            [-hw, 0, -ht],
            [-hw, l, -ht],
            [hw, l, -ht],
        ),
    )
    c.push(
        ...fillColor6(color1),
        ...fillColor6(color2),
        ...fillColor6(color2),
        ...fillColor6(color1),
    )
    u2.push(
        0, 0,   0, 0,   0, 0,    0, 0,   0, 0,   0, 0,
        0, .75,   .25, .75,   .25, 2,    0, .75,   .25, 1,   0, 1,
        0, .75,   .25, .75,   .25, 2,    0, .75,   .25, 1,   0, 1,
        0, 0,   0, 0,   0, 0,    0, 0,   0, 0,   0, 0,
    )

    const angle = getAngle(dx, dy)
    rotateArrZ(v, angle)
    translateArr(v, p1.x, p1.y, 0)


    return { v, c, u2 }

}