import * as THREE from "three";

export const createrMesh = (root) => {
    const m = new THREE.MeshPhongMaterial({ color: 0xffffff})

    const S = 40
    const SH = 20
    const SCALE = 4

    const G  = {
        'empty': new THREE.BoxGeometry(3, 3, 3)
    }
    root.assets['tiles'].traverse(item => {
        if (item.type === 'Mesh') {
            G[item.name] = item.geometry
        }
    })
    console.log('G',G)



    return {
        addMesh: (tile) => {
            if (!G[tile.tileData.keyModel]) {
                return;
            }
            const {i, j, k, tileData } = tile

            const mesh = new THREE.Mesh(
                G[tileData.keyModel],
                m,
            )
            root.studio.addToScene(mesh)
            mesh.rotation.y = tileData.rotationY
            mesh.scale.set(SCALE, SCALE, SCALE)
            mesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
            root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
        }
    }
}
