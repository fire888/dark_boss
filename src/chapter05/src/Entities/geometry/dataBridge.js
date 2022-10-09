import {
    createUv,
    createFace,
    fillColorFace,
    translateArr,
    rotateArr,
} from "./helpers";

import { createTopElem } from './dataTopElem'
import { createDataColumn } from "./dataColumn";


const color1 = [0, 0, 0]
const color2 = [0, .7, 0]
const R = {
    'N': 0,
    'E': -Math.PI * .5,
    'S': Math.PI,
    'W': Math.PI * .5
}


export const createDataBridge = ({
    centerBridgeX, 
    centerBridgeZ, 
    h, 
    dir, 
    lenBridge, 
    
    
    //xCenter,
    //zCenter,
    //r = 70,
    //h,
    //offset = 50,
    //color2 = [0, 1, 0],
    //colorB = [1, 0, 1],
}) => {



    const hh = h - 3

    const v = []
    const c = []
    const u = []
    const collision = []


    const lenSeg =  70
    const count = Math.floor(lenBridge / lenSeg)
    for (let i = 0; i < count; ++i) {
         const zSeg = (lenBridge / 2) - (i * lenSeg) - (lenSeg / 2)

        const columnL = createDataColumn({
            h0: -20,
            h1: h - 1,
            rCapital: 9,
            rBase: 5,
            capTop: true,
            capBottom: false,
        })
        translateArr(columnL.v, -20, 0, zSeg)
        for (let i = 0; i < columnL.v.length; ++i) v.push(columnL.v[i])
        for (let i = 0; i < columnL.c.length; ++i) c.push(columnL.c[i])
        for (let i = 0; i < columnL.u.length; ++i) u.push(columnL.u[i])

        const columnR = createDataColumn({
            h0: -20,
            h1: h - 1,
            rCapital: 9,
            rBase: 5,
            capTop: true,
            capBottom: false,
        })

        translateArr(columnR.v, 20, 0, zSeg)
        for (let i = 0; i < columnR.v.length; ++i) v.push(columnR.v[i])
        for (let i = 0; i < columnR.c.length; ++i) c.push(columnR.c[i])
        for (let i = 0; i < columnR.u.length; ++i) u.push(columnR.u[i])


        const topElemL =  createTopElem({
            isTopElem: true,
            color1,
            color2,
            h2: h - 1,
        })

        translateArr(topElemL.vertTopElem, -20, 0, zSeg)
        v.push(...topElemL.vertTopElem)
        c.push(...topElemL.colorsTopElem)
        u.push(...topElemL.uvTopElem)

        const topElemR = createTopElem({
            isTopElem: true,
            color1,
            color2,
            h2: h - 1,
        })



        translateArr(topElemR.vertTopElem, 20, 0, zSeg)
        v.push(...topElemR.vertTopElem)
        c.push(...topElemR.colorsTopElem)
        u.push(...topElemR.uvTopElem)
    }


    const r2 = lenBridge / 2

    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)

    const r = 20


    v.push(
        /** place */
        ...createFace(
            [-r, h, r2],
            [r, h, r2],
            [r, h, -r2],
            [-r, h, -r2],
        ),

        ...createFace(
            [-r, hh, r2],
            [r, hh, r2],
            [r, h, r2],
            [-r, h, r2],
        ),

        ...createFace(
            [-r, hh, -r2],
            [-r, hh, r2],
            [-r, h, r2],
            [-r, h, -r2],
        ),

        ...createFace(
            [r, hh, r2],
            [r, hh, -r2],
            [r, h, -r2],
            [r, h, r2],
        ),

        ...createFace(
            [r, hh, -r2],
            [-r, hh, -r2],
            [-r, h, -r2],
            [r, h, -r2],
        ),

        // bottom
        ...createFace(
            [r, hh, -r2],
            [r, hh, r2],
            [-r, hh, r2],
            [-r, hh, -r2],
        ),

        /** connect */

        // ...createFace(
        //     [-r, h, -r],
        //     [r, h, -r],
        //     [r, h - bridgeMinusH, -r - bridgeL],
        //     [-r, h - bridgeMinusH, -r - bridgeL],
        // ),

        // ...createFace(
        //     [-r, hh - bridgeMinusH, -r - bridgeL],
        //     [-r, hh, -r],
        //     [-r, h, -r],
        //     [-r, h - bridgeMinusH, -r - bridgeL],
        // ),


        // ...createFace(
        //     [r, hh, -r],
        //     [r, hh - bridgeMinusH, -r - bridgeL],
        //     [r, h - bridgeMinusH, -r - bridgeL],
        //     [r, h, -r],
        // ),

        // ...createFace(
        //     [-r, hh - bridgeMinusH, -r - bridgeL],
        //     [r, hh - bridgeMinusH, -r - bridgeL],
        //     [r, hh, -r],
        //     [-r, hh, -r],
        // ),
    )


    c.push(
        ...fillColorFace(color2),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        // ...fillColorFace(color2),
        // ...fillColorFace(colorB),
        // ...fillColorFace(colorB),
        // ...fillColorFace(color2),
    )

    u.push(
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvBr,
        // ...uvBr,
        // ...uvCl,
        // ...uvCl,
        // ...uvBr,
    )

    collision.push(
        ...createFace(
            [-r, h, r2],
            [r, h, r2],
            [r, h, -r2],
            [-r, h, -r2],
        ),
        // ...createFace(
        //     [-r, h, -r],
        //     [r, h, -r],
        //     [r, h - bridgeMinusH, -r - bridgeL],
        //     [-r, h - bridgeMinusH, -r - bridgeL],
        // ),
    )
    
    translateArr(v, -50, 0, 0)   
    rotateArr(v, R[dir])
    translateArr(v, centerBridgeX, 0, centerBridgeZ)
    
    translateArr(collision, -50, 0, 0)  
    rotateArr(collision, R[dir])
    translateArr(collision, centerBridgeX, 0, centerBridgeZ)



    return { v, c , u, collision }
}