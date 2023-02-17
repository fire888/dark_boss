import * as THREE from 'three'
import {createTown2} from '../Entities/town/town2'


export const createWorldReal = (root) => {
    const {
        materials,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    const groundStart = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        materials.floorMat1
    )
    materials.floorMat1.map.repeat.set(180, 180)

    groundStart.rotation.x = -Math.PI / 2
    groundStart.position.y = -62

    const t2 = createTown2(root)


    console.log(root.assets.endWayModel)
    const centralItem = new THREE.Mesh(
        root.assets.endWayModel.children[0].geometry,
        //new THREE.BoxGeometry(40, 1600, 5),
        root.materials.bodyRed,
    )
    centralItem.position.y = -62

    const centralItemBounds = root.assets.endWayModel.children[1]
    centralItemBounds.visible = false
    centralItem.add(centralItemBounds)

    const endItemObj = //new THREE.Object3D()
        new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
        )
    endItemObj.position.set(0, 0, -35)
    centralItem.add(endItemObj)



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
        },
        roomsArr: t2.roomsArr,
        toNormal: () => {
            t2.toNormal()
        },
        toNotWalls: () => {
            t2.toNotWalls()
        },
        setEndWayPos: (x, y, z) => {
            centralItem.position.x = x
            centralItem.position.y = y
            centralItem.position.z = z
            root.studio.addToScene(centralItem)
        },
        getCoordsForFinalBox: t2.getCoordsForFinalBox,
        centralItemBounds,
        endItemObj,
    }
}


