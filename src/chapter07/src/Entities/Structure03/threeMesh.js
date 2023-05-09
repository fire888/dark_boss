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
        map: root.assets.textureTiles,
        vertexColors: true,
    })


    const S = 160
    const SH = 80
    const SCALE = 4

    const basicMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })

    const currentMesh = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 15),
        basicMat,
    )
    root.studio.addToScene(currentMesh)

    const tilesGeom = {
        't_bt': createGeomStairs(),
        't_XY': createGeomXY(),
        't_b': createGeomFromBot(),
        't_T': createGeomT(),
        't_t': createGeomToTop(),
        't_L': createGeomL(),
        't_I': createGeomI(),
        't_X': createGeomX(),
        't_tt': createGeomTopPlatform(),
    }


    return {
        addMesh: (tile) => {
            if (!tile.tileData) {
                return;
            }

            if (tilesGeom[tile.tileData.keyModel]) {
                const {i, j, k, tileData } = tile

                const g = createGeomFromBuffer(tilesGeom[tile.tileData.keyModel])
                const mesh = new THREE.Mesh(g, m)
                root.studio.addToScene(mesh)
                mesh.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))

                const gCollision = createGeomFromBuffer({ v: tilesGeom[tile.tileData.keyModel].col })
                const meshCollision = new THREE.Mesh(gCollision, basicMat)
                meshCollision.position.set(S * k  + (S / 2), SH * i - 160, S * j + (S / 2))
                meshCollision.visible = false
                root.studio.addToScene(meshCollision)

                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)

                return;
            } else {
                //return;
            }
        },
        setCurrentMeshToIndex: (i, j, k) => {
            currentMesh.position.set(S * k * SCALE, SH * i * SCALE - 160, S * SCALE * j)
        }
    }
}
