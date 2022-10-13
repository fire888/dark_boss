import * as THREE from 'three'
import { createDataUnit } from './geometry/dataUnit'


export const createMeshUnit = (root) => {

    const dataUnit = createDataUnit()

    const v = new Float32Array(dataUnit.v)
    const c =  new Float32Array(dataUnit.c)

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(v, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( c, 3 ))
    geometry.computeVertexNormals()


    const mat = root.materials.unit
    const mesh = new THREE.Mesh(geometry, mat)


    return { mesh }
}
