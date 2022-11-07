import {createDataWindowTrash} from "./dataWindowTresh";
import {translateArr} from "../geometry/helpers";
import {createDataArc} from "./dataArc";


export const createDataArcWindow = data => {
    const {
        x = 0,
        z = 0,
        w = 20,
        wc = 5,
        h = 150,
        t = 20,
        innerH = 100,
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
        translateArr(windowTrash.v, x, 0, z)
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
    translateArr(arc.v, x, 0, z || 0)
    v.push(...arc.v)
    c.push(...arc.c)

    return { v, c }
}