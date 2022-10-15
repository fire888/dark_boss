import {
    createFace,
    createUv,
    fillColorFace,
    rotateArrY, translateArr,
    rotateArrZ,
} from './helpers'
import { zRotation } from '../../helpers/m4'


import * as THREE from 'three'

const { PI, sin, cos } = Math
const PI2 = PI * 2

const createG = () => {
    const count = 9
    const hhD = -15
    const hD = -7
    const h = 7
    const hh = 15
    const r = 15
    const w = 2

    const data = {
        tt: [[0, hh, 0]],
        bot: [],
        top: [],
        bb: [[0, hhD, 0]],
        inner: [],
    }



    for (let i = 0; i < count; ++i) {
        const sh = [
            0, -w, 0,
            w, 0, 0,
            w, w, 0,
            -w, w, 0,
            -w, 0, 0,

            0, 0, 3,
        ]


        const ph1 = i / count * PI2
        rotateArrY(sh, ph1)
        translateArr(sh, sin(ph1) * r, h, cos(ph1) * r)
        data.top.push(sh)



        const sh2 = [
            0, w, 0,
            -w, 0, 0,
            -w, -w, 0,
            w, -w, 0,
            w, 0, 0,

            0, 0, 3,
        ]

        const ph2 = (i + .5) / count * PI2
        rotateArrY(sh2, ph1)
        translateArr(sh2, sin(ph2) * r, hD, cos(ph2) * r)
        data.bot.push(sh2)
    }


    console.log(data)


    return data
}







export const createDataUnit = (root) => {

    const v = []
    const c = []
    const r = 5
    const r2 = 15




    const n = createG()
    //const arrow = root.system_Level._items.arrow
    //const v3 = new THREE.Vector3()
    // const addItem = (x, y, z) => {
    //     v3.x = x
    //     v3.y = y
    //     v3.z = z
    //     const s1 = new THREE.Mesh(arrow.geometry, root.materials.unit)
    //     s1.lookAt(v3)
    //     s1.position.copy(v3)
    //     root.studio.addToScene(s1)
    // }
    // for (let i = 0; i < n.top.length; ++i) {
    //     for (let j = 0; j < n.top[i].length; j += 3) {
    //         addItem(n.top[i][j], n.top[i][j + 1], n.top[i][j + 2])
    //     }
    // }
    //
    // for (let i = 0; i < n.bot.length; ++i) {
    //     for (let j = 0; j < n.bot[i].length; j += 3) {
    //         addItem(n.bot[i][j], n.bot[i][j + 1], n.bot[i][j + 2])
    //     }
    // }


    for (let i = 0; i < n.top.length; ++i) {
        if (n.top[i + 1] ) {
            const b = n.bot[i]
            const bN = n.bot[i + 1]
            const tP = n.top[i]
            const t = n.top[i + 1]
            v.push(...createFace(
                [b[0], b[1], b[2]],
                [b[12], b[13], b[14]],
                [t[0], t[1], t[2]],
                [t[12], t[13], t[14]],
            ))
            c.push(...fillColorFace([1, 0, 1]))

            v.push(...createFace(
                [tP[3], tP[4], tP[5]],
                [t[12], t[13], t[14]],
                [t[9], t[10], t[11]],
                [tP[6], tP[7], tP[8]],
            ))
            c.push(...fillColorFace([1, 0, 1]))


            v.push(...createFace(
                [b[9], b[10], b[11]],
                [bN[6], bN[7], bN[8]],
                [bN[3], bN[4], bN[5]],
                [b[12], b[13], b[14]],
            ))
            c.push(...fillColorFace([1, 0, 1]))
        }

        const b = n.bot[i]
        const t = n.top[i]
        v.push(...createFace(
            [b[3], b[4], b[5]],
            [b[0], b[1], b[2]],
            [t[3], t[4], t[5]],
            [t[0], t[1], t[2]],
        ))
        c.push(...fillColorFace([0, 0, 1]))


        for (let j = 0; j < n.bot[i].length - 3; j += 3) {
            if (!n.bot[i][j + 6]) {
                v.push(n.bot[i][12], n.bot[i][13], n.bot[i][14])
                v.push(n.bot[i][0], n.bot[i][1], n.bot[i][2])
                v.push(n.bot[i][15], n.bot[i][16], n.bot[i][17])

                v.push(n.top[i][12], n.top[i][13], n.top[i][14])
                v.push(n.top[i][0], n.top[i][1], n.top[i][2])
                v.push(n.top[i][15], n.top[i][16], n.top[i][17])

            } else {
                v.push(n.bot[i][j], n.bot[i][j + 1], n.bot[i][j + 2])
                v.push(n.bot[i][j + 3], n.bot[i][j + 4], n.bot[i][j + 5])
                v.push(n.bot[i][15], n.bot[i][16], n.bot[i][17])

                v.push(n.top[i][j], n.top[i][j + 1], n.top[i][j + 2])
                v.push(n.top[i][j + 3], n.top[i][j + 4], n.top[i][j + 5])
                v.push(n.top[i][15], n.top[i][16], n.top[i][17])


            }
        }




        // if (n.top[i + 1]) {
        //     const t1 = n.top[i + 1]
        //     v.push(...createFace(
        //         [b[6], b[7], b[8]],
        //         [b[3], b[4], b[5]],
        //         [t1[0], t1[1], t1[2]],
        //         [t1[9], t1[10], t1[11]],
        //     ))
        // }


        c.push(...fillColorFace([0, 0, 1]))
    }





















    // for (let i = 0; i < 16; ++i) {
    //     const ph = i / 10 * (Math.PI * 2)
    //     const phN = i !== 10 - 1
    //         ? (i + 1) / 10 * (Math.PI * 2)
    //         : (0 / 10) * (Math.PI * 2)
    //
    //     const sP = Math.sin(ph) * r
    //     const cP = Math.cos(ph) * r
    //
    //     const sN = Math.sin(phN) * r
    //     const cN = Math.cos(phN) * r
    //
    //     v.push(
    //         sP, 0, cP,
    //         sN, 0, cN,
    //         0, 20, 0
    //     )
    //
    //     c.push(
    //         1, 0, 0, 1, 0, 0, 1, 0, 0,
    //         // 1, 0, 0, 1, 0, 0, 1, 0, 0,
    //         // 1, 0, 0, 1, 0, 0, 1, 0, 0,
    //     )
    //
    //
    //     if (i % 4 === 0) {
    //         v.push(
    //             ...createFace(
    //                 [Math.sin(ph) * r2, -2, Math.cos(ph) * r2],
    //                 [Math.sin(phN) * r2, -2, Math.cos(phN) * r2],
    //                 [cN, -2, cN],
    //                 [sP, -2, cP],
    //             )
    //         )
    //         c.push(...fillColorFace([0, 0, 1]))
    //     }
    //
    // }




    return { v, c }
}