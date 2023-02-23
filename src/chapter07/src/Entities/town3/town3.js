import { createMeshFromBuffer } from '../../helpers/createBufferMesh'
import { createTown3Scheme } from './town3Sheme'
import * as THREE from 'three'
import { wall_00_easy } from './geom/wall_00_easy'


const materials = [
    new THREE.MeshBasicMaterial({ color: 0xFF0000, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x00FF00, side: THREE.DoubleSide  }),
    new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide  }),
]


export const createTown3 = (root) => {
    const {
        walls,
    } = createTown3Scheme()

    console.log(walls)

    const vM00 = []
    const ind00 = []

    const vM01 = []
    const ind01 = []

    const vM02 = []
    const ind02 = []


    let count = 0


    for (let i = 0; i < walls.length; ++i) {
        const data = wall_00_easy(walls[i])

        vM00.push(...data.vM00)

        const start0 = (ind00[ind00.length - 1] + 1) || 0
        for (let i = 0; i < data.ind00.length; ++i) {
            ind00.push(start0 + data.ind00[i])
        }
    }


    for (let i = 0; i < walls.length; ++i) {
         const data = wall_00_easy(walls[i])
         vM01.push(...data.vM01)

         const start = (ind01[ind01.length - 1] + 1) || 0
         for (let i = 0; i < data.ind01.length; ++i) {
             ind01.push(start + data.ind01[i])
         }
    }

    const ind = [...ind00]

    const start = ind[ind.length - 1]
    for (let i = 0; i < ind01.length; ++i) {
        ind.push(start + ind01[i])
    }


    //console.log(ind)


    const l0 = vM00.length / 3
    const l1 = vM01.length / 3
    const l2 = vM02.length / 3
    const v = [...vM00, ...vM01, ...vM02]



    const vertices = new Float32Array(v)
    const g = new THREE.BufferGeometry()

    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setIndex(ind);
    g.computeVertexNormals()
    //g.addGroup(0, l0, 0)
    //g.addGroup(l0, l1, 1)
    //g.addGroup(l0 + l1, l2, 2)


    const mesh = new THREE.Mesh(g, materials[0])
    mesh.position.set(0, -50, 200)
    root.studio.addToScene(mesh)


    return {
        mesh,
    }
}