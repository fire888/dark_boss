import { createDataArcWindow } from "./dataArcWindow";


export const createDataGeomTownSegment = data => {
    console.log(data)

    const {
        x,
        z,
        node,
    } = data

    const v = []
    const c = []

    const dataArc = createDataArcWindow({
        h: 250,
        innerH: 103.19155704929601,
        isWindow: true,
        w: 65.58940133582206,
        wc: 2.5,
        x,
        z,
    })


    v.push(...dataArc.v)
    c.push(...dataArc.c)



    return { v, c }
}