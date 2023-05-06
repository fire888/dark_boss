import * as THREE from "three"
import { createGeomL } from './geometries/geometryL'
import { createGeomFromBuffer } from './geometries/geomFromData'

export const createrMesh = (root) => {
    console.log('44', root.assets)
    const m = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: root.assets.textureTiles
    })

    const S = 40
    const SH = 20
    const SCALE = 4

    const G  = {
        //'empty': new THREE.BoxGeometry(3, 3, 3)
    }
    root.assets['tiles'].traverse(item => {
        if (item.type === 'Mesh') {
            G[item.name] = item.geometry
        }
    })

    const currentMesh = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    )
    root.studio.addToScene(currentMesh)



    return {
        addMesh: (tile) => {
            if (!tile.tileData) {
                return;
            }
            if (!G[tile.tileData.keyModel]) {
                return;
            }
            if (tile.tileData.keyModel === 't_L') {
                //const
                //console.log('!!!')
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomL())

                const mesh = new THREE.Mesh(
                    g,
                    m,
                )
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                mesh.scale.set(SCALE, SCALE, SCALE)
                mesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
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
        },
        setCurrentMeshToIndex: (i, j, k) => {
            currentMesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
        }
    }
}
