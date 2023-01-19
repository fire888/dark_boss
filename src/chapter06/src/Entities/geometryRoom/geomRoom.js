import * as THREE from "three";
import { createTopPartWall } from './wallTopPart'
import { translateArr, rotateArrY } from '../geometry/helpers'
import { createMeshFromBuffer } from "../../helpers/createBufferMesh";

const y0 = -62
const y1 = 50

export const createRoom = (data, root) => {
    const v = []
    const c = []

    for (let key in data.walls) {
        if (key === 'n') {
            const {p0, p1, doors, wallSegments} = data.walls[key]
            if (wallSegments) {
                const l = p1[0] - p0[0]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'top',
                })
                translateArr(wData.v, p0[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)

                for (let i = 0; i < wallSegments.length; ++i) {
                    const {p0, p1} = wallSegments[i]
                    const l = p1[0] - p0[0]
                    const wData = createTopPartWall({
                        l,
                        asset: root.assets['walls'].children[0],
                        leftOffset: i === 0,
                        rightOffset: i === wallSegments.length - 1,
                        segment: 'bottom',
                    })

                    translateArr(wData.v, p0[0], y0, p0[1])
                    v.push(...wData.v)
                    c.push(...wData.c)
                }

            } else {
                const l = p1[0] - p0[0]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'full',
                })
                translateArr(wData.v, p0[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)
            }
        }

        if (key === 's') {
            const {p0, p1, doors, wallSegments} = data.walls[key]
            if (!wallSegments) {
                const l = p1[0] - p0[0]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'full',
                })
                rotateArrY(wData.v, -Math.PI)
                translateArr(wData.v, p1[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)
            } else {
                const l = p1[0] - p0[0]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'top',
                })
                rotateArrY(wData.v, -Math.PI)
                translateArr(wData.v, p1[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)
                for (let i = 0; i < wallSegments.length; ++i) {
                    const {p0, p1} = wallSegments[i]
                    const l = p0[0] - p1[0]
                    const wData = createTopPartWall({
                        l,
                        asset: root.assets['walls'].children[0],
                        leftOffset: i === 0,
                        rightOffset: i === wallSegments.length - 1,
                        segment: 'bottom',
                    })
                    rotateArrY(wData.v, -Math.PI)
                    translateArr(wData.v, p0[0], y0, p0[1])
                    v.push(...wData.v)
                    c.push(...wData.c)
                }
            }
        }

        if (key === 'w') {
            const {p0, p1, doors, wallSegments} = data.walls[key]
            if (!wallSegments) {
                const l = p1[1] - p0[1]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'full',
                })
                rotateArrY(wData.v, Math.PI / 2)
                translateArr(wData.v, p1[0], y0, p1[1])
                v.push(...wData.v)
                c.push(...wData.c)
            } else {
                const l = p1[1] - p0[1]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'top',
                })
                rotateArrY(wData.v, Math.PI / 2)
                translateArr(wData.v, p1[0], y0, p1[1])
                v.push(...wData.v)
                c.push(...wData.c)
                for (let i = 0; i < wallSegments.length; ++i) {
                    const {p0, p1} = wallSegments[i]
                    const l = p0[1] - p1[1]
                    const wData = createTopPartWall({
                        l,
                        asset: root.assets['walls'].children[0],
                        leftOffset: i === 0,
                        rightOffset: i === wallSegments.length - 1,
                        segment: 'bottom',
                    })
                    rotateArrY(wData.v, Math.PI / 2)
                    translateArr(wData.v, p0[0], y0, p0[1])
                    v.push(...wData.v)
                    c.push(...wData.c)
                }
            }
        }

        if (key === 'e') {
            const {p0, p1, wallSegments} = data.walls[key]
            if (!wallSegments) {
                const l = p1[1] - p0[1]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'full',
                })
                rotateArrY(wData.v, -Math.PI / 2)
                translateArr(wData.v, p0[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)
            } else {
                const l = p1[1] - p0[1]
                const wData = createTopPartWall({
                    l,
                    asset: root.assets['walls'].children[0],
                    leftOffset: true,
                    rightOffset: true,
                    segment: 'top',
                })
                rotateArrY(wData.v, -Math.PI / 2)
                translateArr(wData.v, p1[0], y0, p0[1])
                v.push(...wData.v)
                c.push(...wData.c)
                for (let i = 0; i < wallSegments.length; ++i) {
                    const {p0, p1} = wallSegments[i]
                    const l = p1[1] - p0[1]
                    const wData = createTopPartWall({
                        l,
                        asset: root.assets['walls'].children[0],
                        leftOffset: i === 0,
                        rightOffset: i === wallSegments.length - 1,
                        // leftOffset: true,
                        // rightOffset: true,
                        segment: 'bottom',
                    })
                    rotateArrY(wData.v, -Math.PI / 2)
                    translateArr(wData.v, p0[0], y0, p0[1])
                    v.push(...wData.v)
                    c.push(...wData.c)
                }
            }
        }
    }


    return { v, c }
}