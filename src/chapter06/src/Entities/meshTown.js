import * as THREE from "three";
import { createDataGeomTownSegment } from './geometryWall/dataGeomTownSegment'
import { createSchemeTown } from './schemes/schemeTown'


export const createMeshTown = root => {
    const schemeTown = createSchemeTown()
    const mesh = new THREE.Object3D()

    const v = []
    const c = []
    const u2 = []


    for (let i = 0; i < schemeTown.length; ++i) {
        const dataSegment = createDataGeomTownSegment(schemeTown[i])
        v.push(...dataSegment.v)
        c.push(...dataSegment.c)
    }


    const vertices = new Float32Array(v)
    //const colors =  new Float32Array(c)
    //const uv2 = new Float32Array(u2)

    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    //g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    //g.setAttribute('uv2', new THREE.BufferAttribute(uv2, 2))
    g.computeVertexNormals()
    const wallMat = root.materials.wallVirtualColor
    const wallMesh = new THREE.Mesh(g, wallMat)

    mesh.add(wallMesh)


    return { mesh }
}