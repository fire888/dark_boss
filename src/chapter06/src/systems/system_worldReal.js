import * as THREE from 'three'
import { createMeshWall } from '../Entities/meshWall'

export const createWorldReal = (root) => {
    const {
        assets,
        materials,
        studio,
        system_Assets,
        system_PlayerMoveOnLevel,
    } = root

    const groundStart = new THREE.Mesh(
        new THREE.PlaneGeometry(5000, 5000),
        materials.floorMat1
    )
    materials.floorMat1.map.repeat.set(180, 180)
    groundStart.rotation.x = -Math.PI / 2
    groundStart.position.y = -62

    const mWall = createMeshWall(root)
    studio.addToScene(mWall.mesh)
    mWall.mesh.position.y = -62

    /** body **************************/




    return {
        addWorld: () => {
            system_PlayerMoveOnLevel.addItemToPlayerCollision(groundStart)
            studio.addToScene(groundStart)
        },
        removeWorld: () => {
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(groundStart)
            studio.removeFromScene(groundStart)
        }
    }
}


