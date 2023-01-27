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
        //mat: 'MeshStandardMaterial',
        props: {
            color: 0xcccccc,
            //map: 'mapTop',
            //map: '',
            //bumpMap: 'ironHeight',
            lightMap: 'ironAO',
            lightMapIntensity: .35,

            //aoMap: 'ironAO',
            //aoMap: 'ironAlbedo',
            //aoMapIntensity: 5,

            normalMap: 'ironNormal',
            normalScale: new THREE.Vector2(.1, .1),

            //specularMap: 'ironAlbedo',

            //bumpScale: 0,
            envMap: 'skyBox3',
            reflectivity: .02,
            shininess: 100,
            specular: 0x020201,
            vertexColors: true,
            //wireframe: true,
            //metalnessMap: 'ironAlbedo',
            //roughnessMap: 'ironAlbedo',
        },
    },
    'floorMat1': {
        mat: 'MeshPhongMaterial',
        //mat: 'MeshStandardMaterial',
        props: {
            color: 0xffffff,
            map: 'mapTop',
            bumpMap: 'mapTop',
            bumpScale: 2,
            //envMap: 'skyBox3',
            reflectivity: 0.1,
            shininess: .01,
            specular: 0xffffff,
            emissive: 0x555555,
            //metalnessMap: 'ironAlbedo',
            //roughnessMap: 'ironAlbedo',
        },
    },
    'testBlack': {
        mat: 'MeshBasicMaterial',
        props: {
            color: 0xffffff,
            vertexColors: true,
            //side: THREE.DoubleSide,
        },
    }
}