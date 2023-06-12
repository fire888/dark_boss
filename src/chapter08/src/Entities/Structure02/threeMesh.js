import * as THREE from "three";

export const createrMesh = (root) => {
    const g = new THREE.BoxGeometry(10, 10, 10)
    const m = new THREE.MeshPhongMaterial({ color: 0xff0000})

    const S = 30
    const sS = 10

    return {
        addMesh: (tile, y, z, x) => {
            for (let i = 0; i < tile.length; ++i) {
                for (let j = 0; j < tile[i].length; ++j) {
                    for (let k = 0; k < tile[i][j].length; ++k) {
                        if (tile[i][j][k] === 1) {
                            const me = new THREE.Mesh(g, m)
                            me.position.set(
                                x * S + k * sS,
                                y * S + i * sS,
                                z * S + j * sS,
                            )
                            root.studio.addToScene(me)
                        }
                    }
                }
            }
        }
    }
}
