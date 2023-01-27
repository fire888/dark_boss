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
    const modelSrc = root.assets.bodyModel.children[0]

    // !! 33048

    const c = []
    for (let i = 0; i < modelSrc.geometry.attributes.position.array.length; i += 3) {
        if (i > modelSrc.geometry.attributes.position.array.length / 2) {
            c.push(0, 0, 0)
        } else {
            c.push(.4, .47, .49)
        }

    }
    const colors = new Float32Array(c)
    modelSrc.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    modelSrc.geometry.attributes.color.needsUpdate = true

    const arr = [[...modelSrc.geometry.attributes.position.array]]

    const mesh = new THREE.Mesh(modelSrc.geometry, root.materials.testBlack)

    console.log(arr)
    for (let i = 0; i < 5; ++i) {
         //const n = generate(mesh.geometry.attributes.position.array.length / 3, 150 * Math.random() + 20, Math.random() * 10)
         const n = generate(
             mesh.geometry.attributes.position.array.length / 9,
             50 * Math.random() + 20,
             Math.random() * 3
         )
         arr.push(n)
    }


    const T = 800




    const iterate = n => {
        mesh.rotation.y = Math.random() * 2 * Math.PI

        let oldIndex = arr[n - 1] ? n - 1 : arr.length - 1
        let newIndex = arr[n] ? n : 0
        if (!arr[n]) {
            n = 0
        }


        const v = {
            v : 0,
            x: mesh.position.x,
            z: mesh.position.z,
        }
        console.log(mesh.position.x, mesh.position.z)
        new TWEEN.Tween(v)
            .to({
                v: 1,
                x: Math.random() * 30 + 70,
                z: Math.random() * 30 + 70,
            }, T)
            .onUpdate(() => {
                for (let i = 0; i < mesh.geometry.attributes.position.array.length; ++i) {
                    mesh.geometry.attributes.position.array[i] = v.v * arr[newIndex][i] + (1 - v.v) * arr[oldIndex][i]
                }
                mesh.geometry.attributes.position.needsUpdate = true
                mesh.position.x = v.x
                mesh.position.z = v.z
            })
            .start()
        setTimeout(() => {
            iterate(++n)
        }, T + (newIndex === 0 ? 3000 : 0))
    }
    //
    iterate(1)

    return {
        m: mesh,
        update: () => {},
    }
}