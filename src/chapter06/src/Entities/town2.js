import { createWall } from './geometryRoom/geomWall'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr, createFace} from "./geometry/helpers";
import { createMeshFromBuffer } from '../helpers/createBufferMesh'
import { createTown2Scheme } from './town2shemeRooms'

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
const gr1 = [0, 0, 0]
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

    /** ROOMS MESHES */
    for (let i = 0; i < arrWallsPrepared.length; ++i) {
        const dataRoom = createWall(arrWallsPrepared[i], root)
        v.push(...dataRoom.v)
        c.push(...dataRoom.c)
    }

    /** DOORS MESH **/
    for (let key in doors) {
        const door = createDoorData(root, root.assets['walls'].children[1], doors[key].l, doors[key].keyMode || null)
        rotateArrY(door.v,  doors[key].angle)
        translateArr(door.v, doors[key].p0[0], y0, doors[key].p0[1])

        v.push(...door.v)
        c.push(...door.c)
    }


    /** OUTER WALLS MESH */
    for (let i = 0; i < arrOuterWalls.length; ++i) {
        const wall = createOuterWall(arrOuterWalls[i], root.assets['walls'].children[2])
        v.push(...wall.v)
        c.push(...wall.c)
    }

    /** floor */
    for (let i = 0; i < floors.length; ++i) {
        v.push(
            ...createFace(
                [floors[i].p0[0], y0, floors[i].p0[1]],
                [floors[i].p1[0], y0, floors[i].p1[1]],
                [floors[i].p2[0], y0, floors[i].p2[1]],
                [floors[i].p3[0], y0, floors[i].p3[1]],
            )
        )
        c.push(...gr6)
    }

    const h = 26.5
    for (let i = 0; i < floors.length; ++i) {
        v.push(
            ...createFace(
                [floors[i].p3[0], h, floors[i].p3[1]],
                [floors[i].p2[0], h, floors[i].p2[1]],
                [floors[i].p1[0], h, floors[i].p1[1]],
                [floors[i].p0[0], h, floors[i].p0[1]],
            )
        )
        c.push(...white6)
    }

    const mesh = createMeshFromBuffer({ v, c })
    root.studio.addToScene(mesh)


    return {
    //    mesh
    }
}