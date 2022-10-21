import * as THREE from 'three'



const createS = (root) => {
    const v = []

    for (let i = 0; i < 20; ++i) {
        const x = Math.random() * 3000 - 1500
        const y = Math.random() * 400 - 50
        const z = Math.random() * 3000 - 1500

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
    return new THREE.Mesh(geometry, root.materials.testGreen)
}


export const createSustemSprites = root => {
    const car = root.car
    const carModel = car.getModel()

    //const ob = new THREE.Mesh(
    //    new THREE.BoxGeometry(30, 30, 30),
    //    root.materials.testRed
    //)
    const ob = new THREE.Object3D()
    ob.position.set(0, 0, -3000)
    carModel.add(ob)
    const vecObPos = new THREE.Vector3()


    const arrSprites = []
    for (let i = 0; i < 50; ++i) {
        const s = createS(root)
        s.position.set(Math.random() * 3000 - 1500, 0, Math.random() * 3000 - 1500)
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
        removeFromScene: () => {
            for (let i = 0; i < arrSprites.length; ++i) {
                root.studio.removeFromScene(arrSprites[i])
            }
        }
    }
} 