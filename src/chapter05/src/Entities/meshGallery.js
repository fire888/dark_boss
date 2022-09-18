import * as THREE from 'three'
import { createGeomGallery } from './geomGallery/geomGallery'


const createGeom = () => {
    const geometry = new THREE.BufferGeometry();

    const { vertices, colors, uv } = createGeomGallery({})
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()
    return geometry;
}


export const createMeshGallery = (root) => {
    const mat = root.materials.wallVirtualColor
    const geometry = createGeom()
    const mesh = new THREE.Mesh(geometry, mat)
    return mesh;
}