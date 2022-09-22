import * as THREE from 'three'
import { create } from './geomStairs/dataStairs'


const createGeom = () => {
    const geometry = new THREE.BufferGeometry();

    const { vertices, colors, uv } = create({})
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()
    return geometry;
}


export const createMeshStairs = (root) => {
    const mat = root.materials.wallVirtualColor
    const geometry = createGeom()
    const mesh = new THREE.Mesh(geometry, mat)
    return mesh;
}
