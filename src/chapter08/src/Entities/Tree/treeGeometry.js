import * as THREE from 'three'
import { createFace, rotateArrZ, rotateArrX, angleFromCoords } from '../../helpers/geomHelpers'

const { PI, cos, sin, random } = Math
const PI2 = PI * 2
const hPI = PI / 2

const createPoints = (root) => {
    const RN = 10
    const R = 70
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


    /** levels central trunk */
    const arrL = []
    const offset = new THREE.Vector3()
    const savedOffset = new THREE.Vector3()
    const rot = new THREE.Vector3()
    for (let i = 0; i < L; ++i) {
        arrL.push(createLevel(offset, rot, R * (L - i - 1) / L))

        savedOffset.copy(offset)
        offset.x += (random() - .5) * R
        offset.y += 40
        offset.z += (random() -.5) * R
        if (i > 0) {
            const d = offset.distanceTo(savedOffset)
            rot.x = (Math.acos((offset.z - savedOffset.z) / d) - PI / 2) / 3
            rot.z = (Math.acos((offset.x - savedOffset.x) / d) - PI / 2) / 3
        }
    }

    /** bottom roots */
    const ROOT_N = 5
    const ROOT_L_N = 3
    const createRoot = (w) => {
        const r = w / 2
        const arr = []

        for (let i = 0; i < ROOT_N; ++i) {
            for (let j = 0; j < ROOT_L_N; ++j) {
                const x = cos(i / ROOT_N * PI) * r
                const y = sin(i / ROOT_N * PI) * r
                const z = j * 15
                arr.push([x, y, z])
            }
        }
    }



    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const geom = new THREE.BoxGeometry(3, 1, 30)

    const b = arrL[0]
    const t = arrL[1]
    for (let i = 0; i < b.length; ++i) {
        const curr = b[i]
        let prev = b[i - 1]
        if (i === 0) {
            prev = b[b.length - 1]
        }

        const diffX = curr[0] - prev[0]
        const diffZ = curr[2] - prev[2]
        const x = prev[0] + (diffX / 2)
        const z = prev[2] + (diffZ / 2)
        const centralP = new THREE.Vector3(x, curr[1], z)
        const rot = angleFromCoords(diffZ, diffX)
        const m = new THREE.Mesh(geom, mat)
        m.position.copy(centralP)
        m.rotation.y = rot + hPI// / (b.length - 1)
        root.studio.addToScene(m)
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

export const createTreeGeometry = (root) => {
    const v = createPoints(root)
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
