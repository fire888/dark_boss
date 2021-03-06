export const CONFIG_FOR_INIT = {
    isInCar: false,
    currentSceneConfig: {
        isInVirtual: false,
        isPlayerInCar: false,
        carProps: {
            keyMesh: 'car',
            keyCollide: 'carCollision',
            position: [0, -50, -100],
            rotation: [0, 2, 0],
        },
        bodyProps: {
            keyMesh: 'body',
            position: [-20, -60, -50],
            rotation: [0, 2, 0],
        },
    },
}




export const MATERIALS_CONFIG = {
    'wall': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0x338877,
            emissive: 0x9997777,
            map: 'mapFloorOuter',
            bumpMap: 'mapFloorOuter',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.3,
            shininess: 60,
            specular: 0x222222,
        },
    },

    'wallVirtual': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0x333333,
            emissive: 0x999999,
            map: 'mapVirtual',
            bumpMap: 'mapVirtual',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.3,
            shininess: 60,
            specular: 0x222222,
        },
    },



    'groundTop': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xaa6666,
            emissive: 0xaa6666,
            map: 'mapTop',
            bumpMap: 'mapTop',
            bumpScale: 1,
            envMap: 'skyBox2',
            reflectivity: 0.5,
            specular: 0x222222,
        },
    },

    'road': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x666666,
            map: 'mapFloorOuter2',
            bumpMap: 'mapFloorOuter2',
            bumpScale: 1,
            envMap: 'skyBox',
            reflectivity: 0.3,
        },
    },

    'skin': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x555555,
            specular: 0xffffff,
            shininess: 12,
            bumpMap: 'skin',
            bumpScale: 0.8,
            envMap: 'skyBox',
            reflectivity: 0.5,
            map: 'skin',
            skinning: true,
        },        
    }
}



export const START_ENV_CONFIG = { fogNear: -10, fogFar: 20, color: 0x4a0a45, backgroundImgKey: 'skyBox2' }
export const START_ENV_CONFIG_2 = { fogNear: -10, fogFar: 0, color: 0x4a0a45, backgroundImgKey: 'skyBox2' }
export const START_ENV_CONFIG_3 = { fogNear: 20, fogFar: 1500, color: 0x334455, backgroundImgKey: 'skyBox2' }
export const START_ENV_CONFIG_4 = { fogNear: -10, fogFar: 0, color: 0x4a0a45, backgroundImgKey: null }


export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xa5ecc5,
        strength: 0.8,
    },
    sceneEnvironment: { fogNear: -20, fogFar: 0, color: 0x4a0a45, backgroundImgKey: 'skyBox2' },
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
        color: 0x555555,
        strength: 0,
        pos: [0, 400, 5],
    },
}
