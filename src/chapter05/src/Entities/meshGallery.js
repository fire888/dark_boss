import * as THREE from 'three'
import {
    translateArr,
    rotateArr,
} from './geometry/helpers'
import { createScheme } from './geometry/schemeGallery'
import { createSegmentGallery } from './geometry/segmentGallery'



export const createMeshGallery = (root) => {
    const geometry = new THREE.BufferGeometry();


    const arrV = []
    const arrC = []
    const arrUV = []

    const scheme = createScheme()

    for (let i = 0; i < scheme.length; ++i) {
        const { id, x, z, angle, h0, h1, h2, arc, isTopElem, isColumn } = scheme[i]

        let { v, c, u } = createSegmentGallery({ h0, h1, h2, arc, isTopElem, isColumn })

        rotateArr(v, angle)
        translateArr(v, x, 0, z, angle)


        arrV.push(...v)
        arrC.push(...c)
        arrUV.push(...u)
    }


    const vertices = new Float32Array(arrV)
    const colors =  new Float32Array(arrC)
    const uv = new Float32Array(arrUV)

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()

    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)
    return mesh;
}