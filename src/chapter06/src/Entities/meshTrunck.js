import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js'

const generate = (count, r, s = 1) => {
    const v = []

    for (let i = 0; i < count; ++i) {
        const radius = Math.random() * r
        const angle = Math.random() * Math.PI * 2
        const angle2 = Math.random() * Math.PI * 2

        const x = Math.sin(angle) * radius
        const y = Math.sin(angle2) * Math.random() * 50
        const z = Math.cos(angle) * radius


        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * s + 2,
                y + Math.random() * s + 2,
                z + Math.random() * s + 2,
            )
        }
    }

    return v
}


export const createFractions = (root) => {
    const arr = []
    for (let i = 0; i < 20; ++i) {
        arr.push(generate(2000, 150 * Math.random() + 20, Math.random() * 10))
    }


    const vertices = new Float32Array(arr[0])
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))


    console.log(geometry)

    const T = 800

    const iterate = n => {
        let oldIndex = arr[n - 1] ? n - 1 : arr.length - 1
        let newIndex = arr[n] ? n : 0
        if (!arr[n]) {
            n = 0
        }


        const v = { v : 0 }
        new TWEEN.Tween(v)
            .to({ v: 1 }, T)
            .onUpdate(() => {
                for (let i = 0; i < geometry.attributes.position.array.length; ++i) {
                    geometry.attributes.position.array[i] = v.v * arr[newIndex][i] + (1 - v.v) * arr[oldIndex][i]
                }
                geometry.attributes.position.needsUpdate = true
            })
            .start()
        setTimeout(() => {
            iterate(++n)
        }, T)
    }

    iterate(1)

    return {
        m: new THREE.Mesh(geometry, root.materials.testBlack),
        update: () => {

        }
    }
}