import * as THREE from "three";

let material = null

export const createMeshFromBuffer = ({
    v,
    c = null,
    mat = null,
    u = null,
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


    if (!mat && !material) {
        material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true })
    }
    const materialToUse = mat || material

    return new THREE.Mesh(g, materialToUse)
}

