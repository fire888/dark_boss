import * as THREE from 'three'



let WALLS_ARRAY = []



export const createComponentCollisionWalls = (objFromLink, objToLink, offset) => {
    const offsetWallCollision = offset
    const objFrom = objFromLink
    const objTo = objToLink

    const vec3Src2 = new THREE.Vector3()
    const vec3Ray2 = new THREE.Vector3()

    const raycasterWalls = new THREE.Raycaster(vec3Src2, vec3Ray2)
    
    return {
        check: () => {
            objTo.getWorldPosition(vec3Ray2)
            vec3Src2.copy(objFrom.position)
            vec3Ray2.sub(vec3Src2)

            
            const intersectsWalls = raycasterWalls.intersectObjects(WALLS_ARRAY)

            return intersectsWalls[0] && intersectsWalls[0].distance < offsetWallCollision
        }
    }
}



export const setItemToWallCollision = item => WALLS_ARRAY.push(item)
export const removeItemFromWallCollision = item => WALLS_ARRAY = WALLS_ARRAY.filter(mesh => item !== mesh)
