import * as THREE from "three";


const S = 40
const sS = 10
const H = 80

const createDataG = (arr, i, j) => {
    const v = []
    const c = []
    for (let ii = 0; ii < arr.length; ++ii) {
        for (let jj = 0; jj < arr[ii].length; ++jj) {
            v.push(
                j * S + jj * sS, arr[ii][jj] * H, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS + sS,

                j * S + jj * sS, arr[ii][jj] * H, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H, i * S + sS + ii * sS,
                j * S + jj * sS, arr[ii][jj] * H, i * S + sS + ii * sS,
            )

            const n = ((arr[ii][jj] - 1) / 2 * 0.3 + .3) * .7
            const col = [n * 0.5, 0, n * 1.5,]

            c.push(
                ...col,
                ...col,
                ...col,
                ...col,
                ...col,
                ...col,

            )

            if (arr[ii + 1]) {
                // const n2 = (arr[ii + 1][jj] - 1) / 2 * 0.3 + .4
                // const col = Math.max(n, n2)

                v.push(
                    j * S + jj * sS, arr[ii + 1][jj] * H, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii + 1][jj] * H, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS + sS,

                    j * S + jj * sS, arr[ii + 1][jj] * H, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS + sS,
                    j * S + jj * sS, arr[ii][jj] * H, i * S + ii * sS + sS,
                )

                const n = ((arr[ii][jj] - 1) / 2 * 0.3 + .3) * .7
                const n2 = ((arr[ii + 1][jj] - 1) / 2 * 0.3 + .4) * .7
                const col1 = Math.max(n, n2)
                const col = [col1 * 1.5, 0, col1 * .5,]

                c.push(
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                )
            }

            if (arr[ii][jj + 1]) {
                v.push(
                    j * S + jj * sS + sS, arr[ii][jj + 1] * H, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj + 1] * H, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS,

                    j * S + jj * sS + sS, arr[ii][jj + 1] * H, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H, i * S + ii * sS + sS,
                )

                const n = ((arr[ii][jj] - 1) / 2 * 0.3 + .3) * .7
                const n2 = ((arr[ii][jj + 1] - 1) / 2 * 0.3 + .4) * .7
                const col1 = Math.max(n, n2)
                const col = [col1 * .3, col1 * 1.5, col1 * .5,]

                c.push(
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                )
            }


        }
    }

    return { v, c }
}




export const createMeshByMap = (map) => {
    //console.log(map)
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


    const mesh = new THREE.Mesh(g, new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
        vertexColors: true
    }))
    mesh.position.set(0, -20, -200)
    return mesh
}
