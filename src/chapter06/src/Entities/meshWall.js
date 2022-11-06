import * as THREE from 'three'
import { createDataArc  } from './geometryWall/dataArc'
import { createDataWindowTrash } from './geometryWall/dataWindowTresh'
import {translateArr} from "./geometry/helpers";


export const createMeshWall = (root) => {
    const mesh = new THREE.Object3D()

    const dataWall = []
    for (let i = 0; i < 20; ++i) {
        dataWall.push({
            x: i * 55,
            w: 50,
            wc: 2.5,
            innerH: 100 + Math.random() * 100,
            h: 250,
            isWindow: i !== 10,
        })
    }

    const v = []
    const c = []
    const u2 = []


    for (let i = 0; i < dataWall.length; ++i) {
        if (dataWall[i].isWindow) {
            const windowTrash = createDataWindowTrash({
                w: dataWall[i].w,
                h: dataWall[i].innerH,
                t: 10
            })
            translateArr(windowTrash.v, dataWall[i].x, 0, 0)
            v.push(...windowTrash.v)
            c.push(...windowTrash.c)
        }

        const arc = createDataArc({
            w: dataWall[i].w,
            t: 30,
            h1: dataWall[i].innerH - (dataWall[i].w / 2),
            wc: dataWall[i].wc,
            h2: dataWall[i].h,
        })
        translateArr(arc.v, dataWall[i].x, 0, 0)
        v.push(...arc.v)
        c.push(...arc.c)

    }





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