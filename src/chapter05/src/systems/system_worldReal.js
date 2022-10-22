import * as THREE from 'three'

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

    const body =  system_Assets.items['body']
    body.position.fromArray([-20, -60, -50])
    body.rotation.fromArray([0, 2, 0])
    body.material = materials.body
    const bodyShadow =  system_Assets.items['body_shadow']
    bodyShadow.material = materials.body_sh
    body.add(bodyShadow)

    /** body **************************/




    return {
        addWorld: () => {
            system_PlayerMoveOnLevel.addItemToPlayerCollision(groundStart)
            studio.addToScene(groundStart)
            studio.addToScene(body)
        },
        removeWorld: () => {
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(groundStart)
            studio.removeFromScene(groundStart)
            studio.removeFromScene(body)
        }
    }
}


