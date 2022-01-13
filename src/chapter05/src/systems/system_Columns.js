import * as THREE from 'three'
import { createGeometry } from '../components/component_GeometryColumn/gejmetryColumn'







export class system_Columns {
    constructor(root) {
        const {
            studio,
            assets,
            materials,
            emitter,
        } = root


        const box = new THREE.Mesh(
            createGeometry(),
            //new THREE.BoxGeometry(20, 20, 20),
            new THREE.MeshPhongMaterial({ color: 0xff0000 })
        )
        box.position.set(0, -40, -40)
        studio.addToScene(box)
    }
}


