import { createMeshSuper } from '../Entities/meshSuper'
import { createMeshStairs } from "../Entities/meshStairs"


export const createChangerLocations = root => {
    const {
        studio,
        car,
        system_Level,
        system_PlayerMoveOnLevel,
        system_PlayerNearLevelItems,
    } = root


    /** test stairs */
    //const stairs = createMeshStairs(root)
    //stairs.mesh.position.set(400, -42, -1000)
    //studio.addToScene(stairs.mesh)
    //stairs.meshCollision.visible = false
    //stairs.meshCollision.position.copy(stairs.mesh.position)
    //studio.addToScene(stairs.meshCollision)
    //system_PlayerMoveOnLevel.addItemToPlayerCollision(stairs.meshCollision)

    // /** super */
    const createSuper = () => {
        const superP = createMeshSuper(root)    
        superP.meshCollision.visible = false    
        superP.meshCollisionCar.visible = false    
        superP.meshFinish.position.copy(superP.mesh.position)
        return superP
    }

    const s = {
        location01: createSuper(),
        location02: createSuper(),
        location03: createSuper(),
    }


    /** add/remove locations by key */
    const addLocationToScene = (keyLocation, x, z) => {
        const { mesh, meshCollision, meshCollisionCar } = s[keyLocation]

        const y = -42

        mesh.position.set(x, y, z)
        studio.addToScene(mesh)

        system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)
        meshCollision.visible = false
        meshCollision.position.set(x, y, z)
        studio.addToScene(meshCollision)
        
        car.setCollisionForDraw(meshCollisionCar)
        meshCollisionCar.visible = false
        meshCollisionCar.position.set(x, y, z)
        studio.addToScene(meshCollisionCar)
    }

    const removeLocationFromScene = keyLocation => {
        const { mesh, meshCollision, meshCollisionCar } = s[keyLocation]

        studio.removeFromScene(mesh)

        system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
        studio.removeFromScene(meshCollision)

        studio.removeFromScene(meshCollisionCar)
        car.removeCollisionForDraw(meshCollisionCar)
    }


    return {
        removeLocationFromScene,
        addLocationToScene,
    }
}