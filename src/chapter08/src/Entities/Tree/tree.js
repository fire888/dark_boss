import * as THREE from 'three'

const createGeom = () => {
    return new THREE.BoxGeometry(50, 50, 50)
}

const createMat = () => {
    return new THREE.MeshBasicMaterial({ color: "0xff0000" })
}



export class Tree extends THREE.Mesh {
    constructor(root) {
        super(createGeom(), createMat());

    }
}
