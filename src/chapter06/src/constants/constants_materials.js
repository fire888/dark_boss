import * as THREE from "three";



export const COLOR1_1 = [1, 1, 1]
export const COLOR1_6 = [...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1]   
export const COLOR2_1 = [.5, 1, 0]
export const COLOR2_6 = [...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1]
export const COLOR3_1 = [1, 1, 0]
export const COLOR3_6 = [...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1]



export const MATERIALS_CONF = {
    'iron': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xcccccc,
            lightMap: 'ironAO',
            lightMapIntensity: .35,
            normalMap: 'ironNormal',
            normalScale: new THREE.Vector2(.1, .1),
            envMap: 'skyBox3',
            reflectivity: .02,
            shininess: 100,
            specular: 0x020201,
            vertexColors: true,
        },
    },
    'iron2': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xff0000,
            lightMap: 'ironAO',
            lightMapIntensity: .35,
            normalMap: 'ironNormal',
            normalScale: new THREE.Vector2(.1, .1),
            envMap: 'skyBox3',
            reflectivity: .02,
            shininess: 100,
            specular: 0x020201,
            vertexColors: true,
        },
    },
    'floorMat1': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            map: 'mapTop',
            bumpMap: 'mapTop',
            bumpScale: 2,
            reflectivity: 0.1,
            shininess: .01,
            specular: 0xffffff,
            emissive: 0x555555,
        },
    },
    'body': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            envMap: 'skyBox3',
            reflectivity: 3,
            specular: 0xffffff,
        },
    },
    'bodyRed': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xaa0000,
            envMap: 'skyBox3',
            emissive: 0x770000,
            reflectivity: .01,
            specular: 0xff0000,
        },
    },
    'bodyShadow': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0x222230,
            transparent: true,
            alphaMap: 'bodyDropShadow',
            opacity: 1,
        },
    },
    'whiteBasic': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xffffff,
            //vertexColors: true,
        }
    },
    'whiteBasic2': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xaaaaaa,
        }
    },
}