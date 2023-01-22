import * as THREE from 'three'
import {createTown2} from '../Entities/town2'
import {createFractions} from '../Entities/meshTrunck'
import * as TWEEN from "@tweenjs/tween.js";


export const createWorldReal = (root) => {
    const {
        assets,
        materials,
        studio,
        system_Assets,
        system_PlayerMoveOnLevel,
        frameUpdater
    } = root

    const groundStart = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        materials.floorMat1
    )
    materials.floorMat1.map.repeat.set(180, 180)
    //materials.floorMat1.vertexColors = true
    groundStart.rotation.x = -Math.PI / 2
    groundStart.position.y = -62

    const fractions = createFractions(root)
    fractions.position.x = 1500
    fractions.position.z = 1500
    studio.addToScene(fractions)
    let count = 0
    frameUpdater.on(data => {
         count += 0.01
         fractions.position.y = Math.sin(count) * 40
    })

    // for (let i = 0; i < 140; ++i) {
    //     const m = new THREE.Mesh(
    //         new THREE.ConeBufferGeometry(Math.random() * 30, Math.random() * 100 + 50),
    //         root.materials.testBlack,
    //     )
    //     m.position.set(Math.random() * 3000, - 62, Math.random() * 3000)
    //     root.studio.addToScene(m)
    // }






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
            system_PlayerMoveOnLevel.addItemToPlayerCollision(t2.mCollision)
            studio.addToScene(groundStart)
            //studio.addToScene(mTown.mesh)
        },
        removeWorld: () => {
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(groundStart)
            studio.removeFromScene(groundStart)
        }
    }
}


