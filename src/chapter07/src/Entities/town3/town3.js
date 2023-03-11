import { createMeshFromBuffer } from '../../helpers/createBufferMesh'
import { createTown3Scheme } from './town3Sheme'
import * as THREE from 'three'
import { wall_00_easy } from './geom/wall_00_easy'
import { createMaterials } from './materials'




export const createTown3 = (root) => {
    const {
        walls,
    } = createTown3Scheme()

    const m = createMaterials(root)


    const materials = [
        //root.materials.iron2,
        m.shaderMaterial,
        root.materials.iron,
        root.materials.whiteBasic,
    ]

    console.log(walls)

    const vM00 = []
    const ind00 = []

    const vM01 = []
    const ind01 = []

    const vM02 = []
    const ind02 = []


    for (let i = 0; i < walls.length; ++i) {

        const data = wall_00_easy(walls[i])

        vM00.push(...data.vM00)
        const start0 = (ind00[ind00.length - 1] + 1) || 0
        for (let i = 0; i < data.ind00.length; ++i) {
            ind00.push(start0 + data.ind00[i])
        }


        vM01.push(...data.vM01)
        const start1 = (ind01[ind01.length - 1] + 1) || 0
        for (let i = 0; i < data.ind01.length; ++i) {
            ind01.push(start1 + data.ind01[i])
        }

        vM02.push(...data.vM02)
        const start2 = (ind02[ind02.length - 1] + 1) || 0
        for (let i = 0; i < data.ind02.length; ++i) {
            ind02.push(start2 + data.ind02[i])
        }

    }


    const ind = [...ind00]
    const start1 = ind[ind.length - 1] + 1
    for (let i = 0; i < ind01.length; ++i) {
        ind.push(start1 + ind01[i])
    }

    const start2 = ind[ind.length - 1] + 1
    for (let i = 0; i < ind02.length; ++i) {
        ind.push(start2 + ind02[i])
    }


    const l0 = ind00.length
    const l1 = ind01.length
    const l2 = ind02.length
    const v = [...vM00, ...vM01, ...vM02]



    const vertices = new Float32Array(v)
    const g = new THREE.BufferGeometry()

    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setIndex(ind);
    g.computeVertexNormals()
    g.addGroup(0, l0, 0)
    g.addGroup(l0, l1, 1)
    g.addGroup(l0 + l1, l2, 2)


    const mesh = new THREE.Mesh(g, materials)
    mesh.position.set(0, -20, -200)
    root.studio.addToScene(mesh)


    console.log(mesh)


    return {
        mesh,
    }
}