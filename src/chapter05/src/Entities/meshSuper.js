import * as THREE from 'three'

import { createSegmentStair } from './geometry/segmentStair'
import { createDataZone } from './geometry/dataZone'
import { createDataBridge } from './geometry/dataBridge'
//import { createSchemeStairs } from './geometry/schemeStairs'
import { createSchemeSuper } from './geometry/schemeSuper'




export const createMeshSuper = (root) => {
    const scheme = createSchemeSuper()


    const vertP = []
    const colorsP = []
    const uvTopP = []
    const coll = []
    const collisionCarA = []


    for (let i = 0; i < scheme.length; ++i) {
        if (scheme[i].type === 'stairs') {
            const { v, c, u, collision, collisionCar } = createSegmentStair(scheme[i], [1, 1, 1], [0, .7, 0],)
            vertP.push(...v)
            colorsP.push(...c)
            uvTopP.push(...u)
            coll.push(...collision)
            if (collisionCar) {
                collisionCarA.push(...collisionCar)
            }
        }
        if (scheme[i].type === 'zone') {
            const { v, c, u, collision } = createDataZone(scheme[i], [1, 1, 1], [0, .7, 0],)
            vertP.push(...v)
            colorsP.push(...c)
            uvTopP.push(...u)
            coll.push(...collision)
        }
        if (scheme[i].type === 'bridge') {
            const { v, c, u, collision, collisionCar } = createDataBridge(scheme[i], [1, 1, 1], [0, .7, 0],)
            for (let i = 0; i < v.length; ++i) vertP.push(v[i])
            for (let i = 0; i < c.length; ++i) colorsP.push(c[i])
            for (let i = 0; i < u.length; ++i) uvTopP.push(u[i])
            for (let i = 0; i < collision.length; ++i) coll.push(collision[i])
            if (collisionCar) {
                for (let i = 0; i < collisionCar.length; ++i) collisionCarA.push(collisionCar[i])
            }
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

    const verticesCar = new Float32Array(collisionCarA)
    const geometryCollCar = new THREE.BufferGeometry();
    geometryCollCar.setAttribute('position', new THREE.BufferAttribute(verticesCar, 3))
    const meshCollisionCar = new THREE.Mesh(geometryCollCar, collMat)

    /** finish coord */
    let lastXYZ
    for (let i = scheme.length - 1; i > -1; --i) {
        if (scheme[i].type && scheme[i].type === 'stairs') {
            lastXYZ = [scheme[i].x, scheme[i].h, scheme[i].z]
            break;
        }
    }
    const meshFinish = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.MeshBasicMaterial({ color: 0xFF00FF })
    )
    meshFinish.position.set(
        lastXYZ[0],
        lastXYZ[1],
        lastXYZ[2],
    )


    return { mesh, meshCollision, meshCollisionCar, meshFinish, lastXYZ }
}
