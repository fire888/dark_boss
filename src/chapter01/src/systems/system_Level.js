import * as THREE from "three";

export class SystemLevel {
    constructor (gameContext) {
        const { assets, materials, studio } = gameContext

        const levelItems = []

        assets['level-rooms'].traverse(child => {
            child.name.includes("room_")
              && levelItems.push(new THREE.Mesh(child.geometry, materials.wall))
            
            // if (child.name.includes("doormesh_")) {
            //   const key = child.name.split('_')[1]
            //   !doors[key] && (doors[key] = {})
            //   doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.door)
            //   doors[key]['mesh']['userData'] = {
            //     part: 'mesh',
            //     type: 'door',
            //     id: key,
            //   }
            // }
        })

        for (let i = 0; i < levelItems.length; ++i) {
            studio.addToScene(levelItems[i])
        }
    }
}