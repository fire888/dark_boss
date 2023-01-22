import { createWall } from './geometryRoom/geomWall'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr, createFace} from "../helpers/geomHelpers";
import { createMeshFromBuffer } from '../helpers/createBufferMesh'
import { createTown2Scheme } from './town2shemeRooms'
import { createFloor } from './geometryRoom/geometryFloor'
import * as THREE from 'three' 

const y0 = -61
const white1 = [1, 1, 1]
const white6 = [
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
]
const gr1 = [1, 0, 0]
const gr6 = [
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
]



export const createTown2 = (root) => {
    const {
        arrOuterWalls,
        doors,
        arrWallsPrepared,
        floors,
    } = createTown2Scheme()

    const v = []
    const c = []
    const b = []
    const u = []

    /** ROOMS MESHES */
    for (let i = 0; i < arrWallsPrepared.length; ++i) {
        const dataWall = createWall(arrWallsPrepared[i], root)
        v.push(...dataWall.v)
        c.push(...dataWall.c)
        b.push(...dataWall.b)
        u.push(...dataWall.u)
    }

    /** DOORS MESH **/
    for (let key in doors) {
        const door = createDoorData(root, null, doors[key].l, doors[key].keyMode || null)
        rotateArrY(door.v,  doors[key].angle)
        translateArr(door.v, doors[key].p0[0], y0, doors[key].p0[1])
        v.push(...door.v)

        rotateArrY(door.b,  doors[key].angle)
        translateArr(door.b, doors[key].p0[0], y0, doors[key].p0[1])
        b.push(...door.b)

        u.push(...door.u)
        c.push(...door.c)
    }


    /** OUTER WALLS MESH */
    for (let i = 0; i < arrOuterWalls.length; ++i) {
        const wall = createOuterWall(arrOuterWalls[i], null)
        v.push(...wall.v)
        c.push(...wall.c)
        b.push(...wall.b)
        u.push(...wall.u)
    }

    /** floor */
    for (let i = 0; i < floors.length; ++i) {
        const f = createFloor(floors[i])
        v.push(...f.v)
        c.push(...f.c)
        u.push(...f.u)
    }

    /** ceil */
    const h = 30
    for (let i = 0; i < floors.length; ++i) {
        const data = floors[i]
        const lX = (data.p1[0]) - (data.p0[0])
        const lZ = (data.p2[1]) - (data.p1[1]) 
    
        const nX = Math.ceil(Math.abs(lX / 100))
        const nZ = Math.ceil(Math.abs(lZ / 100))
    
        const stepX = lX / nX
        const stepZ = lZ / nZ
    
        for (let i = 0; i < nX; ++i) {
            for (let j = 0; j < nZ; ++j) {
                v.push(
                    ...createFace(
                        [data.p0[0] + i * stepX,          h,     data.p2[1] - (j) * stepZ],
                        [data.p0[0] + (i + 1) * stepX,    h,     data.p2[1] - (j) * stepZ],
                        [data.p0[0] + (i + 1) * stepX,    h,     data.p2[1] - (j + 1) * stepZ],
                        [data.p0[0] + i * stepX,          h,     data.p2[1] - (j + 1) * stepZ],
                    )
                )
                c.push(...white6)
                u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)
            }
        }
    }

    console.log(root)

    const mesh = createMeshFromBuffer({ 
        v, 
        c, 
        u, 
        mat: root.materials.iron
    })
    root.studio.addToScene(mesh)

    const mCollision = createMeshFromBuffer({ v: b })
    mCollision.visible = false
    root.studio.addToScene(mCollision)


    return {
        mesh,
        mCollision,
    }
}