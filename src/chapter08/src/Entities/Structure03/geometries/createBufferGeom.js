import * as THREE from "three";

export const createGeomFromBuffer = ({
                                         v,
                                         c = null,
                                         u = null,
                                         col = null,
                                     }) => {
    const g = new THREE.BufferGeometry()

    const vertices = new Float32Array(v)
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    if (c) {
        const colors = new Float32Array(c)
        g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    if (u) {
        const uv = new Float32Array(u)
        g.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    }

    g.computeVertexNormals()

    return g
}
