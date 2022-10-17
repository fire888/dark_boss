import {
    createFace,
    createUv,
    fillColorFace,
    rotateArrY, translateArr,
} from './helpers'



const { PI, sin, cos } = Math
const PI2 = PI * 2

// const count = 5
// const hh = 15
// const h = 7
// const hD = -7
// const hhD = -15
// const r = 15
// const cone = 10
// const w = 2
// const wt = 3
// const wtr = 2
// const rInner = -5

const createG = ({
    count = 5,
    hh = 15,
    h = 7,
    hD = -7,
    hhD = -15,
    r = 15,
    cone = 10,
    w = 2,
    wt = 3,
    wtr = 5,
    rInner = -5,  
}) => {


    const data = {
        tt: [],
        top: [],
        bot: [],
        bb: [],
    }


    for (let i = 0; i < count; ++i) {
        const ph1 = i / count * PI2
/*

     9 10 11   6 7 8 
        *      *
    12 13 14   3 4 5             cone 15 16 17
        *      *                    *
          0 1 2
            *

         24 25 26
            * 
    18 19 20  21 22 23
       *         *

    27 28 29  33 34 35 
       *         *
         30 31 32
            *

*/
        const t = [
            // penta
            0, -w, 0, //0 1 2 
            w, 0, 0, //3 4 5
            w, w, 0, //6 7 8
            -w, w, 0, //9 10 11
            -w, 0, 0, //12 13 14 
            // cone
            0, 4, cone, //15 16 17
            // tr
            -wtr, -h * 1.7, rInner, //18 19 20 
            wtr, -h * 1.7, rInner, //21 22 23
            0, -h * .7, rInner, //24 25 26
            // bot tr
            -wtr, -h * 2, rInner * 1.5, //27 28 29
            0, -h * 2.3, rInner * 2, //30 31 32
            wtr, -h * 2, rInner * 1.5, //33 34 35
        ]
        rotateArrY(t, ph1)
        translateArr(t, sin(ph1) * r, h, cos(ph1) * r)
        data.top.push(t)


        const ph2 = (i + .5) / count * PI2
/*
          33 34 35
             *
      27 28 29  30 31 32
         *       * 

      18 19 20   24 25 26  
          *      *
           21 22 23
              *

            0 1 2
              *
        3 4 5   12 13 14       cone 15 16 17
          *       *                  *
        6 7 8  9 10 11
          *       *           
*/
        const b = [
            // penta
            0, w, 0, //0 1 2
            -w, 0, 0, //3 4 5
            -w, -w, 0, //6 7 8
            w, -w, 0, //9 10 11
            w, 0, 0, //12 13 14
            // cone
            0, -4, cone, // 15 16 17
            // tr
            -wtr, h * 1.7, rInner, //18 19 20
            0, h * .7, rInner, //21 22 23
            wtr, h * 1.7, rInner, //24 25 26 
            // top tr
            -wtr, h * 2, rInner * 1.5, //27 28 29
            wtr, h * 2, rInner * 1.5, //30 31 32
            0, h * 2.3, rInner * 2, //33 34 35
        ]
        rotateArrY(b, ph2)
        translateArr(b, sin(ph2) * r, hD, cos(ph2) * r)
        data.bot.push(b)


        const phP = ((i - .5) / count) * PI2
        data.tt.push(sin(phP) * wt, hh, cos(phP) * wt)
        data.bb.push(sin(ph1) * wt, hhD, cos(ph1) * wt)
    }


    return data
}







export const createDataUnit = (params) => {

    const hhh = params.hhh || 12

    const v = []
    const c = []
    const r = 5
    const r2 = 15


    const n = createG(params)

    const c1W = [0, .7, 0]
    const c3W = [...c1W, ...c1W, ...c1W]
    const c6W = [...c3W, ...c3W]

    const c1R = [1, 0, 0]
    const c3R = [...c1R, ...c1R, ...c1R]
    const c6R = [...c3R, ...c3R]

    const c1B = [0, 0, 0]
    const c3B = [...c1B, ...c1B, ...c1B]
    const c6B = [...c3B, ...c3B]

    const c1B2 = [0, 0, 0]
    const c3B2 = [...c1B2, ...c1B2, ...c1B2]
    const c6B2 = [...c3B2, ...c3B2]

    const c1B3 = [0, 0, 0]
    const c3B3 = [...c1B3, ...c1B3, ...c1B3]
    const c6B3 = [...c3B3, ...c3B3]


    
    
    const f = (i, j) => {
        const b = n.bot[i]
        const bN = n.bot[j]
        const t = n.top[i]
        const tN = n.top[j]

        /** hh cone */
        v.push(
            n.tt[i * 3], n.tt[i * 3 + 1], n.tt[i * 3 + 2],
            n.tt[j * 3], n.tt[j * 3 + 1], n.tt[j * 3 + 2], 
            0, n.tt[i * 3 + 1] + hhh, 0,
        )
        c.push(...c3W)
        /** bb cone */
        v.push(
            n.bb[j * 3], n.bb[j * 3 + 1], n.bb[j * 3 + 2], 
            n.bb[i * 3], n.bb[i * 3 + 1], n.bb[i * 3 + 2],
            0, n.bb[i * 3 + 1] - hhh, 0,
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
        /** to bot cone */
        v.push(...createFace(
            [n.bb[i * 3], n.bb[i * 3 + 1], n.bb[i * 3 + 2]],
            [n.bb[j * 3], n.bb[j * 3 + 1], n.bb[j * 3 + 2]],
            [b[9], b[10], b[11]],
            [b[6], b[7], b[8]],
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


        /** t -> b */
        v.push(...createFace(
            [b[3], b[4], b[5]],
            [b[0], b[1], b[2]],
            [t[3], t[4], t[5]],
            [t[0], t[1], t[2]],
        ))
        c.push(...c6W)
        /** b -> tN */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [b[12], b[13], b[14]],
            [tN[0], tN[1], tN[2]],
            [tN[12], tN[13], tN[14]],
        ))
        c.push(...c6W)


        /** cones */
        for (let k = 0; k < 15; k += 3) {    
            /** t cone */
            v.push(
                t[k], t[k + 1], t[k + 2],
                t[k + 3], t[k + 4], t[k + 5],
                t[15], t[16], t[17],
            )
            c.push(...c3W)

            /** b cone */
            v.push(
                b[k], b[k + 1], b[k + 2],
                b[k + 3], b[k + 4], b[k + 5],
                b[15], b[16], b[17],
            )
            c.push(...c3W)
        }
        /** last tr cone */
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
        /** inner tr 1 */
        v.push(
            t[18], t[19], t[20],
            t[21], t[22], t[23],
            t[24], t[25], t[26],
        )
        c.push(...c3W)
        /* tr cap r */
        v.push(...createFace(
            [t[21], t[22], t[23]],
            [b[3], b[4], b[5]],
            [t[0], t[1], t[2]],
            [t[24], t[25], t[26]],
        ))
        c.push(...c6B)
        /* tr cap l */
        v.push(...createFace(
            [b[12], b[13], b[14]],
            [tN[18], tN[19], tN[20]],
            [tN[24], tN[25], tN[26]],
            [tN[0], tN[1], tN[2]],
        ))
        c.push(...c6B2)
        /* tr cap b */
        v.push(...createFace(
            [b[12], b[13], b[14]],
            [bN[3], bN[4], bN[5]],
            [tN[21], tN[22], tN[23]],
            [tN[18], tN[19], tN[20]],
        ))
        c.push(...c6B3)

        ///////////////////////////////////
        /** b tr */
        v.push(
            t[27], t[28], t[29],
            t[30], t[31], t[32],
            t[33], t[34], t[35],
        )
        c.push(...c3W)
        /* b cap t */ 
        /* tr cap r */
        v.push(...createFace(
            [t[30], t[31], t[32]],
            [n.bb[i * 3], n.bb[i * 3 + 1], n.bb[i * 3 + 2]],
            [b[6], b[7], b[8]],
            [t[33], t[34], t[35]],
        ))
        c.push(...c6B)
        /* tr cap next l */
        v.push(...createFace(
            [n.bb[j * 3], n.bb[j * 3 + 1], n.bb[j * 3 + 2]],
            [tN[30], tN[31], tN[32]],
            [tN[27], tN[28], tN[29]],
            [b[9], b[10], b[11]],
        ))
        c.push(...c6B)
        /* tr cap next t */
        v.push(...createFace(
            [tN[27], tN[28], tN[29]],
            [tN[33], tN[34], tN[35]],
            [bN[6], bN[7], bN[8]],
            [b[9], b[10], b[11]],
        ))
        c.push(...c6B)
        



        /** inner tr 2 */
        v.push(
            b[18], b[19], b[20],
            b[21], b[22], b[23],
            b[24], b[25], b[26], // cone
        )
        c.push(...c3W)
        /* tr cap l */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [b[21], b[22], b[23]],
            [b[18], b[19], b[20]],
            [t[3], t[4], t[5]],
        ))
        c.push(...c6B2)
        /* tr cap r */
        v.push(...createFace(
            [b[0], b[1], b[2]],
            [tN[12], tN[13], tN[14]],
            [b[24], b[25], b[26]],
            [b[21], b[22], b[23]],
        ))
        c.push(...c6B)
        /* tr cap t */
        v.push(...createFace(
            [b[18], b[19], b[20]],
            [b[24], b[25], b[26]],
            [tN[12], tN[13], tN[14]],
            [t[3], t[4], t[5]],
        ))
        c.push(...c6B)

        /* tr top */
        v.push(
            b[27], b[28], b[29],
            b[30], b[31], b[32],
            b[33], b[34], b[35],
        )
        c.push(...c3W)

        /* cap t b */
        v.push(...createFace(
            [t[6], t[7], t[8]],
            [tN[9], tN[10], tN[11]],
            [b[30], b[31], b[32]],
            [b[27], b[28], b[29]],
        )) 
        c.push(...c6B)
        /* cap t r */
        v.push(...createFace(
            [b[30], b[31], b[32]],
            [tN[9], tN[10], tN[11]],
            [n.tt[j * 3], n.tt[j * 3 + 1], n.tt[j * 3 + 2]],
            [b[33], b[34], b[35]],
        )) 
        c.push(...c6B)
        /* cap t l */
        v.push(...createFace(
            [t[6], t[7], t[8]],
            [b[27], b[28], b[29]],
            [b[33], b[34], b[35]],
            [n.tt[j * 3], n.tt[j * 3 + 1], n.tt[j * 3 + 2]],
        )) 
        c.push(...c6B)
    }

/*
     b----
          33 34 35
             *
      27 28 29  30 31 32
         *       * 


    t---
     9 10 11   6 7 8 
        *      *
    12 13 14   3 4 5             
        *      *                   
          0 1 2
            *


          
*/



    for (let i = 0; i < n.top.length; ++i) {
        if (n.top[i + 1] ) {
            f(i, i + 1)
        } else {
            f(i, 0)
        }
    }


    return { v, c }
}