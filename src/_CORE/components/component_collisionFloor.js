import * as THREE from 'three'



let FLOORS_ARRAY = []



export const createComponentCollisionFloors = (objFromLink, offset, delta, speed) => {
    const objFrom = objFromLink
    const offsetFromFloor = offset
    const offsetFromFloorFactor = delta
    const speedDown = speed

    const vec3Src = new THREE.Vector3()
    const vec3Ray = new THREE.Vector3(0, -1, 0)

    let isDisable = false
    
    const raycasterDown = new THREE.Raycaster(vec3Src, vec3Ray)


    return {
        check: updateData => {
            if (isDisable) return;

            vec3Src.copy(objFrom.position)
            const intersectsFloor = raycasterDown.intersectObjects(FLOORS_ARRAY)
            if (intersectsFloor && intersectsFloor[0] && intersectsFloor[0].distance > offsetFromFloor + offsetFromFloorFactor) {
                objFrom.position.y += speedDown * updateData.count
                return;
            }
            if (intersectsFloor && !intersectsFloor[0]) {
                objFrom.position.y += speedDown * updateData.count
                return;
            } 
            objFrom.position.y = intersectsFloor[0].point.y + offsetFromFloor
        },
        toggleDisable: val => isDisable = val
    }

}



export const setItemToFloorsCollision = item => FLOORS_ARRAY.push(item)
export const removeItemFromFloorsCollision = item => FLOORS_ARRAY = FLOORS_ARRAY.filter(mesh => mesh !== item) 

