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
    //offsetFromFloor: 5.0,
    offsetFromFloor: 7.0,
    offsetFromFloorFactor: .5,
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


export const BRIDGE_START_STATE =
{time: 3000,count: 34,twist: 3.141592653589793,strengthTwist: 1,radius: 0,height: 0,rotate: 3.05840734641021,width: 0,floor: 0,x: 0,y: 0,z: 58,}
// states bridge for debugging
//{time: '3000', count: 60,twist: 11.6840734641021,strengthTwist: 1,radius: 10,height: 78,rotate: 0.858407346410207,width: 0,floor: 0,x: 0,y: -15,z: 0,}
//{time: '3000', count: 100, twist: 1.53407346410207, strengthTwist: 0, radius: 100, height: 2, rotate: 0, width: 10, floor: 17, x: 0, y: 0, z: 0,}
//{time: 1000, count: 100, twist: 0,strengthTwist: 0,radius: 85,height: -73,rotate: PI * 2 + 0.25,width: 12,floor: 30,x: 0,y: 67,z: 0,}
//{time: 3000, count: 100, twist: -2.81592653589793, strengthTwist: 1, radius: 96, height: 0, rotate: -0.341592653589793, width: 8, floor: 18, x: 0, y: 65, z: 0, }
//{ time: 3000,count: 100, twist: 13.7340734641021, strengthTwist: 0.351, radius: 126, height: 52, rotate: -2.84159265358979, width: 10, floor: 17, x: 42, y: 69, z: 0, }
//{ time: 3000,count: 100, twist: -7.21592653589793, strengthTwist: 1, radius: 114, height: 40, rotate: 1.25840734641021, width: 10, floor: 17, x: 0, y: 113, z: 0, }
//{ time: 1500,count: 192, twist: -18.3159265358979, strengthTwist: 1, radius: 40, height: 98, rotate: 0, width: 9, floor: 16.2, x: 8, y: 146, z: 73, }
//{ time: 1000,count: 100, twist: 3.14, strengthTwist: 0.424, radius: 200, height: 40, rotate: 0.6584, width: 7, floor: 90, x: -75, y: 240, z: -10, }

export const PROGRAMS = {
    'PROGRAM_NONE': [
        { time: 1000,count: 148, twist: 12.4340734641021, strengthTwist: 0.84, radius: 24, height: 40, rotate: -0.041592653589793, width: 0, floor: 0, x: 0, y: 0, z: 0, },
        { time: 3000,count: 148, twist: 12.4340734641021, strengthTwist: 0.84, radius: -34, height: 40, rotate: -20, width: 5, floor: 0, x: 0, y: 0, z: 0, },
        { time: 3000,count: 70, twist: 20.4340734641021, strengthTwist: 0.84, radius: -40, height: 80, rotate: -40, width: 5, floor: 12, x: 0, y: -20, z: 0, },
        { time: 3000,count: 50, twist: 12, strengthTwist: -0.84, radius: -5, height: -40, rotate: -40, width: 5, floor: 12, x: 0, y: 20, z: 0, },
        { time: 3000,count: 70, twist: 12, strengthTwist: -0.84, radius: 20, height: -40, rotate: -20, width: 10, floor: 12, x: 0, y: 20, z: 0, },
        { time: 3000,count: 100, twist: 20, strengthTwist: 1, radius: 20, height: 40, rotate: 0, width: 5, floor: 0, x: 10, y: 20, z: 0, },
        { time: 3000,count: 148, twist: 20, strengthTwist: 1, radius: 20, height: 80, rotate: 20, width: 0, floor: 0, x: 0, y: -20, z: 0, },
        {time: 20,count: 34,twist: 3.141592653589793,strengthTwist: 1,radius: 0,height: 0,rotate: 3.05840734641021,width: 0,floor: 0,x: 0,y: 0,z: 58,}
    ],
    'PROGRAM_Z': [
        {time: 1500,count: 100,twist: 15.141592653589793,strengthTwist: 1,radius: 50, height: -70, rotate: -10, width: 5, floor: 0,x: 0, y: 30, z: 28,},
        {time: 3000,count: 100,twist: -15.141592653589793,strengthTwist: 1,radius: 20, height: 70, rotate: 3.05, width: 5, floor: 0,x: 0, y: -30, z: 58,},
        {time: 1500,count: 34,twist: 3.141592653589793,strengthTwist: 0,radius: 48,height: 70,rotate: 3.05840734641021,width: 20,floor: 0,x: 0,y: -60,z: 58,}
    ],
    'PROGRAM_00': [
        {time: 700, count: 60, twist: 14.1340734641021, strengthTwist: 1, radius: 30, height: 78, rotate: -Math.PI, width: 7, floor: 0, x: 0, y: -15, z: 0,},
        {time: 700, count: 172, twist: 14.1340734641021, strengthTwist: 0.383, radius: 40, height: 78, rotate: 0.858407346410207, width: 7, floor: 13.3, x: 0, y: -15, z: 0,},
        {time: 2000, count: 172, twist: -18.1659265358979, strengthTwist: 0.486, radius: 40, height: 62, rotate: -Math.PI, width: 7, floor: 20, x: 0, y: -15, z: 0,},
        {time: 3000, count: 300, twist: -18.1659265358979, strengthTwist: 0.922, radius: 64, height: 30, rotate: 0.858407346410207, width: 4, floor: 5.3, x: 0, y: 40, z: 0,},
        {time: 3000, count: 100, twist: 1.53407346410207, strengthTwist: 0, radius: 110, height: 2, rotate: 0, width: 10, floor: 17, x: 0, y: 0, z: 0,},
        {time: 1000, count: 100, twist: 1.53407346410207, strengthTwist: 0, radius: 110, height: 2, rotate: 0, width: 7, floor: 25, x: 0, y: 0, z: 0,},
    ],
    'PROGRAM_01': [
        {time: 3000, count: 160, twist: -10,strengthTwist: 1,radius: 22,height: -40,rotate: PI,width: 3,floor: 17,x: 0,y: 70,z: 0,},
        {time: 3000, count: 100, twist: 0,strengthTwist: 0,radius: 60,height: -78,rotate: PI * 1.5,width: 30,floor: 5,x: 0,y: 70,z: 0,},
        {time: 1000, count: 100, twist: 0,strengthTwist: 0,radius: 85,height: -73,rotate: PI * 2 + 0.25,width: 12,floor: 10,x: 0,y: 67,z: 0,},
        {time: 1000, count: 100, twist: 0,strengthTwist: 0,radius: 85,height: -73,rotate: PI * 2 + 0.25,width: 7,floor: 30,x: 0,y: 67,z: 0,},
    ],
    'PROGRAM_02': [
        {time: 3000, count: 50, twist: -4, strengthTwist: 1, radius: 7, height: 80, rotate: 1.5, width: 5, floor: 7, x: 0, y: 65, z: 0, },    
        {time: 3000, count: 70, twist: 6, strengthTwist: 1, radius: 40, height: -80, rotate: -1.5, width: 8, floor: 7, x: 0, y: 110, z: 0, },    
        {time: 1500, count: 100, twist: -2.81592653589793, strengthTwist: 1, radius: 96, height: 0, rotate: -0.341592653589793, width: 15, floor: 7, x: 0, y: 65, z: 0, },
        {time: 1000, count: 100, twist: -2.81592653589793, strengthTwist: 1, radius: 96, height: 0, rotate: -0.341592653589793, width: 7, floor: 30, x: 0, y: 65, z: 0, },
    ],
    'PROGRAM_03': [
        { time: 3000,count: 300, twist: 13, strengthTwist: 1, radius: 30, height: 52, rotate: 7, width: 7, floor: 5, x: 0, y: 69, z: 0, },
        { time: 1000,count: 300, twist: 13, strengthTwist: 1, radius: -30, height: 52, rotate: 7, width: 7, floor: 5, x: 0, y: 69, z: 0, },
        { time: 3000,count: 300, twist: -13, strengthTwist: 1, radius: 10, height: 52, rotate: 7, width: 5, floor: 5, x: 0, y: 69, z: 0, },
        { time: 3000,count: 100, twist: 13.7340734641021, strengthTwist: 0.351, radius: 126, height: 52, rotate: -2.84159265358979, width: 10, floor: 17, x: 42, y: 69, z: 0, },
        { time: 1000,count: 300, twist: 13.7340734641021, strengthTwist: 0.351, radius: 126, height: 52, rotate: -2.84159265358979, width: 7, floor: 30, x: 42, y: 69, z: 0, },
    ],
    'PROGRAM_04': [
        { time: 1000,count: 300, twist: 13.7340734641021, strengthTwist: 0, radius: 126, height: 0, rotate: -2.84159265358979, width: 7, floor: 30, x: 42, y: 70, z: 0, },
        { time: 3000,count: 300, twist: 13, strengthTwist: 1, radius: 30, height: 52, rotate: 7, width: 7, floor: 5, x: 0, y: 90, z: 0, },
        { time: 1000,count: 300, twist: 13, strengthTwist: 1, radius: -30, height: 52, rotate: 7, width: 7, floor: 5, x: 0, y: 90, z: 0, },
        { time: 3000,count: 300, twist: -13, strengthTwist: 1, radius: 10, height: 52, rotate: 7, width: 5, floor: 5, x: 0, y: 90, z: 0, },
        { time: 3000,count: 100, twist: -7.21592653589793, strengthTwist: 1, radius: 90, height: 40, rotate: 1.25840734641021, width: 10, floor: 17, x: 0, y: 113, z: 0, },
        { time: 1000,count: 100, twist: -7.21592653589793, strengthTwist: 1, radius: 114, height: 40, rotate: 1.25840734641021, width: 10, floor: 17, x: 0, y: 113, z: 0, },
    ],
    'PROGRAM_05': [
        { time: 1500,count: 200, twist: -5, strengthTwist: 1, radius: 10, height: 7, rotate: PI, width: 9, floor: 30, x: 0, y: 133, z: 0, },
        { time: 3000,count: 70, twist: -10, strengthTwist: 1, radius: 30, height: -98, rotate: -5 * PI, width: 5, floor: 0, x: 0, y: 240, z: 0, },
        { time: 3000,count: 50, twist: -10, strengthTwist: 1, radius: -60, height: 98, rotate: -PI, width: -9, floor: 19.2, x: 0, y: 146, z: 0, },
        { time: 1500,count: 192, twist: -18.3159265358979, strengthTwist: 1, radius: 40, height: 98, rotate: 0, width: 9, floor: 16.2, x: 8, y: 146, z: 73, },
    ],
    'PROGRAM_06': [
        { time: 1500,count: 192, twist: -12, strengthTwist: 1, radius: 20, height: 70, rotate: 5, width: 3, floor: 3, x: -75, y: 200, z: 0, },
        { time: 3000,count: 100, twist: 3.14, strengthTwist: 0.424, radius: 200, height: 40, rotate: 0.6584, width: 20, floor: 7, x: -75, y: 240, z: -10, },
        { time: 1000,count: 100, twist: 3.14, strengthTwist: 0.424, radius: 200, height: 40, rotate: 0.6584, width: 7, floor: 90, x: -75, y: 240, z: -10, },
    ],
    'PROGRAM_LAST': [
        {time: 3000, count: 300, twist: 10,strengthTwist: 1, radius: 80,height: 190,rotate: -5,width: 10,floor: 11.5,x: -40,y: 249,z: -30,},
        {time: 3000, count: 200, twist: 31.38, strengthTwist: 1,radius: 24,height: 190,rotate: 0.158407346410207,width: 10,floor: 11.5,x: -20,y: 249,z: -192,},
        {time: 3000, count: 600, twist: 31.38, strengthTwist: 1,radius: -130,height: 190,rotate: -20,width: 10,floor: 20,x: -20,y: 239,z: -192,},
        {time: 3000, count: 200, twist: 6, strengthTwist: 2,radius: -60,height: 190,rotate: -30,width: 10,floor: 20,x: -20,y: 29,z: -182,},
        {time: 3000, count: 200, twist: -16, strengthTwist: 1,radius: -50,height: 190,rotate: -40,width: 10,floor: 0,x: -20,y: 249,z: -182,},
        {time: 1500, count: 200, twist: -30, strengthTwist: 1,radius: -40,height: 190,rotate: -50,width: 0,floor: 0,x: -20,y: 249,z: -192,},
    ],
}