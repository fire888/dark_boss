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
}) => {



    const hh = h - 3
    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)



    const r = 20



    const v = []
    const c = []
    const u = []
    const collision = []
    const collisionCar = []



    let savedSeg = 0
    let currentSeg = Math.random() * 120 + 30
    let zSegS = (lenBridge / 2)
    let zSegE = (lenBridge / 2)



    while (currentSeg < lenBridge - 20) {
        zSegS = (lenBridge / 2) - savedSeg
        zSegE = (lenBridge / 2) - currentSeg

        const columnL = createDataColumn({
            h0: -20,
            h1: h - 1,
            rCapital: 9,
            rBase: 5,
            capTop: true,
            capBottom: false,
        })
        translateArr(columnL.v, -20, 0, zSegE)
        for (let i = 0; i < columnL.v.length; ++i) v.push(columnL.v[i])
        for (let i = 0; i < columnL.c.length; ++i) c.push(columnL.c[i])
        for (let i = 0; i < columnL.u.length; ++i) u.push(columnL.u[i])
        translateArr(columnL.collision, -20, 0, zSegE)
        for (let i = 0; i < columnL.collision.length; ++i) collision.push(columnL.collision[i])
        translateArr(columnL.collisionCar, -20, 0, zSegE)
        for (let i = 0; i < columnL.collisionCar.length; ++i) collisionCar.push(columnL.collisionCar[i])

        const columnR = createDataColumn({
            h0: -20,
            h1: h - 1,
            rCapital: 9,
            rBase: 5,
            capTop: true,
            capBottom: false,
        })

        translateArr(columnR.v, 20, 0, zSegE)
        for (let i = 0; i < columnR.v.length; ++i) v.push(columnR.v[i])
        for (let i = 0; i < columnR.c.length; ++i) c.push(columnR.c[i])
        for (let i = 0; i < columnR.u.length; ++i) u.push(columnR.u[i])
        translateArr(columnR.collision, 20, 0, zSegE)
        for (let i = 0; i < columnR.collision.length; ++i) collision.push(columnR.collision[i])
        translateArr(columnR.collisionCar, 20, 0, zSegE)
        for (let i = 0; i < columnR.collisionCar.length; ++i) collisionCar.push(columnR.collisionCar[i])


        const topElemL =  createTopElem({
            isTopElem: true,
            color1,
            color2,
            h2: h - 1,
        })

        translateArr(topElemL.vertTopElem, -20, 0, zSegE)
        v.push(...topElemL.vertTopElem)
        c.push(...topElemL.colorsTopElem)
        u.push(...topElemL.uvTopElem)

        const topElemR = createTopElem({
            isTopElem: true,
            color1,
            color2,
            h2: h - 1,
        })

        translateArr(topElemR.vertTopElem, 20, 0, zSegE)
        v.push(...topElemR.vertTopElem)
        c.push(...topElemR.colorsTopElem)
        u.push(...topElemR.uvTopElem)

        savedSeg = currentSeg
        currentSeg += Math.random() * 120 + 30

        v.push(
            /** place */
            ...createFace(
                [-r, h, zSegS],
                [r, h, zSegS],
                [r, h, zSegE],
                [-r, h, zSegE],
            ),

            ...createFace(
                [-r, hh, zSegE],
                [-r, hh, zSegS],
                [-r, h, zSegS],
                [-r, h, zSegE],
            ),

            ...createFace(
                [r, hh, zSegS],
                [r, hh, zSegE],
                [r, h, zSegE],
                [r, h, zSegS],
            ),

            // bottom
            ...createFace(
                [r, hh, zSegE],
                [r, hh, zSegS],
                [-r, hh, zSegS],
                [-r, hh, zSegE],
            ),
        )


        c.push(
            ...fillColorFace(color2),
            ...fillColorFace(color1),
            ...fillColorFace(color1),
            ...fillColorFace(color2),
        )

        u.push(
            ...uvBr,
            ...uvCl,
            ...uvCl,
            ...uvBr,
        )

        collision.push(
            ...createFace(
                [-r, h, zSegS],
                [r, h, zSegS],
                [r, h, zSegE],
                [-r, h, zSegE],
            ),
        )
    }


    v.push(
        /** place */
        ...createFace(
            [-r, h, zSegE],
            [r, h, zSegE],
            [r, h, -lenBridge / 2],
            [-r, h, -lenBridge / 2],
        ),

        ...createFace(
            [-r, hh, -lenBridge / 2],
            [-r, hh, zSegE],
            [-r, h, zSegE],
            [-r, h, -lenBridge / 2],
        ),

        ...createFace(
            [r, hh, zSegE],
            [r, hh, -lenBridge / 2],
            [r, h, -lenBridge / 2],
            [r, h, zSegE],
        ),

        // bottom
        ...createFace(
            [r, hh, -lenBridge / 2],
            [r, hh, zSegE],
            [-r, hh, zSegE],
            [-r, hh, -lenBridge / 2],
        ),
    )


    c.push(
        ...fillColorFace(color2),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color2),
    )

    u.push(
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvBr,
    )

    collision.push(
        ...createFace(
            [-r, h, zSegE],
            [r, h, zSegE],
            [r, h, -lenBridge / 2],
            [-r, h, -lenBridge / 2],
        ),
    )


    translateArr(v, -50, 0, 0)   
    rotateArr(v, R[dir])
    translateArr(v, centerBridgeX, 0, centerBridgeZ)
    
    translateArr(collision, -50, 0, 0)  
    rotateArr(collision, R[dir])
    translateArr(collision, centerBridgeX, 0, centerBridgeZ)

    translateArr(collisionCar, -50, 0, 0)
    rotateArr(collisionCar, R[dir])
    translateArr(collisionCar, centerBridgeX, 0, centerBridgeZ)


    return { v, c , u, collision, collisionCar }
}