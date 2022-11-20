import * as math from 'mathjs'



export const createSchemeTown = () => {
    const w = 350
    const numsX = 5
    const numsZ = 5
    const wRoadH = 40
    const maxH = 100


    /** centers with node */
    const arr = []
    for (let i = 0; i < numsX; ++i) {
        for (let j = 0; j < numsZ; ++j) {
            const x = i * w + w / 2 - (w * numsX * .5)
            const z = j * w + w / 2 - (numsZ * w)

            const center = {
                x: x + Math.random() * w * 0.2 * Math.sign(Math.random() -.5),
                z: z + Math.random() * w * 0.2 * Math.sign(Math.random() -.5),
                y: Math.random() * maxH,
            }

            const left = { x: center.x - wRoadH, z: center.z }
            const right = { x: center.x + wRoadH, z: center.z }
            const top = { x: center.x, z: center.z - wRoadH }
            const bottom = { x: center.x, z: center.z + wRoadH }

            const node = { center, left, right, top, bottom }

            arr.push({
                x, z, w, i, j, node, id: '' + i + '_' + j
            })
        }
    }


    /** connectors */
    for (let i = 0; i < arr.length; ++i) {
        const { x, z, id } = arr[i]

        const northCenter = {
            x: x + Math.random() * w * 0.3 * Math.sign(Math.random() -.5),
            z: z - (w / 2),
            y: Math.random() * maxH,
        }
        const nodeN = {
            center: { ...northCenter },
            left: {
                x: northCenter.x - wRoadH,
                z: northCenter.z,
            },
            right: {
                x: northCenter.x + wRoadH,
                z: northCenter.z,
            },
        }


        const westCenter = {
            x: x - (w / 2),
            z: z + Math.random() * w * 0.2 * Math.sign(Math.random() -.5),
            y: Math.random() * maxH,
        }
        const nodeW = {
            center: { ...westCenter },
            top: {
                x: westCenter.x,
                z: westCenter.z - wRoadH,
            },
            bottom: {
                x: westCenter.x,
                z: westCenter.z + wRoadH,
            },
        }
        arr[i].nodeN = nodeN
        arr[i].nodeW = nodeW

        for (let j = 0; j < arr.length; ++j) {
            if (arr[i].i === arr[j].i) {
                if (arr[i].j === arr[j].j + 1) {
                    arr[j].nodeS = { ...nodeN }
                } else {
                    const southCenter = {
                        x: x + Math.random() * w * 0.3 * Math.sign(Math.random() -.5),
                        z: z + (w / 2),
                        y: 0,
                    }
                    arr[i].nodeS = {
                        center: { ...southCenter },
                        left: {
                            x: southCenter.x - wRoadH,
                            z: southCenter.z,
                        },
                        right: {
                            x: southCenter.x + wRoadH,
                            z: southCenter.z,
                        },
                    }
                }
            }


            if (arr[i].j === arr[j].j) {
                if (arr[i].i === arr[j].i + 1) {
                    arr[j].nodeE = { ...nodeW }
                }
                else {
                     const eastCenter = {
                         x: x + (w / 2),
                         z: z + Math.random() * w * 0.2 * Math.sign(Math.random() -.5),
                         y: 0,
                     }
                     arr[i].nodeE = {
                         center: { ...eastCenter },
                         top: {
                             x: eastCenter.x,
                             z: eastCenter.z - wRoadH,
                         },
                         bottom: {
                             x: eastCenter.x,
                             z: eastCenter.z + wRoadH,
                         },
                     }
                }
            }
        }
    }

    //console.log(math.intersect([0, 0], [10, 10], [10, 0], [0, 10]) )

    for (let i = 0; i < arr.length; ++i) {
        const { node, nodeN, nodeE, nodeS, nodeW } = arr[i]
        const topLeft = math.intersect(
            [nodeN.left.x, nodeN.left.z],
            [node.left.x, node.left.z],
                [nodeW.top.x, nodeW.top.z],
                [node.top.x, node.top.z],
        )
        arr[i].node.topLeft = { x: topLeft[0], z: topLeft[1] }
        const topRight = math.intersect(
            [nodeN.right.x, nodeN.right.z],
            [node.right.x, node.right.z],
            [nodeE.top.x, nodeE.top.z],
            [node.top.x, node.top.z],
        )
        arr[i].node.topRight = { x: topRight[0], z: topRight[1] }
        const bottomLeft = math.intersect(
            [nodeS.left.x, nodeS.left.z],
            [node.left.x, node.left.z],
            [nodeW.bottom.x, nodeW.bottom.z],
            [node.bottom.x, node.bottom.z],
        )
        arr[i].node.bottomLeft = { x: bottomLeft[0], z: bottomLeft[1] }
        const bottomRight = math.intersect(
            [nodeS.right.x, nodeS.right.z],
            [node.right.x, node.right.z],
            [nodeE.bottom.x, nodeE.bottom.z],
            [node.bottom.x, node.bottom.z],
        )
        arr[i].node.bottomRight = { x: bottomRight[0], z: bottomRight[1] }
    }
    console.log(arr)

    return arr;
}