import * as THREE from 'three'
import { createElemCylinder } from './Structure03/geometries/geomElemCylinder'
import { createGeomFromBuffer } from './Structure03/geometries/createBufferGeom'
import { translateArr } from "../helpers/geomHelpers";


export const createFuel = (root) => {
    const { structureMaterial, basicMat } = root.materials

    const v = []
    const c = []
    const u = []
    const col = []

    {
        const elem = createElemCylinder({
            h: 12,
            color: [1, 1, 0],
        })
        v.push(...elem.v)
        c.push(...elem.c)
        u.push(...elem.u)
        col.push(...elem.col)
    }

    const viewGeom = createGeomFromBuffer({ v, c, u })
    const mesh = new THREE.Mesh(viewGeom, structureMaterial)
    //root.studio.addToScene(mesh)

    return {
        mesh,
        objectForCheck: mesh,
    }
}
