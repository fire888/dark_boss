import * as THREE from 'three'
import { translateArr } from "./geometry/helpers";
import { createDataArcWindow } from './geometryWall/dataArcWindow'
import { createWallScheme } from './schemes/schemeWall';

export const createMeshWall = (root) => {
    const mesh = new THREE.Object3D()


    const dataWall = createWallScheme()

    const v = []
    const c = []
    const u2 = []


    for (let i = 0; i < dataWall.length; ++i) {
        const dataArc = createDataArcWindow(dataWall[i])
        v.push(...dataArc.v)
        c.push(...dataArc.c)
    }

    translateArr(v, -5 * 105, 0, 0 )


    const vertices = new Float32Array(v)
    const colors =  new Float32Array(c)
    //const uv2 = new Float32Array(u2)

    /** mesh main */
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    //g.setAttribute('uv2', new THREE.BufferAttribute(uv2, 2))
    g.computeVertexNormals()
    const wallMat = root.materials.wallVirtualColor
    const wallMesh = new THREE.Mesh(g, wallMat)

    mesh.add(wallMesh)


    return { mesh }
}


//c2.push(...dataLine.c2)

//const geomL = new THREE.BufferGeometry().setFromPoints([p1, p2]);
//const line = new THREE.Line( geomL, material );
//mesh.add( line );

//const copy = new THREE.Mesh(mesh.geometry, mesh.m)
//copy.position.x = x
//copy.position.y = y
//mesh.add(copy)
//
// const material = new THREE.LineBasicMaterial({
//     color: 0x0000ff
// });