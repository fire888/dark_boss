import * as THREE from "three";

export const MATERIALS_CONF = {
    'unit': {
        mat: 'MeshPhongMaterial',
        //mat: 'MeshBasicMaterial',
        props: {
            color: 0xffffff,
            emissive: 0x000000,
            reflectivity: 5,
            shininess: 5,
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

    'body': {
        mat: 'MeshPhongMaterial',
        props: {
            //color: 0xffd4a8,
            color: 0xaaaaff,
            //color: 0x999999,
            emissive: 0x000000,
            map: 'mapBody',
            bumpMap: 'mapBody',
            bumpScale: .1,
            //envMap: 'skyBox',
            reflectivity: .005,
            shininess: .005,
            specular: 0xffffff,
        },
    },

    'body_sh': {
        mat: 'MeshPhongMaterial',
        props: {
            //color: 0xffd4a8,
            color: 0x000000,
            //color: 0x999999,
            emissive: 0x000000,
           //map: 'mapBodySh',
           transparent: true,
           alphaMap: 'mapBodySh',
        },
    },

    'floorMat1': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xff77ff,
            //emissive: 0x000000,
            map: 'mapTop',
            bumpMap: 'mapTop',
            bumpScale: 3,
            envMap: 'skyBox2',
            reflectivity: .01,
            shininess: .01,
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

    'carNorm': {
        mat: 'MeshStandardMaterial',
        props: {
            color: 0xaa00aa,
        },
    },

    'carBattery': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xaa0000,
            transparent: true,
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