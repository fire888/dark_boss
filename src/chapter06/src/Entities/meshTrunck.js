import * as THREE from "three";

export const createFractions = (root) => {
    const v = []

    for (let i = 0; i < 1000; ++i) {
        //const x = Math.random() * 3000 - 1500
        //const y = Math.random() * 50 - 50
        //const z = Math.random() * 3000 - 1500

        const x = Math.random() * 300 - 150
        const y = Math.random() * 50 - 50
        const z = Math.random() * 300 - 150


        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * 3,
                y + Math.random() * 3,
                z + Math.random() * 3,
            )
        }
    }


    const vertices = new Float32Array(v)
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    return new THREE.Mesh(geometry, root.materials.testBlack)
}