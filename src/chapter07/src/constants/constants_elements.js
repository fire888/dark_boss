import { MATERIALS_CONF } from "./constants_materials";

export const W = 160
export const H = 80
export const SIZE_X = 7
export const SIZE_Y = 15
export const SIZE_Z = 7
export const COLOR_00 = [1, .3, 1]

export const STRUCTURES = [
    {
        SIZE_X: 5,
        SIZE_Y: 7,
        SIZE_Z: 5,
        COLOR_00: [.3, 1, 1],
        X: -320,
        Y: -270,
        Z: -170,
        mapFill: [
           // { tile: 'empty', place: [3, 5, 2] },
            { tile: 'empty', place: [3, 4, 2] },
            { tile: 'empty', place: [3, 3, 2] },
            { tile: 'empty', place: [3, 2, 2] },
            { tile: 'empty', place: [3, 1, 2] },
            { tile: 'empty', place: [3, 0, 2] },
        ],
    },

    {
        SIZE_X: 5,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: -830,
        Y: -300,
        Z: -200,
        COLOR_00: [1, .3, 1],
        mapFill: [],
    },

    {
        SIZE_X: 5,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: 150,
        Y: -300,
        Z: -200,
        COLOR_00: [1, .3, 1],
        mapFill: [],
    },
    

    {
        SIZE_X: 6,
        SIZE_Y: 10,
        SIZE_Z: 6,
        COLOR_00: [.3, 1, 1],
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
        SIZE_X: 8,
        SIZE_Y: 8,
        SIZE_Z: 8,
        COLOR_00: [.3, 1, 1],
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
        SIZE_X: 5,
        SIZE_Y: 17,
        SIZE_Z: 5,
        COLOR_00: [.3, 1, 1],
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




export const MATERIALS_CONFIG = MATERIALS_CONF


export const ENV_START =  { fogNear: 0, fogFar: 0, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }
export const ENV_NORMAL =  { fogNear: 0, fogFar: 1000, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }
export const ENV_RED = { fogNear: 0, fogFar: 1000, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
export const ENV_RED_NEAR = { fogNear: 0, fogFar: 40, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
export const ENV_END =  { fogNear: 0, fogFar: 0, colorFog: 0x010101, colorBack: 0x010101, backgroundImgKey: null }


export const START_ENV_CONFIG = { fogNear: 0, fogFar: 0, color: 0x4a0a46, backgroundImgKey: null }
//export const ENV_CONFIG_WORD_1 = { fogNear: 100, fogFar: 500, color: 0x455861, backgroundImgKey: 'skyBox2' }
export const ENV_CONFIG_WORD_1 = { fogNear: 0, fogFar: 1000, color: 0x455861, backgroundImgKey: null }
export const ENV_CONFIG_WORD_2 = { fogNear: 1500, fogFar: 3000, color: 0x000000, backgroundImgKey: 'skyBox' }


export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xffffff,
        strength: 0.1,
    },
    sceneEnvironment: START_ENV_CONFIG,
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
