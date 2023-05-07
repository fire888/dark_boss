import * as THREE from 'three'



const createS = (m) => {
    const v = []

    for (let i = 0; i < 20; ++i) {
        const x = Math.random() * 300 
        const y = Math.random() * 1000 - 150
        const z = Math.random() * 300

        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * 5,
                y + Math.random() * 5,
                z + Math.random() * 5,
            )
        }
    } 


    const vertices = new Float32Array(v)
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))


    return new THREE.Mesh(geometry, m)
}


export const createSystemSprites = root => {
    const ob = new THREE.Object3D()
    ob.position.set(0, 0, -3000)
    const vecObPos = new THREE.Vector3()

    const m = new THREE.MeshBasicMaterial({ color: 0x000000 })


    const arrSprites = []
    for (let i = 0; i < 50; ++i) {
        const s = createS(m)
        s.position.set(Math.random() * 500, 0, Math.random() * 500)
        arrSprites.push(s)
    }


    return { 
        update: () => {
            ob.getWorldPosition(vecObPos)
            for (let i = 0; i < arrSprites.length; ++i) {
                if (arrSprites[i].position.distanceTo(vecObPos) > 4000) {
                    arrSprites[i].position.copy(vecObPos)
                }
            }
        },
        addToScene: () => {
            for (let i = 0; i < arrSprites.length; ++i) {
                root.studio.addToScene(arrSprites[i])
            }
        },
        removeAll: () => {
            for (let i = 0; i < arrSprites.length; ++i) {
                root.studio.removeFromScene(arrSprites[i])
            }
        }
    }
} 