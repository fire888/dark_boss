import { createWall } from './geometryRoom/geomWall'
import { createDoorData } from './geometryRoom/geomDoor'
import { createOuterWall } from './geometryRoom/outerWall'
import {rotateArrY, translateArr, createFace} from "../../helpers/geomHelpers";
import { createMeshFromBuffer } from '../../helpers/createBufferMesh'
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
        roomsArr,
    } = createTown2Scheme()


    const bigRooms = []
    //console.log(roomsArr)
    for (let i = 0; i < roomsArr.length; ++i) {
        if (
            Math.abs(roomsArr[i].walls.n.p1[0] - roomsArr[i].walls.n.p0[0]) > 300 &&
            Math.abs(roomsArr[i].walls.e.p1[1] - roomsArr[i].walls.e.p0[1]) > 300
        ) {
            bigRooms.push(roomsArr[i])
            const m = new THREE.Mesh(
                new THREE.BoxGeometry(20, 20, 20),
                root.materials.whiteBasic
            )
            m.position.set(roomsArr[i].walls.n.p0[0] + 100, 100, roomsArr[i].walls.n.p0[1] + 100)
            root.studio.addToScene(m)
        }
    }
    console.log(bigRooms)



    const v = []
    const c = []
    const b = []
    const u = []

    const v2 = []
    const c2 = []
    const u2 = []

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

        v2.push(...door.v)
        c2.push(...door.c)
        u2.push(...door.u)
    }


    /** OUTER WALLS MESH */
    for (let i = 0; i < arrOuterWalls.length; ++i) {
        const wall = createOuterWall(arrOuterWalls[i], null)
        v.push(...wall.v)
        c.push(...wall.c)
        b.push(...wall.b)
        u.push(...wall.u)

        v2.push(...wall.v2)
        c2.push(...wall.c2)
        u2.push(...wall.u2)
    }

    /** floor */
    for (let i = 0; i < floors.length; ++i) {
        const f = createFloor(floors[i], white1, [0, 1, 0])
        v.push(...f.v)
        c.push(...f.c)
        u.push(...f.u)

        v2.push(...f.v)
        c2.push(...f.c2)
        u2.push(...f.u)
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
                const vertex = createFace(
                    [data.p0[0] + i * stepX,          h,     data.p2[1] - (j) * stepZ],
                    [data.p0[0] + (i + 1) * stepX,    h,     data.p2[1] - (j) * stepZ],
                    [data.p0[0] + (i + 1) * stepX,    h,     data.p2[1] - (j + 1) * stepZ],
                    [data.p0[0] + i * stepX,          h,     data.p2[1] - (j + 1) * stepZ],
                )
                v.push(...vertex)
                c.push(...white6)
                u.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1)
            }
        }
    }

    const mesh = createMeshFromBuffer({ 
        v, 
        c, 
        u, 
        mat: root.materials.iron
    })
    root.studio.addToScene(mesh)


    const meshBlack = createMeshFromBuffer({
        v: v2,
        c: c2,
        u: u2,
        mat: root.materials.iron2,
    })


    const meshCollision = createMeshFromBuffer({ v: b })
    meshCollision.visible = false
    root.studio.addToScene(meshCollision)


    return {
        mesh,
        mCollision: meshCollision,
        roomsArr,
        toNormal: () => {
            root.studio.removeFromScene(meshBlack)
            root.studio.addToScene(mesh)
        },
        toNotWalls: () => {
            root.studio.removeFromScene(mesh)
            root.studio.addToScene(meshBlack)
        },
        getCoordsForFinalBox: (x, z) => {
            let dX = 0
            let dZ = 0
            let currentR = null
            for (let i = 0; i < bigRooms.length; ++i) {
                if (
                    Math.abs(x - bigRooms[i].walls.n.p0[0]) > dX &&
                    Math.abs(z - bigRooms[i].walls.n.p0[1]) > dZ
                ) {
                    currentR = bigRooms[i]
                    dX = Math.abs(x - bigRooms[i].walls.n.p0[0])
                    dZ = Math.abs(z - bigRooms[i].walls.n.p0[1])
                }
            }

            if (currentR) {
                const m = new THREE.Mesh(
                    new THREE.BoxGeometry(20, 40, 20),
                    root.materials.whiteBasic
                )
                m.position.set(
                    currentR.walls.n.p0[0] + (currentR.walls.n.p1[0] - currentR.walls.n.p0[0]) / 2,
                    200,
                    currentR.walls.e.p0[1] + (currentR.walls.e.p1[1] - currentR.walls.e.p0[1]) / 2)
                root.studio.addToScene(m)


                return {
                    x: currentR.walls.n.p0[0] + (currentR.walls.n.p1[0] - currentR.walls.n.p0[0]) / 2,
                    z: currentR.walls.e.p0[1] + (currentR.walls.e.p1[1] - currentR.walls.e.p0[1]) / 2,
                }
            }

            return null
        }
    }
}