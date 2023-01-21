import * as THREE from "three";



export const COLOR1_1 = [1, 1, 1]
export const COLOR1_6 = [...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1, ...COLOR1_1]   
export const COLOR2_1 = [.5, 1, 0]
export const COLOR2_6 = [...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1, ...COLOR2_1]
export const COLOR3_1 = [1, 1, 0]
export const COLOR3_6 = [...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1, ...COLOR3_1]



export const MATERIALS_CONF = {
    // 'unit': {
    //     mat: 'MeshPhongMaterial',
    //     props: {
    //         color: 0xffffff,
    //         emissive: 0x000000,
    //         reflectivity: 5,
    //         shininess: 5,
    //         vertexColors: true,
    //         flatShading: false,
    //         side: THREE.DoubleSide,
    //     },
    // },
    // 'wallVirtual': {
    //     mat: 'MeshStandardMaterial',
    //     props: {
    //         color: 0xff00ff,
    //         emissive: 0x000000,
    //     },
    // },
    // 'wallVirtualColor': {
    //     mat: 'MeshStandardMaterial',
    //     props: {
    //         color: 0xffffff,
    //         emissive: 0x000000,
    //         //map: 'mapParams',
    //         //bumpMap: 'mapParams',
    //         //bumpScale: .1,
    //         flatShading: false,
    //         specular: 0xffffff,
    //         vertexColors: true,
    //     },
    // },
    // 'body': {
    //     mat: 'MeshPhongMaterial',
    //     props: {
    //         color: 0xaaaaff,
    //         emissive: 0x000000,
    //         map: 'mapBody',
    //         bumpMap: 'mapBody',
    //         bumpScale: .1,
    //         reflectivity: .005,
    //         shininess: .005,
    //         specular: 0xffffff,
    //     },
    // },
    // 'body_sh': {
    //     mat: 'MeshPhongMaterial',
    //     props: {
    //         color: 0x000000,
    //         emissive: 0x000000,
    //         transparent: true,
    //         alphaMap: 'mapBodySh',
    //     },
    // },
    'iron': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xcccccc,
            //map: 'mapTop',
            //map: '',
            //bumpMap: 'ironHeight',
            lightMap: 'ironAO',
            lightMapIntensity: .35,
            normalMap: 'ironNormal',
            //normalScale: new THREE.Vector2(1, 1),
            //normalScale: new THREE.Vector2(.5, .5),
            normalScale: new THREE.Vector2(.1, .1),
            //normalScale: new THREE.Vector2(.3, .3),
            //specularMap: 'ironAlbedo',
            //bumpScale: 0,
            envMap: 'skyBox3',
            reflectivity: .02,
            shininess: 100,
            specular: 0x020201,
            vertexColors: true,
            //wireframe: true,
        },
    },
    'floorMat1': {
        mat: 'MeshPhongMaterial',
        props: {
            color: 0xffffff,
            map: 'mapTop',
            bumpMap: 'mapTop',
            bumpScale: 2,
            envMap: 'skyBox',
            reflectivity: 0.1,
            shininess: .01,
            specular: 0xffffff,
            emissive: 0x555555,
        },
    },
}