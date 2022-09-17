import * as THREE from 'three'
import { boxGeom } from "./geomBoxTest";
import { createGeomGallery } from './geomGallery'

const C1 = [.7, .7, .7]
const C2 = [0, 0, 1]







const createGeom = () => {
    const geometry = new THREE.BufferGeometry();

    const s = Math.random() * 4 + 3
    const t = Math.random() * (s - 1) + 1
    const h = Math.random() * 30 + t
    const data = [s, h, t, C1, C2]

    //const { vertices, colors } = boxGeom(...data)
    const { vertices, colors, uv } = createGeomGallery({})
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    uv && geometry.setAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
    console.log(geometry)
    geometry.computeVertexNormals()
    return geometry;
}


export const createBoxPentagram = (root) => {
    const mat = root.materials.wallVirtualColor
    const geometry = createGeom()
    const mesh = new THREE.Mesh(geometry, mat)
    return mesh;
}