import * as THREE from "three";


export class SystemCheckerNearItem {
    constructor() {
        this._itemWorldPos = new THREE.Vector3()
        this._mainCheckerWorldPos = new THREE.Vector3()

        this._arr = []
    }


    setItemToCheck (mesh) {
        this._arr.push(mesh)
    }

    checkNear (mainMesh, dist) {
        mainMesh.getWorldPosition(this._mainCheckerWorldPos)

        for (let i = 0; i < this._arr.length; i++) {
            if (!this._arr[i].userData.inScene) continue;

            this._arr[i].getWorldPosition(this._itemWorldPos)
            const distance = this._itemWorldPos.distanceTo(this._mainCheckerWorldPos)
            if (distance < dist) {
                return [true, this._arr[i].userData]
            }
        }

        return [ false, null ]
    }
}

