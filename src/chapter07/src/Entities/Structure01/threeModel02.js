import * as THREE from "three";


const S = 41
const sS = 10
const H = 50
const H0 = 105

const colors = [
    [.2, 0, .8],
    [.2, 1, .4],
    [.2, .7, 1],
]

const createDataG = (arr, i, j) => {
    const v = []
    const c = []
    for (let ii = 0; ii < arr.length; ++ii) {
        for (let jj = 0; jj < arr[ii].length; ++jj) {
            if (arr[ii][jj] === 10) {
                continue
            }

            v.push(
                j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,

                j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + sS + ii * sS,
                j * S + jj * sS, arr[ii][jj] * H + H0, i * S + sS + ii * sS,
            )

            const col = colors[2]

            c.push(
                ...col,
                ...col,
                ...col,
                ...col,
                ...col,
                ...col,

            )

            if (!arr[ii + 1]) {
                v.push(
                    j * S + jj * sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,

                    j * S + jj * sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,
                    j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,
                )

                const col = colors[2]

                c.push(
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                )
            }

            if (!arr[ii - 1]) {
                v.push(
                    j * S + jj * sS, H0, i * S + ii * sS,
                    j * S + jj * sS + sS, H0, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS,

                    j * S + jj * sS, H0, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                    j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                )

                const col = colors[2]

                c.push(
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                )
            }


            if (!arr[ii][jj + 1]) {
                v.push(
                    j * S + jj * sS + sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, H0, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS,

                    j * S + jj * sS + sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                    j * S + jj * sS + sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,
                )


                const col = colors[2]

                c.push(
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                    ...col,
                )
            }

            if (!arr[ii][jj - 1]) {
                v.push(
                    j * S + jj * sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS, H0, i * S + ii * sS,
                    j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS,

                    j * S + jj * sS, H0, i * S + ii * sS + sS,
                    j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS,
                    j * S + jj * sS, arr[ii][jj] * H + H0, i * S + ii * sS + sS,
                )


                const col = colors[2]

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




export const createMeshByMap02 = (map) => {
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
