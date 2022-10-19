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
    let phase = 0
    const fillL = [...dataUnit1.v]

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

    return { 
        mesh,
        update: () => {
            phase += 0.05
            const t = Math.sin(phase)
            s1.rotation.y = - phase * 2
            s2.rotation.x = - phase * 2
            s3.rotation.z= - phase * 2 
            s4.rotation.y = phase / 4
            star.rotation.y = phase / 2
            star.rotation.x = phase / 1.33
            star.rotation.z = phase / 1.88

            //mesh.rotation.x = phase / 5
            for (let i = 0; i < dataUnit1.v.length; ++i) {
                geometry.attributes.position.array[i] = dataUnit1.v[i] * (1 - t) + dataUnit2.v[i] * t
                
            }
            star.geometry.attributes.position.needsUpdate = true
        }  
    }
}
