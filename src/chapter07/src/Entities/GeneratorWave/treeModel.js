import * as THREE from "three";


const S = 41

const createDataG = (arr, i, j) => {
    const v = []
    const c = []
    for (let ii = 0; ii < arr.length; ++ii) {
        for (let jj = 0; jj < arr[ii].length; ++jj) {
            v.push(
                j * S + jj * 10, arr[ii][jj] * 5, i * S + ii * 10,
                j * S + jj * 10 + 10, arr[ii][jj] * 5, i * S + ii * 10,
                j * S + jj * 10 + 10, arr[ii][jj] * 5, i * S + ii * 10 + 10,

                j * S + jj * 10, arr[ii][jj] * 5, i * S + ii * 10,
                j * S + jj * 10 + 10, arr[ii][jj] * 5, i * S + 10 + ii * 10,
                j * S + jj * 10, arr[ii][jj] * 5, i * S + 10 + ii * 10,
            )

            const n = arr[ii][jj] / 2 * 0.3 + .4

            c.push(
                n, n, 0,
                n, n, 0,
                n, n, 0,
                n, n, 0,
                n, n, 0,
                n, n, 0,
            )
        }
    }

    return { v, c }
}




export const createMeshByMap = (map) => {
    console.log(map)
    const v = []
    const c = []

    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            if (!map[i][j].tile) {
                continue;
            }
            const d = createDataG(map[i][j].tile, i, j)
            v.push(...d.v)
            c.push(...d.c)
        }
    }


    const vertices = new Float32Array(v)
    const g = new THREE.BufferGeometry()

    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.computeVertexNormals()

    const colors = new Float32Array(c)
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))


    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
        vertexColors: true
    }))
    mesh.position.set(0, -20, -200)
    return mesh
}
