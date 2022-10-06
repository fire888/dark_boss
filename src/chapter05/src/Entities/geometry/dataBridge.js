import {
    createUv,
    createFace,
    fillColorFace,
    translateArr,
    rotateArr,
} from "./helpers";

const color2 = [1, 1, 0]
const colorB = [1, 1, 1]
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
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
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