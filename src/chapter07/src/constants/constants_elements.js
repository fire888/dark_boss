import { Color } from 'three'
import {
    STRUCTURE_TWO_HOUSES,
    STRUCTURE_L,
} from './const_structures'
export const W = 160
export const H = 80
export const SIZE_X = 7
export const SIZE_Y = 15
export const SIZE_Z = 7
export const COLOR_00 = [1, .3, 1]

//const c = new Color(0xffcc4c)
//console.log(c.r + ', ' + c.g + ', ' + c.b)

export const STRUCTURES = [
    /** start center hole */
    {
        ENV_COLOR: new Color(0.6, 0, 0),
        FOG: { color: 0x440000, near: 150, far: 1000, time: 2000 },
        COLOR_00: [1, .3, 1],
        mat: 'structureMaterial',
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

    STRUCTURE_L,
    STRUCTURE_TWO_HOUSES,


    /** light inverted */
    {
        ENV_COLOR: new Color(.8, .8, .8),
        FOG: { color: 0x888888, near: 150, far: 400, time: 2000 },
        COLOR_00: [1, 1, 1],
        mat: 'structureMaterialInv',
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


    /** light */
    {
        ENV_COLOR: new Color(0.5725490196078431, 0.5529411764705883, 0.396078431372549),
        FOG: { color: 0x2f2922, near: 150, far: 700, time: 2000 },
        COLOR_00: [0.9686274509803922, 0.9490196078431372, 0.8196078431372549],
        mat: 'structureMaterial',
        SIZE_X: 5,
        SIZE_Y: 17,
        SIZE_Z: 5,
        X: -480,
        Y: -430,
        Z: -170,
        mapFill: [
            { tile: 'empty', place: [5, 4, 3] },
            { tile: 'empty', place: [5, 3, 3] },
            { tile: 'empty', place: [5, 2, 3] },
            { tile: 'empty', place: [5, 1, 3] },
            { tile: 'empty', place: [5, 0, 3] },
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


    /** right */
    {
        ENV_COLOR: new Color(0.05, 0.1, 0.2),
        //ENV_COLOR: new Color(0.1, 0.1, 0.3),
        FOG: { color: 0x34364c, near: 150, far: 1000, time: 2000 },
        COLOR_00: [.1, 1, .5],
        mat: 'structureMaterialInv',
        SIZE_X: 5,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: 150,
        Y: -300,
        Z: -200,
        mapFill: [],
    },
    
    /** inverted */
    {
        ENV_COLOR: new Color(0, 0, 0),
        FOG: { color: 0x2f2922, near: 150, far: 700, time: 2000 },
        COLOR_00: [1, 1, 1],
        mat: 'structureMaterialInv',
        SIZE_X: 7,
        SIZE_Y: 10,
        SIZE_Z: 5,
        X: -480,
        Y: -250,
        Z: -170,
        mapFill: [
            { tile: 'empty', place: [3, 4, 3] },
            { tile: 'empty', place: [3, 3, 3] },
            { tile: 'empty', place: [3, 2, 3] },
            { tile: 'empty', place: [3, 1, 3] },
            { tile: 'empty', place: [3, 0, 3] },
        ],
    },
]



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
