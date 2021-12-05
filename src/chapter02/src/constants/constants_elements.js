import * as THREE from 'three'
const PI = Math.PI
const hPI = PI / 2


export const CURRENT_CHAPTER = 1

export const MATERIALS_CONFIG = {
    'wall': {
        mat: 'MeshPhongMaterial',
        props: {
            side: THREE.DoubleSide,
            color: '#00c7ea',
            emissive: '#6205b0',
            bumpScale: 0.2,
            shininess: 100,
        },
    },
}


export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xffffff,
        strength: 0.8,
    },
    clearColor: 0x0e2535,
    sceneEnvironment: {
        fogNear: 40,
        fogFar: 300,
        color: 0x0e2535, 
        backgroundImgKey: 'envTexture',
    },
}


export const playerConfig = {
    //speed: 0.35,
    speed: 0.8,
    speedRot: 0.02,
    speedDown: -0.45,
    offsetFromFloor: 5.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    startRot: [0, 0, 0],
    startPos: [0, 0, 190],
    cameraData: {
        fov: 90,
        ratio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        pos: [0, 2, -0.5],
    },
    frontObjPos: [0, 0, -1],
    backObjPos: [0, 0, 1],
    lightDataOne: {
        color: 0xccccff, 
        strength: 0.3,
        pos: [0, 50, 0],
    },
}

const R = 100
export const PLATFORMS_CONFIG = [
    { r: R, angle: PI + 0.1, y: -5, w1: 70, w2: 40, h: 7, },
    { r: R, angle: 0, y: 61, w1: 70, w2: 40, h: 7, },
    { r: R, angle: PI - 0.1, y: 61, w1: 70, w2: 40, h: 7, },
    { r: R + 20, angle: PI/2, y: 112, w1: 70, w2: 40, h: 7, },
    { r: R + 20, angle: 0.35, y: 145, w1: 70, w2: 40, h: 7, },
    { r: R + 20, angle: 0.35 - 0.2, y: 237, w1: 70, w2: 40, h: 7, },
]


export const TERMINALS_CONFIG = [
    { terminalKey: 'TERMINAL_Z01', r: 20, angle: PI - 0.3, y: -57, angleZ: PI / 2, angleY: 0.1 },
    { terminalKey: 'TERMINAL_Z', r: 50, angle: PI, y: -57, },
    { terminalKey: 'TERMINAL_00', r: R + 20, angle: 0, y: 2, },
    { terminalKey: 'TERMINAL_01', r: R - 5, angle: PI + 0.3, y: 1, },
    { terminalKey: 'TERMINAL_02', r: R - 5, angle: -0.2, y: 67, },
    { terminalKey: 'TERMINAL_03', r: R - 5, angle: PI - 0.2, y: 67, },
    { terminalKey: 'TERMINAL_04', r: R + 10, angle: PI/2 - 0.2, y: 118, },
    { terminalKey: 'TERMINAL_05', r: R + 10, angle: 0.25, y: 151, },
    { terminalKey: 'TERMINAL_06', r: R + 10, angle: 0.1, y: 243, },
]
export const LAST_TERMINAL_CONFIG = { terminalKey: 'TERMINAL_LAST', r: 350, angle: PI + 0.5, y: 277 }

