import { createDataArcWindow } from "./dataArcWindow";
import * as THREE from "three";
import { createFace } from '../geometry/helpers'


export const createDataGeomTownSegment = data => {
    //console.log(data)



    const v = []
    const c = []


    const { node, nodeE, nodeN, nodeW, nodeS } = data



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
            [node.topRight.x, 200, node.topRight.z],
            [nodeN.right.x, 200, nodeN.right.z],
        )
    )
    v.push(
        ...createFace(
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [nodeN.left.x, nodeN.center.y, nodeN.left.z],
            [nodeN.left.x, 200, nodeN.left.z],
            [node.topLeft.x, 200, node.topLeft.z],
        )
    )

    /** south *****/
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [nodeS.right.x, nodeS.center.y, nodeS.right.z],
            [nodeS.right.x, 200, nodeS.right.z],
            [node.bottomRight.x, 200, node.bottomRight.z],
        )
    )
    v.push(
        ...createFace(
            [nodeS.left.x, nodeS.center.y, nodeS.left.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
            [node.bottomLeft.x, 200, node.bottomLeft.z],
            [nodeS.left.x, 200, nodeS.left.z],
        )
    )
    // v.push(
    //     ...createFace(
    //         [node.topLeft.x, node.center.y, node.topLeft.z],
    //         [nodeN.left.x, nodeN.center.y, nodeN.left.z],
    //         [nodeN.left.x, 200, nodeN.left.z],
    //         [node.topLeft.x, 200, node.topLeft.z],
    //     )
    // )

    /** right ****/
    v.push(
        ...createFace(
            [node.topRight.x, node.center.y, node.topRight.z],
            [nodeE.top.x, nodeE.center.y, nodeE.top.z],
            [nodeE.top.x, 200, nodeE.top.z],
            [node.topRight.x, 200, node.topRight.z],
        )
    )
    v.push(
        ...createFace(
            [node.bottomRight.x, node.center.y, node.bottomRight.z],
            [node.bottomRight.x, 200, node.bottomRight.z],
            [nodeE.bottom.x, 200, nodeE.bottom.z],
            [nodeE.bottom.x, nodeE.center.y, nodeE.bottom.z],

            //[node.bottomRight.x, 200, node.bottomRight.z],
        )
    )

    /** left ***/
    v.push(
        ...createFace(
            [nodeW.top.x, nodeW.center.y, nodeW.top.z],
            [node.topLeft.x, node.center.y, node.topLeft.z],
            [node.topLeft.x, 200, node.topLeft.z],
            [nodeW.top.x, 200, nodeW.top.z],
        )
    )
    v.push(
        ...createFace(
            [nodeW.bottom.x, nodeW.center.y, nodeW.bottom.z],
            [nodeW.bottom.x, 200, nodeW.bottom.z],
            [node.bottomLeft.x, 200, node.bottomLeft.z],
            [node.bottomLeft.x, node.center.y, node.bottomLeft.z],
        )
    )




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