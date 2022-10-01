import * as THREE from 'three'

import { createSegmentStair } from './geometry/segmentStair'
import { createSchemeStairs } from './geometry/schemeStairs'




export const createMeshStairs = (root) => {
    const geometry = new THREE.BufferGeometry();

    const scheme = createSchemeStairs()
    const vertP = []
    const colorsP = []
    const uvTopP = []
    for (let i = 0; i < scheme.length; ++i) {
        const { v, c, u } = createSegmentStair(scheme[i], [1, 1, 1], [0, .7, 0],)
        vertP.push(...v)
        colorsP.push(...c)
        uvTopP.push(...u)
    }


    const vertices = new Float32Array(vertP)
    const colors =  new Float32Array(colorsP)
    const uv = new Float32Array(uvTopP)

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()


    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)
    return mesh;
}
