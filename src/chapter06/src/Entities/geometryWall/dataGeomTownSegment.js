import { createDataArcWindow } from "./dataArcWindow";
import * as THREE from "three";
import { createFace } from '../geometry/helpers'

const h = 70

const c1 = [0, 1, 1]
const c1_6 = [...c1, ...c1, ...c1, ...c1, ...c1, ...c1]   
const c2 = [.5, 1, 0]
const c2_6 = [...c2, ...c2, ...c2, ...c2, ...c2, ...c2]  


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
    c.push(...c1_6)

    v.push(
        ...createFace(
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeN.right.x, nodeN.center.y, nodeN.right.z],
            [nodeN.left.x, nodeN.center.y, nodeN.left.z],
        )
    )
    c.push(...c1_6)


    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )
    c.push(...c1_6)

    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
        )
    )
    c.push(...c1_6)

    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [node.topRight.x, node.center.y, node.topRight.z],
        )
    )
    c.push(...c1_6)

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
    c.push(...c2_6)

    v.push(
        ...createFace(
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeN.left.x, nodeN.center.y, nodeN.left.z],
            [nodeN.left.x, h, nodeN.left.z],
            [node.topLeft.x, h, node.topLeft.z],
        )
    )
    c.push(...c2_6)

    /** south *****/
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [nodeS.right.x, h, nodeS.right.z],
            [node.bottomRight.x, h, node.bottomRight.z],
        )
    )
    c.push(...c2_6)
    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [nodeS.left.x, h, nodeS.left.z],
        )
    )
    c.push(...c2_6)
    /** right ****/
    v.push(
        ...createFace(
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [nodeE.top.x, h, nodeE.top.z],
            [node.topRight.x, h, node.topRight.z],
        )
    )
    c.push(...c2_6)
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomRight.x, h, node.bottomRight.z],
            [nodeE.bottom.x, h, nodeE.bottom.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],

            //[node.bottomRight.x, 200, node.bottomRight.z],
        )
    )
    c.push(...c2_6)
    /** left ***/
    v.push(
        ...createFace(
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topLeft.x, h, node.topLeft.z],
            [nodeW.top.x, h, nodeW.top.z],
        )
    )
    c.push(...c2_6)
    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [nodeW.bottom.x, h, nodeW.bottom.z],
            [node.bottomLeft.x, h, node.bottomLeft.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )
    c.push(...c2_6)
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
        c.push(...c2_6)
        v.push(
            ...createFace(
                [nodeS.right.x, 0, nodeS.right.z],
                [x + w / 2, 0, nodeS.right.z],
                [x + w / 2, h, nodeS.left.z],
                [nodeS.right.x, h, nodeS.right.z],
                
            )
        )
        c.push(...c2_6)
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
        c.push(...c2_6)
        v.push(
            ...createFace(
                [x + w / 2, 0, nodeN.right.z],
                [nodeN.right.x, 0, nodeN.right.z],
                [nodeN.right.x, h, nodeN.right.z],
                [x + w / 2, h, nodeN.left.z],   
            )
        )
        c.push(...c2_6)
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
        c.push(...c2_6)
        v.push(
            ...createFace(
                [nodeW.bottom.x, 0, z - w / 2],
                [nodeW.bottom.x, 0, nodeW.top.z],
                [nodeW.bottom.x, h, nodeW.top.z],
                [nodeW.bottom.x, h, z - w / 2],   
            )
        )
        c.push(...c2_6)
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
        c.push(...c2_6)
        v.push(
            ...createFace(
                [nodeE.bottom.x, 0, nodeE.top.z],
                [nodeE.bottom.x, 0, z - w / 2],
                [nodeE.bottom.x, h, z - w / 2],  
                [nodeE.bottom.x, h, nodeE.top.z],
            )
        )
        c.push(...c2_6)
    }

    





    // const dataArc = createDataArcWindow({
    //     h: 250,
    //     innerH: 103.19155704929601,
    //     isWindow: true,
    //     w: 65.58940133582206,
    //     wc: 2.5,
    //     x,
    //     z,
    // })
    //v.push(...dataArc.v)
    //c.push(...dataArc.c)



    return { v, c }
}