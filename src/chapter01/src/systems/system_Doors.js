import * as THREE from "three";
import { setItemToWallCollision } from '../../../_CORE/components/component_collisionWalls'



export class SystemDoors {
    constructor (gameContext) {
        const { assets, materials, studio, emitter } = gameContext

        const doors = {} 
        const arrDoors = []

        assets['level-rooms'].traverse(child => {
            if (child.name.includes("doormesh_")) {
                const key = child.name.split('_')[1]
                !doors[key] && (doors[key] = {})
                doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.door)
                doors[key]['mesh']['userData'] = {
                    part: 'mesh',
                    type: 'door',
                    id: key,
                }

                arrDoors.push(child)
            }
        })
        for (let key in doors) {
            studio.addToScene(doors[key]['mesh'])
            setItemToWallCollision(doors[key]['mesh'])
        }

        // const objFrom = objFromLink
        // const objTo = objToLink
        // const offsetWallCollision = 2
        

        // const checkCollision = (objFrom, objTo) => {
        //     vec3Src2.copy(objFrom.position)
        //     objTo.getWorldPosition(vec3Ray2)
        
        //     vec3Ray2.sub(vec3Src2)
        
        //     const raycasterDoors = new THREE.Raycaster(vec3Src2, vec3Ray2)
        //     const intersectsDoors = raycasterDoors.intersectObjects(arrDoors)
        
        //     if (intersectsDoors[0] && intersectsDoors[0].distance < 10) {
        //         //const doorId = checkDoor(intersectsDoors[0].object)
        //         console.log('!!!')
        //         //doorId && EMITTER.emit('collisionDoors')(doorId)
        //     }
        
        //     if (intersectsDoors[0] && intersectsDoors[0].distance < offsetWallCollision) {
        //         return true;
        //     }
        
        //     return false;
        // }


        emitter.subscribe('playerMove')(({ pos, dir }) => {
            if (dir !== 'up') return;
            
            for (let key in doors) {
                //console.log(doors[key].mesh.position.distanceTo(pos))
                //checkCollision()
            }
        })
    }
}