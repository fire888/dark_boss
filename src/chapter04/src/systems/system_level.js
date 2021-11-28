//import {
//    setItemToFloorsCollision,
//    removeItemFromFloorsCollision, 
//} from '../../../_CORE/components/component_collisionFloor'
//import {
//    setItemToWallCollision,
//    removeItemFromWallCollision,
//} from '../../../_CORE/components/component_collisionWalls'
import * as THREE from 'three'




export class Level {
    constructor(gameContext) {
        const { studio, assets, materials, systemCollisionItems } = gameContext
        const { allMeshes } = createLevelMeshes(assets, materials)

        const group = new THREE.Group()
        studio.addToScene(group)

        const START_ROOMS = ['room_07']

        for (let i = 0; i < START_ROOMS.length; ++i) {
            const l = allMeshes[START_ROOMS[i]].clone()
            systemCollisionItems && systemCollisionItems.setItemToCollision({
                    mesh: l,
                    dist: 5,
                    isStopUnits: true
                })
            
            
            //setItemToFloorsCollision(l)
            //setItemToWallCollision(l)
            group.add(l)
        }


        
    }
}


const createLevelMeshes = (assets, materials) => {
    const allMeshes = {}
    const rooms = {}
    const collisionsBotsRooms = {}

    assets['level-rooms'].traverse(child => {
        if (child.name.includes("room_")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            rooms[child.name] = mesh
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("collision_")) {
            const mesh = new THREE.Mesh(child.geometry)
            collisionsBotsRooms[child.name] = mesh
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_walls")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_road")) {
            const mesh = new THREE.Mesh(child.geometry, materials.green)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
        if (child.name.includes("outer_floor")) {
            const mesh = new THREE.Mesh(child.geometry, materials.road)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }
    })

    return {
        rooms,
        allMeshes,
        collisionsBotsRooms,
    }
}



/*
const { 
    assets, 
    materials, 
    studio, 
    systemCollisionItems,
    systemCollisionFloor,
} = root

const {
    offsetFromFloor,
} = root.CONSTANTS.playerConfig



assets['level-rooms'].traverse(child => {
    child.name.includes("room_") 
        && studio.addToScene(new THREE.Mesh(child.geometry, materials.wall))            
})



assets['levelCollisions'].traverse(child => {
    child.name === "wall_collision" 
        && systemCollisionItems
            && systemCollisionItems.setItemToCollision({
                    mesh: new THREE.Mesh(child.geometry, materials.easyMaterial),
                    dist: 5,
                    isStopUnits: true
                })
    child.name === "floor_collision" 
        && systemCollisionFloor     
            && systemCollisionFloor.setItemToCollision({ 
                mesh: new THREE.Mesh(child.geometry, materials.easyMaterial), 
                dist: offsetFromFloor,
                isStopUnits: true,
            })
})
}
*/