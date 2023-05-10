import * as THREE from 'three'



export class system_PlayerNearLevelItems {
    constructor(root) {
        this._root = root

        const {
            emitter, player
        } = root


        this._itemsToCheck = []

        const vec = new THREE.Vector3()

        emitter.subscribe('playerMove')(() => {
            for (let i = 0; i < this._itemsToCheck.length; ++i) {
                this._itemsToCheck[i].getWorldPosition(vec)

                const dist = player.mesh.position.distanceTo(vec)

                if (!this._itemsToCheck[i].userData.nearPlayerIsNearPlayer && dist < this._itemsToCheck[i].userData.nearPlayerItemNear) {
                    this._itemsToCheck[i].userData.nearPlayerIsNearPlayer = true
                    emitter.emit('checkNear')({ item: this._itemsToCheck[i].userData.nearPlayerItemKey, is: true })
                    return;
                }

                if (this._itemsToCheck[i].userData.nearPlayerIsNearPlayer && dist > this._itemsToCheck[i].userData.nearPlayerItemNear) {
                    this._itemsToCheck[i].userData.nearPlayerIsNearPlayer = false
                    emitter.emit('checkNear')({ item: this._itemsToCheck[i].userData.nearPlayerItemKey, is: false })
                }
            }
        })
    }


    setItemToCheck (item, itemKey, near, far) {
        for (let i = 0; i < this._itemsToCheck.length; ++i) {
            if (item === this._itemsToCheck[i]) {
                return;
            }
        }
        //console.log(item, itemKey, near, far)
        itemKey && (item.userData.nearPlayerItemKey = itemKey)
        near && (item.userData.nearPlayerItemNear = near)
        far && (item.userData.nearPlayerItemFar = far)
        item.userData.nearPlayerIsNearPlayer = false

        this._itemsToCheck.push(item)
    }

    removeItemFromCheck (item) {
        this._itemsToCheck = this._itemsToCheck.filter(itemIn => itemIn !== item)
    }
}




// function getCenterPoint (mesh) {
//     // var center = new THREE.Vector3();
//     // mesh.geometry.computeBoundingBox();
//     // mesh.geometry.boundingBox.getCenter(center);
//     // mesh.geometry.center();
//     //mesh.position.copy(center);
//
//     //return center
//     const geometry = mesh.geometry
//     geometry.computeBoundingBox()
//     const center = new THREE.Vector3()
//     geometry.boundingBox.getCenter(center)
//     mesh.localToWorld(center)
//     return center
// }