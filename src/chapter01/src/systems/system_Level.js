import * as THREE from "three";
import { setItemToFloorsCollision } from '../../../_CORE/components/component_collisionFloor'

export class SystemLevel {
    constructor (gameContext) {
        const { assets, materials, studio } = gameContext

        const levelItems = []
        const collisionWalls = []
        const collisionFloors = []

        console.log(assets)

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



        const easyMat = new THREE.MeshBasicMaterial()
        assets['levelCollisions'].traverse(child => {
            child.name === "wall_collision" && collisionWalls.push(new THREE.Mesh(child.geometry, easyMat))
            child.name === "floor_collision" && collisionFloors.push(new THREE.Mesh(child.geometry, easyMat))
        })
        for (let i = 0; i < collisionFloors.length; ++i) {
            setItemToFloorsCollision(collisionFloors[i])
        }


    }
}