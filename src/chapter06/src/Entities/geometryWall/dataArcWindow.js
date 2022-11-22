import {createDataWindowTrash} from "./dataWindowTresh"
import {createDataArc} from "./dataArc"
import {
    translateArr,
    rotateArrY,
} from "../geometry/helpers"



export const createDataArcWindow = data => {
    const {
        x = 0,
        y = 0,
        z = 0,
        w = 20,
        wc = 5,
        h = 150,
        t = 20,
        innerH = 100,
        angle = 0,
    } = data

    const v = []
    const c = []
    if (data.isWindow) {
        const windowTrash = createDataWindowTrash({
            w: w,
            h: innerH,
            t: 10,
            countTrash: w / 5
        })
        v.push(...windowTrash.v)
        c.push(...windowTrash.c)
    }

    const arc = createDataArc({
        w: w,
        t: t,
        h1: innerH - (w / 2),
        wc: wc,
        h2: h,
    })
    //translateArr(arc.v, x, 0, z || 0)
    v.push(...arc.v)
    c.push(...arc.c)

    rotateArrY(v, angle)
    translateArr(v, x, y, z)

    return { v, c }
}