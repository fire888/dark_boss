import * as THREE from "three";


export class SystemCollisionsPlayerWithItems {
    constructor(root) {
        this._root = root
        this._arrMeshes = []


        this._vecStart = new THREE.Vector3()
        this._vecDir = new THREE.Vector3()
        this._rayCaster = new THREE.Raycaster(this._vecStart, this._vecDir)
    }

    setItemToCollision ({
        mesh,
        dist,
        itemKeyEmitCollision = null,
        isDisablePlayer = true
    }) {
        mesh.userData.offsetFromPlayer = dist
        mesh.userData.itemKeyEmitCollision = itemKeyEmitCollision
        mesh.userData.isDisablePlayer = isDisablePlayer
        this._arrMeshes.push(mesh)
    }


    checkCollisions (objFrom, objTo) {
        objFrom.getWorldPosition(this._vecStart)
        objTo.getWorldPosition(this._vecDir)

        this._vecDir.sub(this._vecStart)

        const intersects = this._rayCaster.intersectObjects(this._arrMeshes)

        if (intersects[0]) {
            if (intersects[0].distance < intersects[0].object.userData.offsetFromPlayer) {
                if (intersects[0].object.userData.itemKeyEmitCollision) {
                    this._root.emitter.emit('playerCollision')(intersects[0].object.userData.itemKeyEmitCollision)
                }

                if (intersects[0].object.userData.isDisablePlayer) {
                    return true
                }
            }
        }

        return false
    }
}