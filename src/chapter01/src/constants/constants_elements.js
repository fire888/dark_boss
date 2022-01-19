const PI = Math.PI
const hPI = PI / 2


export const CURRENT_CHAPTER = 0

export const MATERIALS_CONFIG = {
    'easyMaterial': {
        mat: 'MeshBasicMaterial',
        props: {},
    },

    'wall': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x000000,
            map: 'wallTexture',
            bumpMap: 'mapFloorOuter',    
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.5,
            specular: 0x222222,
        },
    },

    'door': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x000000,
            map: 'doorTexture',
            bumpMap: 'doorTexture',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.5,
            specular: 0x222222,
        },
    },

    'bot': {
        mat: 'MeshPhongMaterial',
        props: { 
            color: 0xa7b4b2,
            map: 'monster-skin',
            emissive: 0x191c38,
            bumpMap: 'monster-skin',
            bumpScale: 0.2,
            shininess: 500,
            specular: 0xffffff,
            skinning: true,
        }, 
    }
}


export const END_ENV = { fogNear: -10, fogFar: 0, color: 0x0e2535, backgroundImgKey: null }
export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xccccff,
        strength: 0.6,
    },
    clearColor: 0x0e2535,
    sceneEnvironment: {
        fogNear: 10,
        fogFar: 80,
        color: 0x0e2535, 
        backgroundImgKey: null, 
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
    //startPos: [-42.580326256838035, 22.917001342773393, 143.03375162223674 ],
    startPos: [48, 28, 10],
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

export const BOT = {
    offsetWallCollision: 5,
}

export const BOTS = [
    {
        name: 'guard_01',
        pos: [-53, 26.316999435, 27],
        rot: 0,
        keyWallToWalkCollisions: 'collision_bot_guardsmall',
    },
    {
        name: 'guard_Super_02',
        pos: [-39, 45.317001, -112],
        rot: 0,
        keyWallToWalkCollisions: 'collision_bot_guardsuper',
    },
    {
        name: 'master',
        pos: [-91, 26.316999435, 35],
        rot: hPI - 1,
        keyWallToWalkCollisions: 'collision_bot_lab',
    },
    {
        name: 'scientist',
        pos: [31, 64.3152008, -48],
        rot: hPI,
        keyWallToWalkCollisions: 'collision_bot_sciensist',
    },
    {
        name: 'engineer',
        pos: [-1, 25.31520, -69],
        rot: PI,
        keyWallToWalkCollisions: 'collision_bot_engeneer',
    },
    {
        name: 'programmer',
        pos: [25, 64.3152008, -4],
        rot: 0,
        keyWallToWalkCollisions: 'collision_bot_programmer', 
    },
    {
        name: 'mechanic',
        pos: [11, 25.31520, -8],
        rot: hPI,
        keyWallToWalkCollisions: 'collision_bot_start', 
    },
    {
        name: 'scout',
        pos: [-49, 26.316999435, 172],
        rot: hPI,
        keyWallToWalkCollisions: 'collision_bot_scout',
    }
]

