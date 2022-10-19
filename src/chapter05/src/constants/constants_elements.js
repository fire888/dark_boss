import * as THREE from 'three'
export const SIZE_QUADRANT = 5000
export const LOCATIONS_QUADRANTS = {
    //'-4_-1': 'location01',
    '0_0': 'location01',
    '0_-3': 'location02',
    '3_-1': 'location03',
}







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



export const lCol = [.3, 1, .3]
export const lW = .2 

export const MATERIALS_CONFIG = {
    'unit': {
        mat: 'MeshPhongMaterial',
        //mat: 'MeshBasicMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x444444,
            reflectivity: .5,
            shininess: .5,
            vertexColors: true,
            flatShading: false,
        },
    },
    'wallVirtual': {
        mat: 'MeshStandardMaterial',
        props: {
            //color: 0xffd4a8,
            color: 0xff00ff,
            //color: 0x999999,
            emissive: 0x000000,
            //map: 'mapVirtual',
            //bumpMap: 'mapVirtual',
            //bumpScale: 3,
            //envMap: 'skyBox',
            //reflectivity: .5,
            //shininess: .5,
            //specular: 0xffffff,
        },
    },
    'wallVirtualColor': {
        //mat: 'MeshPhongMaterial',
        mat: 'MeshBasicMaterial',
        props: {
            //color: 0xffd4a8,
            color: 0xffffff,
            //color: 0x999999,
            emissive: 0x001111,
            map: 'mapParams',
            bumpMap: 'mapParams',
            bumpScale: .1,
            //envMap: 'skyBox',
            //reflectivity: .5,
            //shininess: .5,
            specular: 0x0000ff,
            vertexColors: true,
        },
    },

    'car': {
        mat: 'MeshPhongMaterial',
        props: {
            //color: 0xffd4a8,
            color: 0x0000ff,
            //color: 0x999999,
            emissive: 0x000000,
            //map: 'mapVirtual',
            //bumpMap: 'mapVirtual',
            //bumpScale: 3,
            ///envMap: 'skyBox',
            reflectivity: .5,
            shininess: .5,
            specular: 0xffffff,
        },
    },

    'floorMat': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0x00ff00,
            //color: 0x999999,
            //emissive: 0x000000,
            map: 'mapVirtual2',
            bumpMap: 'mapVirtual2',
            bumpScale: 3,
            //envMap: 'skyBox2',
            //reflectivity: .5,
            //shininess: .5,
            //specular: 0xffffff,
        },
    },

    'testWhite': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xffff55,
        },
    },

    'testRed': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xff0000,
        },
    },


    'testGreen': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0x00aa00,
        },
    },
    'testGreen1': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0x009900,
            //side: THREE.DoubleSide,
        },
    },
    'testBlack': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0x000000,
            side: THREE.DoubleSide,
        },
    },

}



export const START_ENV_CONFIG = { fogNear: 1000, fogFar: 3000, color: 0x000000, backgroundImgKey: 'skyBox' }
//export const START_ENV_CONFIG_2 = { fogNear: -10, fogFar: 0, color: 0x4a0a45, backgroundImgKey: 'skyBox2' }
//export const START_ENV_CONFIG_3 = { fogNear: 20, fogFar: 1500, color: 0x334455, backgroundImgKey: 'skyBox2' }
//export const START_ENV_CONFIG_4 = { fogNear: -10, fogFar: 0, color: 0x4a0a45, backgroundImgKey: null }

//export const START_ENV_CONFIG = { fogNear: -10, fogFar: 20, color: 0xffd4a8, backgroundImgKey: 'skyBox' }
//export const START_ENV_CONFIG = { fogNear: 20, fogFar: 1500, color: 0x888888, backgroundImgKey: 'skyBox' }
//export const START_ENV_CONFIG_2 = { fogNear: -10, fogFar: 0, color: 0x888888, backgroundImgKey: 'skyBox' }
//export const START_ENV_CONFIG_3 = { fogNear: 20, fogFar: 1500, color: 0x888888, backgroundImgKey: 'skyBox' }
//export const START_ENV_CONFIG_4 = { fogNear: -10, fogFar: 0, color: 0x888888, backgroundImgKey: null }

export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    amb: {
        color: 0xffffff,
        strength: 1,
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
    startRot: [0, 0, 0],
    startPos: [0, 5, 0],
    cameraData: {
        fov: 90,
        ratio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10000,
        pos: [0, 2, -0.5],
    },
    frontObjPos: [0, 0, -1],
    backObjPos: [0, 0, 1],
    // lightDataOne: {
    //     color: 0xffffff,
    //     strength: .5,
    //     pos: [0, 0, 0],
    // },
}
