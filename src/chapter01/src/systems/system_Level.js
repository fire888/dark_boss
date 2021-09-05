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
}