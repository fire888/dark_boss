import * as THREE from 'three'
import { createTreeGeometry } from './treeGeometry'


const createMat = (root) => {
    console.log(root)
    return new THREE.MeshBasicMaterial({
        color: 0xff0000,
        map: root.assets.textureTiles
    })
}

export class Tree extends THREE.Mesh {
    constructor(root) {
        super(createTreeGeometry(), createMat(root));

    }
}
