import { createDataArcWindow } from "./dataArcWindow";
import * as THREE from "three";
import * as math from 'mathjs'
import {
    createFace,
    rotateArrY,
} from '../geometry/helpers'

import {
    COLOR1_1,
    COLOR1_6,
    COLOR2_1,
    COLOR2_6,
    COLOR3_1,
    COLOR3_6,
} from '../../constants/constants_materials'


const h = 200


export const createDataGeomTownSegment = data => {
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
    c.push(...COLOR1_6)



    if (nodeN.offsetToCenter) {
    } else {
        v.push(
            ...createFace(
                [node.topLeft.x, node.center.y, node.topLeft.z],
                [node.topRight.x, node.center.y, node.topRight.z],
                [nodeN.right.x, nodeN.center.y, nodeN.right.z],
                [nodeN.left.x, nodeN.center.y, nodeN.left.z],
            )
        )
        c.push(...COLOR1_6)

        /** north ***********/
        v.push(
            ...createFace(
                [nodeN.right.x, nodeN.center.y, nodeN.right.z],
                [node.topRight.x, node.center.y, node.topRight.z],
                [node.topRight.x, h, node.topRight.z],
                [nodeN.right.x, h, nodeN.right.z],
            )
        )
        c.push(...COLOR2_6)

        v.push(
            ...createFace(
                [node.topLeft.x, node.center.y, node.topLeft.z],
                [nodeN.left.x, nodeN.center.y, nodeN.left.z],
                [nodeN.left.x, h, nodeN.left.z],
                [node.topLeft.x, h, node.topLeft.z],
            )
        )
        c.push(...COLOR2_6)
    }


    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )
    c.push(...COLOR1_6)

    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
        )
    )
    c.push(...COLOR1_6)

    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [node.topRight.x, node.center.y, node.topRight.z],
        )
    )
    c.push(...COLOR1_6)

    /** walls */


    /** south *****/
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [nodeS.right.x, h, nodeS.right.z],
            [node.bottomRight.x, h, node.bottomRight.z],
        )
    )
    c.push(...COLOR2_6)
    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [nodeS.left.x, h, nodeS.left.z],
        )
    )
    c.push(...COLOR2_6)
    /** right ****/
    v.push(
        ...createFace(
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [nodeE.top.x, h, nodeE.top.z],
            [node.topRight.x, h, node.topRight.z],
        )
    )
    c.push(...COLOR2_6)
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomRight.x, h, node.bottomRight.z],
            [nodeE.bottom.x, h, nodeE.bottom.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],

            //[node.bottomRight.x, 200, node.bottomRight.z],
        )
    )
    c.push(...COLOR2_6)
    /** left ***/
    v.push(
        ...createFace(
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topLeft.x, h, node.topLeft.z],
            [nodeW.top.x, h, nodeW.top.z],
        )
    )
    c.push(...COLOR2_6)
    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [nodeW.bottom.x, h, nodeW.bottom.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )
    c.push(...COLOR2_6)
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
        c.push(...COLOR2_6)
        v.push(
            ...createFace(
                [nodeS.right.x, 0, nodeS.right.z],
                [x + w / 2, 0, nodeS.right.z],
                [x + w / 2, h, nodeS.left.z],
                [nodeS.right.x, h, nodeS.right.z],
                
            )
        )
        c.push(...COLOR2_6)


        /** arc s */
        {
            const xArc = (nodeS.right.x + nodeS.left.x) / 2
            const zArc = (nodeS.right.z + nodeS.left.z) / 2
            const dX = nodeS.right.x - nodeS.left.x
            const dZ = nodeS.right.z - nodeS.left.z
            const fullW = Math.sqrt(dX * dX + dZ * dZ)
            const angle = -math.atan2(dZ, dX)

            const thickness = 5 + Math.random() * 30

            const dataArc = createDataArcWindow({
                h: h - nodeS.center.y,
                innerH: (h - nodeS.center.y) - (fullW * .8),
                isWindow: false,
                w: fullW * 0.8,
                wc: fullW * 0.2,
                x: xArc,
                y: nodeS.center.y,
                z: zArc + thickness / 2 - 4,
                t: thickness,
                angle,
            })
            v.push(...dataArc.v)
            c.push(...dataArc.c)
        }

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
        c.push(...COLOR2_6)
        v.push(
            ...createFace(
                [x + w / 2, 0, nodeN.right.z],
                [nodeN.right.x, 0, nodeN.right.z],
                [nodeN.right.x, h, nodeN.right.z],
                [x + w / 2, h, nodeN.left.z],   
            )
        )
        c.push(...COLOR2_6)

        /** arc n */
        {
            const xArc = (nodeN.right.x + nodeN.left.x) / 2
            const zArc = (nodeN.right.z + nodeN.left.z) / 2
            const dX = nodeN.right.x - nodeN.left.x
            const dZ = nodeN.right.z - nodeN.left.z
            const fullW = Math.sqrt(dX * dX + dZ * dZ)
            const angle = -math.atan2(dZ, dX)

            const thickness = 5 + Math.random() * 30

            const dataArc = createDataArcWindow({
                h: h - nodeN.center.y,
                innerH: (h - nodeN.center.y) - (fullW * .8),
                isWindow: false,
                w: fullW * 0.8,
                wc: fullW * 0.2,
                x: xArc,
                y: nodeN.center.y,
                z: zArc + thickness / 2 - 4,
                t: thickness,
                angle,
            })
            v.push(...dataArc.v)
            c.push(...dataArc.c)
        }
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
        c.push(...COLOR2_6)
        v.push(
            ...createFace(
                [nodeW.bottom.x, 0, z - w / 2],
                [nodeW.bottom.x, 0, nodeW.top.z],
                [nodeW.bottom.x, h, nodeW.top.z],
                [nodeW.bottom.x, h, z - w / 2],   
            )
        )
        c.push(...COLOR2_6)

        /** arc l */
        {
            const xArc = (nodeW.top.x + nodeW.bottom.x) / 2
            const zArc = (nodeW.top.z + nodeW.bottom.z) / 2
            const dX = nodeW.top.x - nodeW.bottom.x
            const dZ = nodeW.top.z - nodeW.bottom.z
            const fullW = Math.sqrt(dX * dX + dZ * dZ)
            const angle = -math.atan2(dZ, dX)

            const thickness = 5 + Math.random() * 30

            const dataArc = createDataArcWindow({
                h: h - nodeW.center.y,
                innerH: (h - nodeW.center.y) - (fullW * .8),
                isWindow: false,
                w: fullW * 0.8,
                wc: fullW * 0.2,
                x: xArc + thickness / 2 - 4,
                y: nodeW.center.y,
                z: zArc,
                t: thickness,
                angle,
            })
            v.push(...dataArc.v)
            c.push(...dataArc.c)
        }
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
        c.push(...COLOR2_6)
        v.push(
            ...createFace(
                [nodeE.bottom.x, 0, nodeE.top.z],
                [nodeE.bottom.x, 0, z - w / 2],
                [nodeE.bottom.x, h, z - w / 2],  
                [nodeE.bottom.x, h, nodeE.top.z],
            )
        )
        c.push(...COLOR2_6)

        /** arc l */
        {
            const xArc = (nodeE.top.x + nodeE.bottom.x) / 2
            const zArc = (nodeE.top.z + nodeE.bottom.z) / 2
            const dX = nodeE.top.x - nodeE.bottom.x
            const dZ = nodeE.top.z - nodeE.bottom.z
            const fullW = Math.sqrt(dX * dX + dZ * dZ)
            const angle = -math.atan2(dZ, dX)

            const thickness = 5 + Math.random() * 30

            const dataArc = createDataArcWindow({
                h: h - nodeE.center.y,
                innerH: (h - nodeE.center.y) - (fullW * .8),
                isWindow: false,
                w: fullW * 0.8,
                wc: fullW * 0.2,
                x: xArc - thickness / 2 + 4,
                y: nodeE.center.y,
                z: zArc,
                t: thickness,
                angle,
            })
            v.push(...dataArc.v)
            c.push(...dataArc.c)
        }
    }


    /** arc s */
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
            z: zArc + thickness / 2 - 10,
            t: thickness,
            angle,
        })
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }

    /** arc n */
    {
        const xArc = (node.topRight.x + node.topLeft.x) / 2
        const zArc = (node.topRight.z + node.topLeft.z) / 2
        const dX = node.topRight.x - node.topLeft.x
        const dZ = node.topRight.z - node.topLeft.z
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
            z: zArc - thickness / 2 + 10,
            t: thickness,
            angle,
        })
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }

    /** arc r */
    {
        const xArc = (node.topRight.x + node.bottomRight.x) / 2
        const zArc = (node.topRight.z + node.bottomRight.z) / 2
        const dX = node.topRight.x - node.bottomRight.x
        const dZ = node.topRight.z - node.bottomRight.z
        const fullW = Math.sqrt(dX * dX + dZ * dZ)
        const angle = -math.atan2(dZ, dX)

        const thickness = 5 + Math.random() * 30

        const dataArc = createDataArcWindow({
            h: h - node.center.y + 50,
            innerH: (h - node.center.y + 50) - (fullW * .8),
            isWindow: false,
            w: fullW * 0.6,
            wc: fullW * 0.25,
            x: xArc + thickness / 2,
            y: node.center.y - 50,
            z: zArc,
            t: thickness,
            angle,
        })
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }

    /** arc l */
    {
        const xArc = (node.topLeft.x + node.bottomLeft.x) / 2
        const zArc = (node.topLeft.z + node.bottomLeft.z) / 2
        const dX = node.topLeft.x - node.bottomLeft.x
        const dZ = node.topLeft.z - node.bottomLeft.z
        const fullW = Math.sqrt(dX * dX + dZ * dZ)
        const angle = -math.atan2(dZ, dX)

        const thickness = 5 + Math.random() * 30

        const dataArc = createDataArcWindow({
            h: h - node.center.y + 50,
            innerH: (h - node.center.y + 50) - (fullW * .8),
            isWindow: false,
            w: fullW * 0.6,
            wc: fullW * 0.25,
            x: xArc - thickness / 2,
            y: node.center.y - 50,
            z: zArc,
            t: thickness,
            angle,
        })
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }    


    return { v, c }
}