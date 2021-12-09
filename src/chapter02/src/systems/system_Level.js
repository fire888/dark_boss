import * as THREE from "three";

export class SystemLevel {
    constructor (root) {
        this.root = root

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

    
    
        this._topLevel = null
        
        assets['level-rooms'].traverse(child => {
            if (child.name.includes("room_")) {
                studio.addToScene(new THREE.Mesh(child.geometry, materials.wall))
            }

            if (child.name.includes("topworld_")) {
                this._topLevel = new THREE.Mesh(child.geometry, materials.wall)
            }
        })


        assets['level-rooms'].traverse(child => {
            child.name === "wall_collision" 
                && systemCollisionItems
                    && systemCollisionItems.setItemToCollision({
                            mesh: new THREE.Mesh(child.geometry, materials.easyMaterial),
                            dist: 5,
                            isStopUnits: true
                        })
            child.name === "room_"
                && systemCollisionFloor     
                    && systemCollisionFloor.setItemToCollision({ 
                        mesh: new THREE.Mesh(child.geometry, materials.easyMaterial), 
                        dist: offsetFromFloor,
                        isStopUnits: true,
                    })

            if (child.name.includes("topworld_")) {
                systemCollisionFloor     
                    && systemCollisionFloor.setItemToCollision({ 
                        mesh: new THREE.Mesh(child.geometry, materials.easyMaterial), 
                        dist: offsetFromFloor,
                        isStopUnits: true,
                    })
            }        
        })
    }


    addTopZone () {
        console.log('ADD TOP ZONE')
        this.root.studio.addToScene(this._topLevel)
    }
}