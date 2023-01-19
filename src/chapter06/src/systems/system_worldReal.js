import * as THREE from 'three'
import {createTown2} from '../Entities/town2'

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



    // const mTown = createMeshTown(root)
    // //mTown.mesh.position.y = -62
    // mTown.mesh.position.y = -61.5
    // studio.addToScene(mTown.mesh)


    // const mWall = createMeshWall(root)
    // mWall.mesh.position.y = -62
    // studio.addToScene(mWall.mesh)



    //const mPath = createMeshPath(root)
    //mTown.mesh.position.y = -62
    //mPath.mesh.position.y = -61.5
    //studio.addToScene(mPath.mesh)

    const t2 = createTown2(root)
    //studio.addToScene(t2.mesh)



    return {
        addWorld: () => {
            system_PlayerMoveOnLevel.addItemToPlayerCollision(groundStart)
            //system_PlayerMoveOnLevel.addItemToPlayerCollision(mTown.mesh)
            studio.addToScene(groundStart)
            //studio.addToScene(mTown.mesh)
        },
        removeWorld: () => {
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(groundStart)
            studio.removeFromScene(groundStart)
        }
    }
}


