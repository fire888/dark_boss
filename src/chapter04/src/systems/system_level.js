import * as THREE from 'three'




export class Level {
    constructor(root) {
        const { 
            studio, 
            assets, 
            materials, 
            systemCollisionFloor, 
            systemCollisionItems 
        } = root

        const { allMeshes } = createLevelMeshes(assets, materials)

        for (let key in allMeshes) {
            studio.addToScene(allMeshes[key])
            //systemCollisionFloor.setItemToCollision({ mesh: allMeshes[key] })
            //systemCollisionItems.setItemToCollision({ mesh: allMeshes[key] })
        }


        this.allMeshes = allMeshes
    }
}




const createLevelMeshes = (assets, materials) => {
    const allMeshes = {}
    const rooms = {}
    const collisionsBotsRooms = {}

    assets['level-rooms'].traverse(child => {
        if (child.name.includes("level")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }

        if (child.name.includes("road_wall")) {
            const mesh = new THREE.Mesh(child.geometry, materials.road)
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }


        // if (child.name.includes("room_")) {
        //     const mesh = new THREE.Mesh(child.geometry, materials.wall)
        //     rooms[child.name] = mesh
        //     mesh.name = child.name
        //     allMeshes[child.name] = mesh
        // }
        // if (child.name.includes("collision_")) {
        //     const mesh = new THREE.Mesh(child.geometry)
        //     collisionsBotsRooms[child.name] = mesh
        //     mesh.name = child.name
        //     allMeshes[child.name] = mesh
        // }
        // if (child.name.includes("outer_walls")) {
        //     const mesh = new THREE.Mesh(child.geometry, materials.wall)
        //     mesh.name = child.name
        //     allMeshes[child.name] = mesh
        // }
        // if (child.name.includes("outer_road")) {
        //     const mesh = new THREE.Mesh(child.geometry, materials.green)
        //     mesh.name = child.name
        //     allMeshes[child.name] = mesh
        // }
        // if (child.name.includes("outer_floor")) {
        //     const mesh = new THREE.Mesh(child.geometry, materials.road)
        //     mesh.name = child.name
        //     allMeshes[child.name] = mesh
        // }
    })

    return {
        rooms,
        allMeshes,
        collisionsBotsRooms,
    }
}
