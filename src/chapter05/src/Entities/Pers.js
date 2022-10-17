import * as THREE from 'three'
import { createDataUnit } from './geometry/dataUnit'


export const createMeshUnit = (root) => {

    const dataUnit1 = createDataUnit({ 
        r: 15,
        cone: 12,
        w: 2,
        wt: 3,
        wtr: 5,
        rInner: -5,
        hhh: 8,
    })
    const dataUnit2 = createDataUnit({ 
        cone: 20,
        r: 13,
        w: .5,
        wt: .7, 
        wtr: 2,
        rInner: -5, 
        hhh: 12,
        hh: 12,
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
    const mesh = new THREE.Mesh(geometry, mat)

    console.log(geometry)

    return { 
        mesh,
        update: () => {
            phase += 0.05
            const t = Math.sin(phase)
            //mesh.rotation.x = (t * Math.PI) / 2
            //mesh.rotation.z = (t * Math.PI) / 3
            mesh.rotation.y = phase / 2
            mesh.rotation.x = phase / 5
            for (let i = 0; i < dataUnit1.v.length; ++i) {
                geometry.attributes.position.array[i] = dataUnit1.v[i] * (1 - t) + dataUnit2.v[i] * t
                
            }
            mesh.geometry.attributes.position.needsUpdate = true
        }  
    }
}
