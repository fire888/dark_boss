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
import { W, H } from '../../constants/constants_elements'
import {
    rotateArrY,
    translateArr,
} from "../../helpers/geomHelpers";


export const createrMesh = (root) => {
    const { structureMaterial, basicMat } = root.materials

    const tilesGeom = {
        't_stairs': createGeomStairs(),
        't_XY': createGeomXY(),
        't_fromBottom': createGeomFromBot(),
        't_T': createGeomT(),
        't_toTopPlatform': createGeomToTop(),
        't_L': createGeomL(),
        't_I': createGeomI(),
        't_X': createGeomX(),
        't_tt': createGeomTopPlatform(),
    }

    let mesh
    let meshCollision

    return {
        // addMesh: (tile) => {
        //     if (!tile.tileData) {
        //         return;
        //     }
        //
        //     if (!tilesGeom[tile.tileData.keyModel]) {
        //         return;
        //     }
        //
        //     // if (tile.tileData.keyModel !== 't_XY') {
        //     //      return;
        //     // }
        //
        //     const { i, j, k, tileData } = tile
        //
        //     const g = createGeomFromBuffer(tilesGeom[tile.tileData.keyModel])
        //     const mesh = new THREE.Mesh(g, structureMaterial)
        //     mesh.rotation.y = tileData.rotationY
        //     mesh.position.set(W * k  + (W / 2), H * i - 160, W * j + (W / 2))
        //     root.studio.addToScene(mesh)
        //
        //     const gCollision = createGeomFromBuffer({ v: tilesGeom[tile.tileData.keyModel].col })
        //     const meshCollision = new THREE.Mesh(gCollision, basicMat)
        //     meshCollision.rotation.y = tileData.rotationY
        //     meshCollision.position.set(W * k  + (W / 2), H * i - 160, W * j + (W / 2))
        //     root.studio.addToScene(meshCollision)
        //     meshCollision.visible = false
        //     root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)
        // },

        generateMeshes: mapData => {
            return new Promise(res => {
                const v = []
                const c = []
                const u = []
                const col = []

                mapData.iterateAll(tile => {
                    if (!tile.tileData) {
                        return;
                    }
                    const { i, j, k, tileData } = tile

                    if (!tilesGeom[tile.tileData.keyModel]) {
                        return;
                    }

                    const copyV = [...tilesGeom[tileData.keyModel].v]
                    rotateArrY(copyV, tileData.rotationY)
                    translateArr(copyV, W * k, H * i, W * j)
                    v.push(...copyV)
                    c.push(...tilesGeom[tileData.keyModel].c)
                    u.push(...tilesGeom[tileData.keyModel].u)

                    const copyVCollision = [...tilesGeom[tileData.keyModel].col]
                    rotateArrY(copyVCollision, tileData.rotationY)
                    translateArr(copyVCollision, W * k, H * i, W * j)
                    col.push(...copyVCollision)
                })

                const g = createGeomFromBuffer({ v, c, u })
                mesh = new THREE.Mesh(g, structureMaterial)
                root.studio.addToScene(mesh)

                const gCollision = createGeomFromBuffer({ v: col })
                meshCollision = new THREE.Mesh(gCollision, basicMat)
                root.studio.addToScene(meshCollision)
                meshCollision.visible = false
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)

                res()
            })
        },

        setPosition: (x = 0, y = 0, z = 0) => {
            mesh.position.set(x, y, z)
        },

        destroyStructure: () => {
            root.studio.removeFromScene(mesh)
            mesh.geometry.dispose()

            root.studio.removeFromScene(meshCollision)
            root.system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
            meshCollision.geometry.dispose()
        },
    }
}
