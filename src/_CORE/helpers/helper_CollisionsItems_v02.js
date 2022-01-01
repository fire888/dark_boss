import * as THREE from "three";


export class helper_CollisionsItems_v02 {
    constructor () {
        this._arrMeshes = []


        this._vecStart = new THREE.Vector3()
        this._vecDir = new THREE.Vector3()
        this._rayCaster = new THREE.Raycaster(this._vecStart, this._vecDir)
    }

    setItemToCollision (mesh) {
        for (let i = 0; i < this._arrMeshes.length; ++i) {
            if (this._arrMeshes[i] === mesh) {
                return;
            }
        }
        this._arrMeshes.push(mesh)
    }


    removeItemFromCollision(mesh) {
        this._arrMeshes = this._arrMeshes.filter(item => item !== mesh)
    }


    checkCollisions (objFrom, objTo, dist) {
        objFrom.getWorldPosition(this._vecStart)
        objTo.getWorldPosition(this._vecDir)

        this._vecDir.sub(this._vecStart)

        const intersects = this._rayCaster.intersectObjects(this._arrMeshes)

        if (intersects[0] && intersects[0].distance < dist) {
            return [ true, intersects[0] ]
        }
        return [ false, null ]
    }
}