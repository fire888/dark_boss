import * as THREE from 'three'
import { createPlatformData } from '../Structure03/geometries/geomElemPlatform'
import { createGeomFromBuffer } from '../Structure03/geometries/createBufferGeom'

export const createPlatform = (root) => {
    const { structureMaterial, basicMat } = root.materials

    const platform = createPlatformData({
        nX_pZ: [-50, 0, 100],
        pX_pZ: [50, 0, 100],
        pX_nZ: [50, 0, -100],
        nX_nZ: [-50, 0, -100],
        color: [1, 1, 0]
    })

    // {
    //     const column =
    // }


    const viewGeom = createGeomFromBuffer(platform)
    const mesh = new THREE.Mesh(viewGeom, structureMaterial)
    mesh.position.set(500, 500, -100)
    root.studio.addToScene(mesh)

    const collisionGeom = createGeomFromBuffer({ v: platform.col })
    const meshCollision = new THREE.Mesh(collisionGeom, basicMat)
    meshCollision.visible = false
    mesh.add(meshCollision)
    root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)
}
