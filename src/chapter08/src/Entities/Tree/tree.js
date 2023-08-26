import * as THREE from 'three'
import { createTreeGeometry } from './treeGeometry'


const createMat = (root) => {
    return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: root.assets.textureTiles
    })
}

export class Tree extends THREE.Mesh {
    constructor(root) {
        super(createTreeGeometry(), createMat(root));

    }
}
