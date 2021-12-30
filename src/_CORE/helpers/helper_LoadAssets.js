import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader'




const createLoaders = () => {
    let objLoader = null,
        textureLoader = null,
        gltfLoader = null,
        cubeTextureLoader = null

    const getterLoader = type => {
        if (type === 'obj')
            return objLoader = (objLoader || new OBJLoader())
        if (type === 'glb' || type === 'gltf')
            return gltfLoader = (gltfLoader || new GLTFLoader())
        if (type === 'img')
            return textureLoader = (textureLoader || new THREE.TextureLoader())
        if (type === 'cubeTextures') {
            return cubeTextureLoader = (cubeTextureLoader || new THREE.CubeTextureLoader())
        }

    }

    return (path, type) => new Promise(resolve => {
        getterLoader(type).load(path, resolve)
    })
}




export class LoaderAssets {

    constructor () {
        this.resources = {}
        this._load = createLoaders()
    }

    loadAssets (data) {
        return new Promise(resolve => {

            const load = this._load
            const resources = this.resources

            async function iterate (index) {
                if (data[index]) {
                    const { key, path, type } = data[index]
                    resources[key] = await load(path, type)
                }

                ++index
                !data[index]
                    ? resolve(resources)
                    : await iterate(index)
            }

           void iterate(0)
        })
    }
}
