import { i } from "mathjs"

import { Color } from 'three'

export const W = 160
export const H = 80
export const SIZE_X = 7
export const SIZE_Y = 15
export const SIZE_Z = 7
export const COLOR_00 = [1, .3, 1]

const c = new Color(0x926192)
console.log(c.r + ', ' + c.g + ', ' + c.b)

export const STRUCTURES = [
    /** start center hole */
    {
        ENV_COLOR: new Color(0.6, 0, 0),
        FOG: { color: 0x440000, near: 150, far: 1000, time: 2000 },
        COLOR_00: [1, .3, 1],
        SIZE_X: 5,
        SIZE_Y: 7,
        SIZE_Z: 5,
        X: -320,
        Y: -270,
        Z: -170,
        mapFill: [
            { tile: 'empty', place: [3, 4, 2] },
            { tile: 'empty', place: [3, 3, 2] },
            { tile: 'empty', place: [3, 2, 2] },
            { tile: 'empty', place: [3, 1, 2] },
            { tile: 'empty', place: [3, 0, 2] },
        ],
    },

    /** center hole */
    {
        ENV_COLOR: new Color(0.7, 0.8, 0.7),
        FOG: { color: 0x005555, near: 150, far: 700, time: 2000 },
        COLOR_00: [0.5725490196078431, 0.3803921568627451, 0.5725490196078431],
        SIZE_X: 5,
        SIZE_Y: 7,
        SIZE_Z: 5,
        X: -320,
        Y: -270,
        Z: -170,
        mapFill: [
            { tile: 'empty', place: [3, 4, 2] },
            { tile: 'empty', place: [3, 3, 2] },
            { tile: 'empty', place: [3, 2, 2] },
            { tile: 'empty', place: [3, 1, 2] },
            { tile: 'empty', place: [3, 0, 2] },
        ],
    },

    /** right */
    {
        ENV_COLOR: new Color(0.05, 0.1, 0.2),
        //ENV_COLOR: new Color(0.1, 0.1, 0.3),
        FOG: { color: 0x34364c, near: 150, far: 1000, time: 2000 },
        COLOR_00: [.1, 1, .5],
        SIZE_X: 5,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: 150,
        Y: -300,
        Z: -200,
        mapFill: [],
    },

    /** left */
    {
        ENV_COLOR: new Color(0, 0, 0),
        FOG: { color: 0x000000, near: 150, far: 1000, time: 2000 },
        COLOR_00: [1, 1, 1],
        SIZE_X: 5,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: -780,
        Y: -300,
        Z: -200,
        mapFill: [],
    },




    

    {
        ENV_COLOR: new Color(0.3, 0.3, 0.0),
        FOG: { color: 0x666600, near: 150, far: 1000, time: 2000 },
        COLOR_00: [.3, 2, 1],
        SIZE_X: 6,
        SIZE_Y: 10,
        SIZE_Z: 6,
        X: -470,
        Y: -500,
        Z: -200,
        mapFill: [
            { tile: 'empty', place: [6, 5, 3] },
            { tile: 'empty', place: [6, 4, 3] },
            { tile: 'empty', place: [6, 3, 3] },
            { tile: 'empty', place: [6, 2, 3] },
            { tile: 'empty', place: [6, 1, 3] },
            { tile: 'empty', place: [6, 0, 3] },
        ],
    },




    {
        ENV_COLOR: new Color(0.3, 0, 0.2),
        FOG: { color: 0x30020, near: 150, far: 1000, time: 2000 },
        COLOR_00: [.7, .8, .2],
        SIZE_X: 8,
        SIZE_Y: 8,
        SIZE_Z: 8,
        X: - 500,
        Y: 0,
        Z: 0,
        mapFill: [
            //{ tile: 'empty', place: [5, 6, 3] },
            //{ tile: 'empty', place: [5, 5, 3] },
            //{ tile: 'empty', place: [5, 4, 3] },
            { tile: 'empty', place: [5, 3, 3] },
            { tile: 'empty', place: [5, 2, 3] },
            { tile: 'empty', place: [5, 1, 3] },
            { tile: 'empty', place: [5, 0, 3] },

            //{ tile: 'empty', place: [6, 6, 3] },
            //{ tile: 'empty', place: [6, 5, 3] },
           // { tile: 'empty', place: [6, 4, 3] },
            { tile: 'empty', place: [6, 3, 3] },
            { tile: 'empty', place: [6, 2, 3] },
            { tile: 'empty', place: [6, 1, 3] },
            { tile: 'empty', place: [6, 0, 3] },
        ],
    },

    {

        ENV_COLOR: new Color(0.5, 0.5, 0.7),
        FOG: { color: 0x880800, near: 150, far: 1000, time: 2000 },
        COLOR_00: [.6, .7, .2],
        SIZE_X: 5,
        SIZE_Y: 17,
        SIZE_Z: 5,
        X: - 500,
        Y: 0,
        Z: 0,
        mapFill: [
            //{ tile: 'empty', place: [5, 6, 3] },
            //{ tile: 'empty', place: [5, 5, 3] },
            { tile: 'empty', place: [5, 4, 3] },
            { tile: 'empty', place: [5, 3, 3] },
            { tile: 'empty', place: [5, 2, 3] },
            { tile: 'empty', place: [5, 1, 3] },
            { tile: 'empty', place: [5, 0, 3] },

            //{ tile: 'empty', place: [6, 6, 3] },
            //{ tile: 'empty', place: [6, 5, 3] },
            { tile: 'empty', place: [6, 4, 3] },
            { tile: 'empty', place: [6, 3, 3] },
            { tile: 'empty', place: [6, 2, 3] },
            { tile: 'empty', place: [6, 1, 3] },
            { tile: 'empty', place: [6, 0, 3] },
        ],
    },
]


//export const FOG_CONF = { color: 0x440000, near: 150, far: 1000, time: 2000 }
//export const FOG_CONF_02 = { color: 0x990000, near: 150, far: 1000, time: 2000 }



export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xffffff,
        strength: 0.1,
    },
    composerAddPass: 'Saturate',
    //composerAddPass: 'Saturate2',
}




export const playerConfig = {
    speed: 0.8,
    speedRot: 0.02,
    speedDown: -0.45,
    offsetFromFloor: 10.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    //startPos: [0, -45, 400],
    startPos: [0, -45, 150],
    cameraData: {
        fov: 90,
        ratio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10000,
        pos: [0, 2, -0.5],
    },
    frontObjPos: [0, 0, -1],
    backObjPos: [0, 0, 1],
   lightDataOne: {
        // color: 0x888888,
        // strength: 1,
        // dist: 0,
        // decay: .001,
        // pos: [0, 10, 0],
        color: 0x555555,
        strength: 1,
        dist: 0,
        decay: .001,
        pos: [0, 10, 0],
    },
}
