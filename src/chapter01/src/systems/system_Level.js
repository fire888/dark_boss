import * as THREE from "three";

export class SystemLevel {
    constructor (root) {
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


        const botsCustomWallsCollisions = {}

        assets['level-rooms'].traverse(child => {
            child.name.includes("room_") 
                && studio.addToScene(new THREE.Mesh(child.geometry, materials.wall))
                
                
            if (child.name.includes("collision_bot")) {
                botsCustomWallsCollisions[child.name] = child 
            }    
        })

        root.botsCustomWallsCollisions = botsCustomWallsCollisions



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
}