import * as THREE from "three";

export const createrMesh = (root) => {
    const m = new THREE.MeshPhongMaterial({ color: 0xffffff})

    const S = 40
    const SH = 20
    const SCALE = 4



    const G = {
        'tile_I': root.assets['elem_I'].children[0].geometry,
        'tile_L': root.assets['elem_L'].children[0].geometry,
        'tile_Y': root.assets['elem_Y'].children[0].geometry,
        'tile_YS': root.assets['tile_YS'].children[0].geometry,
    }


    return {
        addMesh: (tile) => {
            if (!G[tile.tileData.keyModel]) {
                return;
            }
            const {i, j, k, tileData } = tile
            console.log(tileData)


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
