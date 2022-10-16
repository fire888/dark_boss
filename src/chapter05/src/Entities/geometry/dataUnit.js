import {
    createFace,
    createUv,
    fillColorFace,
    rotateArrY, translateArr,
} from './helpers'



const { PI, sin, cos } = Math
const PI2 = PI * 2



const createG = () => {
    const count = 5
    const h = 7
    const hD = -7
    const hh = 15
    const hhD = -15
    const r = 15
    const w = 2
    const wt = 3
    const wtr = 2
    const rInner = -5

    const data = {
        tt: [],
        top: [],
        bot: [],
        bb: [],
    }


    for (let i = 0; i < count; ++i) {
        const ph1 = i / count * PI2
        const t = [
            // penta
            0, -w, 0,
            w, 0, 0,
            w, w, 0,
            -w, w, 0,
            -w, 0, 0,

            // cone
            0, 4, 10,

            // tr
            -wtr, -h * 1.7, rInner,
            wtr, -h * 1.7, rInner,
            0, -h * .7, rInner
        ]
        rotateArrY(t, ph1)
        translateArr(t, sin(ph1) * r, h, cos(ph1) * r)
        data.top.push(t)



        const ph2 = (i + .5) / count * PI2
        const b = [
            // penta
            0, w, 0,
            -w, 0, 0,
            -w, -w, 0,
            w, -w, 0,
            w, 0, 0,

            // cone
            0, -4, 10,

            // tr
            -wtr, h * 1.7, rInner,
            0, h * .7, rInner,
            wtr, h * 1.7, rInner
        ]
        rotateArrY(b, ph2)
        translateArr(b, sin(ph2) * r, hD, cos(ph2) * r)
        data.bot.push(b)


        data.tt.push(sin(ph1) * wt, hh, cos(ph1) * wt)
        data.bb.push(sin(ph1) * wt, hhD, cos(ph1) * wt)
    }


    return data
}







export const createDataUnit = () => {

    const v = []
    const c = []
    const r = 5
    const r2 = 15


    const n = createG()

    const c1W = [0, 1, 0]
    const c3W = [...c1W, ...c1W, ...c1W]
    const c6W = [...c3W, ...c3W]

    const c1R = [0, 1, 0]
    const c3R = [...c1R, ...c1R, ...c1R]
    const c6R = [...c3R, ...c3R]

    const c1B = [0, 0, 0]
    const c3B = [...c1B, ...c1B, ...c1B]
    const c6B = [...c3B, ...c3B]
    
    
    const f = (i, j) => {
        const b = n.bot[i]
        const bN = n.bot[j]
        const t = n.top[i]
        const tN = n.top[j]

        /** high cone */
        v.push(
            n.tt[i * 3], n.tt[i * 3 + 1], n.tt[i * 3 + 2],
            n.tt[j * 3], n.tt[j * 3 + 1], n.tt[j * 3 + 2], 
            0, n.tt[i * 3 + 1] + 12, 0,
        )
        c.push(...c3W)

        /** to high cone */
        v.push(...createFace(
            [t[9], t[10], t[11]],
            [t[6], t[7], t[8]],
            [n.tt[j * 3], n.tt[j * 3 + 1], n.tt[j * 3 + 2]],
            [n.tt[i * 3], n.tt[i * 3 + 1], n.tt[i * 3 + 2]],
        ))
        c.push(...c6W)

        /** b -> t */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [b[12], b[13], b[14]],
            [tN[0], tN[1], tN[2]],
            [tN[12], tN[13], tN[14]],
        ))
        c.push(...c6W)

        /** top connect */
        v.push(...createFace(
            [t[3], t[4], t[5]],
            [tN[12], tN[13], tN[14]],
            [tN[9], tN[10], tN[11]],
            [t[6], t[7], t[8]],
        ))
        c.push(...c6W)

        /** bot connect */         
        v.push(...createFace(
            [b[9], b[10], b[11]],
            [bN[6], bN[7], bN[8]],
            [bN[3], bN[4], bN[5]],
            [b[12], b[13], b[14]],
        ))
        c.push(...c6W)

        /** to bot cone */
        v.push(...createFace(
            [n.bb[i * 3], n.bb[i * 3 + 1], n.bb[i * 3 + 2]],
            [n.bb[j * 3], n.bb[j * 3 + 1], n.bb[j * 3 + 2]],
            [b[9], b[10], b[11]],
            [b[6], b[7], b[8]],
        ))
        c.push(...c6W)

        /** bb cone */
        v.push(
            n.bb[j * 3], n.bb[j * 3 + 1], n.bb[j * 3 + 2], 
            n.bb[i * 3], n.bb[i * 3 + 1], n.bb[i * 3 + 2],
            0, n.bb[i * 3 + 1] - 12, 0,
        )
        c.push(...c3W)

        /** t -> b */
        v.push(...createFace(
            [b[3], b[4], b[5]],
            [b[0], b[1], b[2]],
            [t[3], t[4], t[5]],
            [t[0], t[1], t[2]],
        ))
        c.push(...c6W)


        /** cones */
        for (let k = 0; k < 15; k += 3) {    
            /** b cone */
            v.push(
                b[k], b[k + 1], b[k + 2],
                b[k + 3], b[k + 4], b[k + 5],
                b[15], b[16], b[17],
            )
            c.push(...c3W)

            /** t cone */
            v.push(
                t[k], t[k + 1], t[k + 2],
                t[k + 3], t[k + 4], t[k + 5],
                t[15], t[16], t[17],
            )
            c.push(...c3W)
        }

        /** b cone */
        v.push(
            b[12], b[13], b[14],
            b[0], b[1], b[2],
            b[15], b[16], b[17] // cone
        )
        c.push(...c3W)
        /** t cone */
        v.push(
            t[12], t[13], t[14],
            t[0], t[1], t[2],
            t[15], t[16], t[17], // cone
        )
        c.push(...c3W)

        //////////////////////////
        /** inner 1 */
        v.push(
            t[18], t[19], t[20],
            t[21], t[22], t[23],
            t[24], t[25], t[26], // cone
        )
        c.push(...c3R)


        /* r */
        v.push(...createFace(
            [t[21], t[22], t[23]],
            [b[3], b[4], b[5]],
            [t[0], t[1], t[2]],
            [t[24], t[25], t[26]],
        ))
        c.push(...c6B)
        /* lN */
        v.push(...createFace(
            [b[12], b[13], b[14]],
            [tN[18], tN[19], tN[20]],
            [tN[24], tN[25], tN[26]],
            [tN[0], tN[1], tN[2]],
        ))
        c.push(...c6B)
        /* bN */
        v.push(...createFace(
            [b[12], b[13], b[14]],
            [bN[3], bN[4], bN[5]],
            [tN[21], tN[22], tN[23]],
            [tN[18], tN[19], tN[20]],
        ))
        c.push(...c6B)




        /** inner 2 */
        v.push(
            b[18], b[19], b[20],
            b[21], b[22], b[23],
            b[24], b[25], b[26], // cone
        )
        c.push(...c3R)

        /* l */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [b[21], b[22], b[23]],
            [b[18], b[19], b[20]],
            [t[3], t[4], t[5]],
        ))
        c.push(...c6B)

        /* r */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [tN[12], tN[13], tN[14]],
            [b[24], b[25], b[26]],
            [b[21], b[22], b[23]],
        ))
        c.push(...c6B)

        /* t */
        v.push(...createFace(
            [b[18], b[19], b[20]],
            [b[24], b[25], b[26]],
            [tN[12], tN[13], tN[14]],
            [t[3], t[4], t[5]],
        ))
        c.push(...c6B)


    }



    for (let i = 0; i < n.top.length; ++i) {
        if (n.top[i + 1] ) {
            f(i, i + 1)
        } else {
            f(i, 0)
        }
    }


    return { v, c }
}