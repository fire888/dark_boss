import * as THREE from 'three'
import { createFace, rotateArrY, angleFromCoords, translateArr} from '../geometry/helpers'

let pos = null
const white1 = [1, 1, 1]
const white6 = [
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
]

let leftPr = null
let rightPr = null

export const createOuterWall = (dataWall, line) => {
    if (!pos) {
        pos = line.geometry.attributes.position.array
        leftPr = [...pos]
        rotateArrY(leftPr, -Math.PI / 4)
        rightPr = [...pos]
        rotateArrY(rightPr, Math.PI / 4)
    }

    const v = []
    const c = []

    const lX = dataWall.p1[0] - dataWall.p0[0]
    const lZ = dataWall.p0[1] - dataWall.p1[1]

    const l = Math.sqrt(lX * lX + lZ * lZ)
    for (let i = 3; i < pos.length; i += 3) {
        v.push(
            ...createFace(
            [leftPr[i - 3], leftPr[i - 2], leftPr[i - 1]],
            [rightPr[i - 3] + l, rightPr[i - 2], rightPr[i - 1]],
            [rightPr[i] + l, rightPr[i + 1], rightPr[i + 2]],
            [leftPr[i], leftPr[i + 1], leftPr[i + 2]],
            )
        )
        c.push(...white6)
    }

    const angle = angleFromCoords(lX, lZ)
    rotateArrY(v, angle)
    translateArr(v, dataWall.p0[0], -62, dataWall.p0[1])

    return { v, c }


    // return new THREE.Mesh(
    //     new THREE.BoxGeometry(5, 5, 5),
    //     new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // )
}


