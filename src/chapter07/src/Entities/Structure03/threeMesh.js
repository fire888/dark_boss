import * as THREE from "three"
import { createGeomL } from './geometries/geometryTileL'
import { createGeomI } from './geometries/geometryTileI'
import { createGeomX } from './geometries/geometryTileX'
import { createGeomT } from './geometries/geometryTileT'
import { createGeomXY } from './geometries/geometryTileXY'
import { createGeomStairs } from './geometries/geometryTileStairs'
import { createGeomToTop } from './geometries/geometryTileToTop'
import { createGeomFromBot } from './geometries/geometryTileFromBot'
import { createGeomTopPlatform } from './geometries/geometryTileTopPlatform'
import { createGeomFromBuffer } from './geometries/createBufferGeom'

export const createrMesh = (root) => {
    root.assets.textureTiles.magFilter = THREE.NearestFilter
    root.assets.textureTiles.minFilter = THREE.NearestFilter
    const m = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: root.assets.textureTiles
    })

    const S = 160
    const SH = 80
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

            //createGeomStairs

            if (tile.tileData.keyModel === 't_bt') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomStairs())

                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                //mesh.rotation.y = tileData.rotationY
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }

            if (tile.tileData.keyModel === 't_XY') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomXY())

                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }

            if (tile.tileData.keyModel === 't_b') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomFromBot())

                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }


            if (tile.tileData.keyModel === 't_T') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomT())

                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
               // return;
            }


            if (tile.tileData.keyModel === 't_t') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomToTop())

                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }

            if (tile.tileData.keyModel === 't_L') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomL())

                const mesh = new THREE.Mesh(
                    g,
                    m,
                )
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                //mesh.scale.set(SCALE, SCALE, SCALE)
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }

            if (tile.tileData.keyModel === 't_I') {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomI())

                const mesh = new THREE.Mesh(
                    g,
                    m,
                )
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                //mesh.scale.set(SCALE, SCALE, SCALE)
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }

            if (tile.tileData.keyModel === 't_X') {
                //const
                //console.log('!!!')
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomX())

                const mesh = new THREE.Mesh(
                    g,
                    m,
                )
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                //mesh.scale.set(SCALE, SCALE, SCALE)
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }



            if (tile.tileData.keyModel === 't_tt') {
                //const
                //console.log('!!!')
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(createGeomTopPlatform())

                const mesh = new THREE.Mesh(
                    g,
                    m,
                )
                root.studio.addToScene(mesh)
                mesh.rotation.y = tileData.rotationY
                //mesh.scale.set(SCALE, SCALE, SCALE)
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)

                return;
            } else {
                //return;
            }


            const {i, j, k, tileData } = tile

            const mesh = new THREE.Mesh(
                G[tileData.keyModel],
                m,
            )
            root.studio.addToScene(mesh)
            mesh.rotation.y = tileData.rotationY
            mesh.scale.set(SCALE, SCALE, SCALE)
            //mesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
            mesh.position.set(S * k + (S / 2), SH * i - 160, S * j + (S / 2))
            root.system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
        },
        setCurrentMeshToIndex: (i, j, k) => {
            currentMesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
        }
    }
}
