import { createDataArcWindow } from "./dataArcWindow";
import * as THREE from "three";
import * as math from 'mathjs'
import {
    createFace,
    rotateArrY,
} from '../geometry/helpers'

const h = 200

console.log(math.atan2(-2, 0))

export const createDataGeomTownSegment = data => {
    console.log(data)



    const v = []
    const c = []


    const { 
        node, nodeE, nodeN, nodeW, nodeS,
        isTopCapWall, isBottomCapWall, isLeftCapWall, isRightCapWall, w, x, z
    } = data






    /** ROADS ****/
    v.push(
        ...createFace(
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.topRight.x, node.center.y, node.topRight.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
        )
    )

    v.push(
        ...createFace(
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeN.right.x, nodeN.center.y, nodeN.right.z],
            [nodeN.left.x, nodeN.center.y, nodeN.left.z],
        )
    )

    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )

    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
        )
    )

    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [node.topRight.x, node.center.y, node.topRight.z],
        )
    )

    /** walls */
    /** north ***********/
    v.push(
        ...createFace(
            [nodeN.right.x, nodeN.center.y, nodeN.right.z],
            [node.topRight.x, node.center.y, node.topRight.z],
            [node.topRight.x, h, node.topRight.z],
            [nodeN.right.x, h, nodeN.right.z],
        )
    )
    v.push(
        ...createFace(
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeN.left.x, nodeN.center.y, nodeN.left.z],
            [nodeN.left.x, h, nodeN.left.z],
            [node.topLeft.x, h, node.topLeft.z],
        )
    )

    /** south *****/
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [nodeS.right.x, h, nodeS.right.z],
            [node.bottomRight.x, h, node.bottomRight.z],
        )
    )
    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [nodeS.left.x, h, nodeS.left.z],
        )
    )

    /** right ****/
    v.push(
        ...createFace(
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [nodeE.top.x, h, nodeE.top.z],
            [node.topRight.x, h, node.topRight.z],
        )
    )
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomRight.x, h, node.bottomRight.z],
            [nodeE.bottom.x, h, nodeE.bottom.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],

            //[node.bottomRight.x, 200, node.bottomRight.z],
        )
    )

    /** left ***/
    v.push(
        ...createFace(
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topLeft.x, h, node.topLeft.z],
            [nodeW.top.x, h, nodeW.top.z],
        )
    )
    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [nodeW.bottom.x, h, nodeW.bottom.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )

    /** Cap */
    if (isBottomCapWall) {
        v.push(
            ...createFace(
                [x - w / 2, 0, nodeS.left.z],
                [nodeS.left.x, 0, nodeS.left.z],
                [nodeS.left.x, h, nodeS.left.z],
                [x - w / 2, h, nodeS.left.z],
            )
        )
        v.push(
            ...createFace(
                [nodeS.right.x, 0, nodeS.right.z],
                [x + w / 2, 0, nodeS.right.z],
                [x + w / 2, h, nodeS.left.z],
                [nodeS.right.x, h, nodeS.right.z],
                
            )
        )
    }

    if (isTopCapWall) {
        v.push(
            ...createFace(
                [nodeN.left.x, 0, nodeN.left.z],
                [x - w / 2, 0, nodeN.left.z],
                [x - w / 2, h, nodeN.left.z],
                [nodeN.left.x, h, nodeN.left.z],

            )
        )
        v.push(
            ...createFace(
                [x + w / 2, 0, nodeN.right.z],
                [nodeN.right.x, 0, nodeN.right.z],
                [nodeN.right.x, h, nodeN.right.z],
                [x + w / 2, h, nodeN.left.z],   
            )
        )
    }

    if (isLeftCapWall) {
        v.push(
            ...createFace(
                [nodeW.bottom.x, 0, nodeW.bottom.z],
                [nodeW.bottom.x, 0, z + w / 2],
                [nodeW.bottom.x, h, z + w / 2],
                [nodeW.bottom.x, h, nodeW.bottom.z],

            )
        )
        v.push(
            ...createFace(
                [nodeW.bottom.x, 0, z - w / 2],
                [nodeW.bottom.x, 0, nodeW.top.z],
                [nodeW.bottom.x, h, nodeW.top.z],
                [nodeW.bottom.x, h, z - w / 2],   
            )
        )
    }

    if (isRightCapWall) {
        v.push(
            ...createFace(
                [nodeE.bottom.x, 0, z + w / 2],
                [nodeE.bottom.x, 0, nodeE.bottom.z],
                [nodeE.bottom.x, h, nodeE.bottom.z],
                [nodeE.bottom.x, h, z + w / 2],


            )
        )
        v.push(
            ...createFace(
                [nodeE.bottom.x, 0, nodeE.top.z],
                [nodeE.bottom.x, 0, z - w / 2],
                [nodeE.bottom.x, h, z - w / 2],  
                [nodeE.bottom.x, h, nodeE.top.z],
            )
        )
    }


    /** arc */
    {
        const xArc = (node.bottomRight.x + node.bottomLeft.x) / 2
        const zArc = (node.bottomRight.z + node.bottomLeft.z) / 2
        const dX = node.bottomRight.x - node.bottomLeft.x
        const dZ = node.bottomRight.z - node.bottomLeft.z
        const fullW = Math.sqrt(dX * dX + dZ * dZ)
        const angle = -math.atan2(dZ, dX)

        const thickness = 5 + Math.random() * 30

        const dataArc = createDataArcWindow({
            h: h - node.center.y + 50,
            innerH: (h - node.center.y + 50) - (fullW * .8),
            isWindow: false,
            w: fullW * 0.8,
            wc: fullW * 0.2,
            x: xArc,
            y: node.center.y - 50,
            z: zArc + thickness / 2,
            t: thickness,
            angle,
        })
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }




    return { v, c }
}