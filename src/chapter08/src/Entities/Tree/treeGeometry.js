import * as THREE from 'three'
import { createFace, rotateArrZ, rotateArrX, rotateArrY } from '../../helpers/geomHelpers'

const { PI, cos, sin, random } = Math
const PI2 = PI * 2

const createPoints = () => {
    const RN = 5
    const R = 100
    const L = 10


    const createLevel = (offset, rot, r) => {
        const arrP = []

        for (let i = 0; i < RN; ++i) {
            const x = sin(i / RN * PI2) * r
            const z = cos(i / RN * PI2) * r
            const coord = [x, 0, z]
            rotateArrX(coord, rot.x)
            rotateArrZ(coord, rot.z)
            coord[0] += offset.x
            coord[1] += offset.y
            coord[2] += offset.z
            arrP.push(coord)
        }
        return arrP
    }

    const arrL = []
    const offset = new THREE.Vector3()
    let savedOffset = new THREE.Vector3()
    let savedDist = null
    const rot = new THREE.Vector3()
    for (let i = 0; i < L; ++i) {
        arrL.push(createLevel(offset, rot, R * (L - i - 1) / L))

        savedOffset.copy(offset)

        offset.x += (random() - .5) * R
        offset.y += 40
        offset.z += (random() -.5) * R

        const d = offset.distanceTo(savedOffset)

        //console.log(Math.acos((offset.x - savedOffset.x) / d ) - PI / 2)
        //rot.x = -Math.acos((offset.x - savedOffset.x) / d ) - PI / 2
    }

    const arr = []
    for (let i = 1; i < arrL.length; ++i) {
        const bot = arrL[i - 1]
        const curr = arrL[i]

        for (let j = 1; j < bot.length; ++j) {
            arr.push(...createFace(bot[j - 1], bot[j], curr[j], curr[j - 1]))
            if (j === bot.length - 1) {
                arr.push(...createFace(bot[j], bot[0], curr[0], curr[j]))
            }
        }
    }

    return arr
}

export const createTreeGeometry = () => {
    const v = createPoints()
    const vF32 = new Float32Array(v)

    const uv = []
    for (let i = 0; i < v.length; i += 6) {
        uv.push(
            0, 0,
            0, 1,
            1, 1,

            0, 0,
            1, 1,
            0, 1
        )
    }
    const uvF32 = new Float32Array(uv)

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    g.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))
    g.computeVertexNormals()

    return g
}
