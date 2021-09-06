import * as THREE from "three";


export class SystemCollisionWithItems {
    constructor(root) {
        this._root = root
        this._arrMeshes = []


        this._vecStart = new THREE.Vector3()
        this._vecDir = new THREE.Vector3()
        this._rayCaster = new THREE.Raycaster(this._vecStart, this._vecDir)
    }

    setItemToCollision ({
        mesh,
        itemKeyEmitCollision = null,
        isStopUnits = true
    }) {
        mesh.userData.itemKeyEmitCollision = itemKeyEmitCollision
        mesh.userData.isStopUnits = isStopUnits
        this._arrMeshes.push(mesh)
    }


    checkCollisions (objFrom, objTo, d) {
        objFrom.getWorldPosition(this._vecStart)
        objTo.getWorldPosition(this._vecDir)

        this._vecDir.sub(this._vecStart)

        const intersects = this._rayCaster.intersectObjects(this._arrMeshes)

        if (intersects[0]) {
            if (intersects[0].distance < d) {
                if (intersects[0].object.userData.itemKeyEmitCollision) {
                    this._root.emitter.emit('collision')({ 
                        ...intersects[0].object.userData.itemKeyEmitCollision, 
                        type2: objFrom.userData.type 
                    })
                }

                if (intersects[0].object.userData.isStopUnits) {
                    return [ true, intersects[0].distance ]
                }
            }
        }

        return [ false, null ]
    }
}