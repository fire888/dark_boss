import * as THREE from 'three'
import {
    translateArr,
    rotateArr,
} from './geometry/helpers'
import { createScheme } from './geometry/schemeGallery'
import { createSegmentGallery } from './geometry/segmentGallery'



export const createMeshGallery = (root) => {



    const arrV = []
    const arrC = []
    const arrUV = []
    const coll = []
    const carColl = []

    const scheme = createScheme()

    for (let i = 0; i < scheme.length; ++i) {
        const { id, x, z, angle, h0, h1, h2, arc, isTopElem, isColumn } = scheme[i]

        let { v, c, u, collision, collisionCar } = createSegmentGallery({ h0, h1, h2, arc, isTopElem, isColumn })

        rotateArr(v, angle)
        translateArr(v, x, 0, z, angle)

        if (collision) {
            rotateArr(collision, angle)
            translateArr(collision, x, 0, z)
            coll.push(...collision)
        }

        if (collisionCar) {
            rotateArr(collisionCar, angle)
            translateArr(collisionCar, x, 0, z)
            carColl.push(...collisionCar)
        }


        arrV.push(...v)
        arrC.push(...c)
        arrUV.push(...u)
    }


    const vertices = new Float32Array(arrV)
    const colors =  new Float32Array(arrC)
    const uv = new Float32Array(arrUV)

    /** mesh main */
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute( colors, 3 ))
    uv && geometry.setAttribute('uv', new THREE.BufferAttribute( uv, 2 ))
    geometry.computeVertexNormals()
    const mat = root.materials.wallVirtualColor
    const mesh = new THREE.Mesh(geometry, mat)

    /** mesh collision */
    const verticesColl = new Float32Array(coll)
    const geometryColl = new THREE.BufferGeometry()
    geometryColl.setAttribute('position', new THREE.BufferAttribute(verticesColl, 3))
    const meshCollision = new THREE.Mesh(geometryColl, root.materials.testRed)

    /** mesh carCollision */
    const verticesCollCar = new Float32Array(carColl)
    const geometryCollCar = new THREE.BufferGeometry()
    geometryCollCar.setAttribute('position', new THREE.BufferAttribute(verticesCollCar, 3))
    const meshCollisionCar = new THREE.Mesh(geometryCollCar, root.materials.testRed)

    return { mesh, meshCollision, meshCollisionCar };
}