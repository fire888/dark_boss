import * as THREE from 'three'
import { createPlatformData } from '../Structure03/geometries/geomElemPlatform'
import { createElemDrive } from '../Structure03/geometries/geomElemDrive'
import { createGeomFromBuffer } from '../Structure03/geometries/createBufferGeom'
import { translateArr } from "../../helpers/geomHelpers";

import { SIZE_Z, W } from "../../constants/constants_elements";

export const createFlyer = (root) => {
    const { structureMaterial, basicMat } = root.materials

    const v = []
    const c = []
    const u = []
    const col = []

    {
        const platform = createPlatformData({
            nX_pZ: [-50, 0, 125],
            pX_pZ: [50, 0, 125],
            pX_nZ: [50, 0, -125],
            nX_nZ: [-50, 0, -125],
            color: [1, 1, 0]
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }
    {
        const elemDive = createElemDrive({
            h: 12,
            color: [1, 1, 0],
        })
        translateArr(elemDive.v, 0, 0, -110)
        v.push(...elemDive.v)
        c.push(...elemDive.c)
        u.push(...elemDive.u)

        translateArr(elemDive.col, 0, 0, -110)
        col.push(...elemDive.col)
    }

    const viewGeom = createGeomFromBuffer({ v, c, u })
    const mesh = new THREE.Mesh(viewGeom, structureMaterial)
    root.studio.addToScene(mesh)

    const collisionGeom = createGeomFromBuffer({ v: col })
    const meshCollision = new THREE.Mesh(collisionGeom, basicMat)
    meshCollision.visible = false
    mesh.add(meshCollision)
    root.system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)

    const playerNearObj = new THREE.Object3D()
    playerNearObj.position.set(0, 10, -100)
    mesh.add(playerNearObj)

    const arrow = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 6, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    )
    arrow.rotation.x = -0.25
    arrow.position.z = -106
    arrow.position.y = 5
    mesh.add(arrow)

    return {
        arrow,
        mesh,
        objectForCheck: playerNearObj,
    }
}
