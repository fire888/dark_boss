import * as THREE from 'three'
import { createTown3 } from '../Entities/town3/town3'


export const createWorldReal = (root) => {
    const {
        materials,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    //const groundStart = new THREE.Mesh(
    //    new THREE.PlaneGeometry(10000, 10000),
    //    materials.floorMat1
    //)
    //materials.floorMat1.map.repeat.set(180, 180)
    //groundStart.rotation.x = -Math.PI / 2
    //groundStart.position.y = -62

    const t2 = createTown3(root)



    return {
        addWorld: () => {
            //system_PlayerMoveOnLevel.addItemToPlayerCollision(groundStart)
            //system_PlayerMoveOnLevel.addItemToPlayerCollision(t2.mCollision)
            //studio.addToScene(groundStart)
        },
        removeWorld: () => {
            //system_PlayerMoveOnLevel.removeItemFromPlayerCollision(groundStart)
            //studio.removeFromScene(groundStart)
        },
        roomsArr: t2.roomsArr,
        toNormal: () => {
            t2.toNormal()
        },
        toNotWalls: () => {
            t2.toNotWalls()
            //root.studio.removeFromScene(groundStart)
        },
        setEndWayPos: (x, y, z) => {
            //centralItem.position.x = x
            //centralItem.position.y = y
            //centralItem.position.z = z
            //root.studio.addToScene(centralItem)
        },
        getCoordsForFinalBox: t2.getCoordsForFinalBox,
        //centralItemBounds,
        //endItemObj,
    }
}


