import * as THREE from 'three'

import { createSegmentStair } from './geometry/segmentStair'
import { createDataZone } from './geometry/dataZone'
import { createDataBridge } from './geometry/dataBridge'
//import { createSchemeStairs } from './geometry/schemeStairs'
import { createSchemeSuper } from './geometry/schemeSuper'




export const createMeshSuper = (root) => {
    const scheme = createSchemeSuper()

    console.log(scheme[scheme.length - 1])

    const vertP = []
    const colorsP = []
    const uvTopP = []
    const coll = []


    for (let i = 0; i < scheme.length; ++i) {
        if (scheme[i].type === 'stairs') {
            const { v, c, u, collision } = createSegmentStair(scheme[i], [1, 1, 1], [0, .7, 0],)
            vertP.push(...v)
            colorsP.push(...c)
            uvTopP.push(...u)
            coll.push(...collision)
        }
        if (scheme[i].type === 'zone') {
            const { v, c, u, collision } = createDataZone(scheme[i], [1, 1, 1], [0, .7, 0],)
            vertP.push(...v)
            colorsP.push(...c)
            uvTopP.push(...u)
            coll.push(...collision)
        }
        if (scheme[i].type === 'bridge') {
            const { v, c, u, collision } = createDataBridge(scheme[i], [1, 1, 1], [0, .7, 0],)
            vertP.push(...v)
            colorsP.push(...c)
            uvTopP.push(...u)
            coll.push(...collision) 
        }
    }
    /** triangle fix bug collision */
    coll.push(-50, 1000, 0, 0, 1000, 0, 0, 1000, -50)



    const vertices = new Float32Array(vertP)
    const colors =  new Float32Array(colorsP)
    const uv = new Float32Array(uvTopP)
    const collision = new Float32Array(coll)


    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()


    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)


    const collGeom = new THREE.BufferGeometry() 
    collGeom.setAttribute('position', new THREE.BufferAttribute(collision, 3))
    const collMat = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
    const meshCollision = new THREE.Mesh(collGeom, collMat)


    const meshFinish = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30),
        new THREE.MeshBasicMaterial({ color: 0xFF00FF })
    )
    meshFinish.position.set(
        scheme[scheme.length - 1].x,
        scheme[scheme.length - 1].h,
        scheme[scheme.length - 1].z,  
    )


    return { mesh, meshCollision, meshFinish }
}
