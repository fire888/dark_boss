

export const MATERIALS_CONFIG = {

    'iron': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x003388,
            specular: 0xffffff,
            shininess: 60,
            bumpMap: 'botMap',
            bumpScale: 0.1,
            envMap: 'ironEnv',
            reflectivity: 0.5,
            map: 'botMap',
            skinning: true,
        },
    },

    'wall': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0x004466,
            emissive: 0xffffff,
            map: 'mapFloorOuter',
            bumpMap: 'mapFloorOuter',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.5,
            specular: 0x222222,
        },
    },


    'green': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0x004466,
            emissive: 0xffffff,
            map: 'mapFloorOuter',
            bumpMap: 'mapFloorOuter',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.5,
        },        
    },

    'road': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xa1129f,
            emissive: 0xa1129f,
            map: 'mapFloorOuter',
            bumpMap: 'mapFloorOuter',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.5,
        },        
    } 
}



export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0x18257d,
        strength: 0.7,
    },
    sceneEnvironment: {
        fogNear: 20, 
        fogFar: 500, 
        color: 0x18257d,
        backgroundImgKey: null,
    },
    composerAddPass: 'Saturate',
}


export const playerConfig = {
    speed: 0.8,
    speedRot: 0.02,
    speedDown: -0.45,
    offsetFromFloor: 10.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    startRot: [0, 0, 0],
    startPos: [0, 5, 0],
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
        color: 0xffffff,
        strength: 5000,
        pos: [0, 50, 5],
    },
}
