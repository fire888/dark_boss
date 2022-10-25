import * as THREE from 'three'
import { createDataUnit } from './geometry/dataUnit'


const createS = (root, { r = 15, s = .5, mKey = 'testGreen'  }) => {
    const v = []
    const rh = r / 2


    for (let i = 0; i < 100; ++i) {
        const x = Math.random() * r - rh 
        const y = Math.random() * r - rh
        const z = Math.random() * r - rh

        for (let i = 0; i < 3; ++i) {
            v.push(
                x + Math.random() * s,
                y + Math.random() * s,
                z + Math.random() * s,
            )
        }
    } 


    const vertices = new Float32Array(v)
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    return new THREE.Mesh(geometry, root.materials[mKey])
}


export const createMeshUnit = (root) => {

    const dataUnit1 = createDataUnit({ 
        r: 15,
        cone: 12,
        w: 2,
        wt: 3,
        wtr: 5,
        htr: 5,
        rInner: -5,
        hhh: 8,
    })
    const dataUnit2 = createDataUnit({ 
        cone: 20,
        r: 13,
        w: .5,
        wt: .7, 
        wtr: 2,
        htr: 0,
        rInner: -5, 
        hhh: 12,
        hh: 16,
        hhD: -12,
    })
    const dataUnit3 = createDataUnit({ 
        r: 16,
        cone: 9,
        w: 1,
        wt: 5,
        wtr: 6,
        htr: 6,
        rInner: -3,
        hhh: 8,
    }) 
    const dataUnit4 = createDataUnit({ 
        r: 16,
        cone: 15,
        w: 1.5,
        wt: 8,
        wtr: 6,
        htr: 6,
        rInner: -3,
        hhh: 8,
    }) 




    const v = new Float32Array(dataUnit1.v)
    const c =  new Float32Array(dataUnit2.c)

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(v, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( c, 3 ))
    geometry.computeVertexNormals()


    const mat = root.materials.unit
    const mesh = new THREE.Object3D()
    const star = new THREE.Mesh(geometry, mat)
    mesh.add(star)
    const s1 = createS(root, { mKey: 'testWhite' })
    mesh.add(s1) 
    const s2 = createS(root, { mKey: 'testWhite' })
    mesh.add(s2) 
    const s3 = createS(root, { mKey: 'testWhite' })
    mesh.add(s3) 

    const s4 = createS(root, { r: 50, s: .5 })
    mesh.add(s4) 

    let phase = 0
    let phaseMesh = 0
    let mode = 'idle'
    let strength = 0
    const spd = 0.05
    let starQSaved = new THREE.Quaternion()
    let meshQSaved = new THREE.Quaternion()
    const q0 = new THREE.Quaternion()


    let arr1 = dataUnit1.v
    let arr2 = dataUnit2.v 

    let isRotate = true

    return { 
        mesh,
        update: () => {

            phaseMesh += 0.05
            s1.rotation.y = - phaseMesh * 2
            s2.rotation.x = - phaseMesh * 2
            s3.rotation.z= - phaseMesh * 2 
            s4.rotation.y = phaseMesh / 4
            mesh.rotation.y = phaseMesh / 5

            if (mode === 'idle') {
                const t = Math.sin(phase)

                phase += 0.05
                if (isRotate) {
                    star.rotation.y = phase / 2
                    star.rotation.x = phase / 1.33
                    star.rotation.z = phase / 1.88
                }

                for (let i = 0; i < dataUnit1.v.length; ++i) {
                    geometry.attributes.position.array[i] = arr1[i] * (1 - t) + arr2[i] * t
                }
                star.geometry.attributes.position.needsUpdate = true
            }

            if (mode === 'toDialog') {
                strength += spd
                if (strength > 1) strength = 1
                star.quaternion.slerpQuaternions(starQSaved, q0, strength)
                for (let i = 0; i < dataUnit1.v.length; ++i) {
                    geometry.attributes.position.array[i] = arr1[i] * (1 - strength) + arr2[i] * strength
                }
                star.geometry.attributes.position.needsUpdate = true
                if (strength === 1) {
                    isRotate = false
                    mode = 'idle'
                    phase = 0
                    arr1 = dataUnit3.v
                    arr2 = dataUnit4.v
                }
            }

            if (mode === 'fromDialog') {
                strength += spd
                if (strength > 1) strength = 1
                for (let i = 0; i < dataUnit1.v.length; ++i) {
                    geometry.attributes.position.array[i] = arr1[i] * (1 - strength) + arr2[i] * strength
                }
                star.geometry.attributes.position.needsUpdate = true
                if (strength === 1) {
                    mode = 'idle'
                    phase = 0
                    arr1 = dataUnit1.v
                    arr2 = dataUnit2.v
                    isRotate = true
                }
            }


        },
        prepareDialog: () => {
            // mode = 'toDialog'
            // arr1 = [...geometry.attributes.position.array]
            // arr2 = dataUnit3.v
            // strength = 0
            // meshQSaved.copy(mesh.quaternion)
            // starQSaved.copy(star.quaternion)
        },
        exitDialog: () => {
            // mode = 'fromDialog'
            // arr1 = [...geometry.attributes.position.array]
            // arr2 = dataUnit1.v
            // strength = 0
        }
    }
}
