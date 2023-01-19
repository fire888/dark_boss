import { createRoom } from './geometryRoom/geomRoom'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr} from "./geometry/helpers";
import { createMeshFromBuffer } from '../helpers/createBufferMesh'
import { createTown2Scheme } from './town2shemeRooms'

const y0 = -62

export const createTown2 = (root) => {
    const {
        arrOuterWalls,
        doors,
        arrWallsPrepared,
    } = createTown2Scheme()

    const v = []
    const c = []

    /** ROOMS MESHES */
    for (let i = 0; i < arrWallsPrepared.length; ++i) {
        const dataRoom = createRoom(arrWallsPrepared[i], root)
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

    const mesh = createMeshFromBuffer({ v, c })
    root.studio.addToScene(mesh)


    return {
    //    mesh
    }
}