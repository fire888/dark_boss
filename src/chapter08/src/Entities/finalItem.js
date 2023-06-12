import * as THREE from 'three'
import { createElemFinal } from './Structure03/geometries/geomElemFinal'
import { createGeomFromBuffer } from './Structure03/geometries/createBufferGeom'
//import { translateArr } from "../helpers/geomHelpers";



export const createFinalItem = (root) => {
    const { structureMaterial, basicMat, matNotFog, matNotFogOuter } = root.materials

    const v = []
    const v2 = []
    const c = []
    const u = []
    const col = []

    {
        const elem = createElemFinal({})
        v.push(...elem.v)
        v2.push(...elem.v2)
        c.push(...elem.c)
        u.push(...elem.u)
        col.push(...elem.col)
    }

    const viewGeom = createGeomFromBuffer({ v, c, u })
    const mesh = new THREE.Mesh(viewGeom, matNotFog)
    //root.studio.addToScene(mesh)

    const viewGeom2 = createGeomFromBuffer({ v: v2 })
    const meshOuter = new THREE.Mesh(viewGeom2, matNotFogOuter)
    mesh.add(meshOuter)

    return {
        mesh,
        objectForCheck: mesh,
    }
}
