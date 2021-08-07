import { MATERIALS_CONFIG } from '../constants/constants_elements'
import * as THREE from 'three'


export class PrepareMeshes {
    constructor (gameContext) {
        const { assets } = gameContext


        this.materials = createMaterials(assets)
        this.rooms = {}
        this.allMeshes = {}

        gameContext.assets.collisionsBotsRooms = {}

        assets['level-rooms'].traverse(child => {
            if (child.name.includes("room_")) {
                const mesh = new THREE.Mesh(child.geometry, this.materials.wall)
                this.rooms[child.name] = mesh
                mesh.name = child.name
                this.allMeshes[child.name] = mesh
            }
            if (child.name.includes("collision_")) {
                const mesh = new THREE.Mesh(child.geometry)
                assets.collisionsBotsRooms[child.name] = mesh
                mesh.name = child.name
                this.allMeshes[child.name] = mesh
            }
            if (child.name.includes("outer_walls")) {
                const mesh = new THREE.Mesh(child.geometry, this.materials.wall)
                mesh.name = child.name
                this.allMeshes[child.name] = mesh
            }
            if (child.name.includes("outer_road")) {
                const mesh = new THREE.Mesh(child.geometry, this.materials.green)
                mesh.name = child.name
                this.allMeshes[child.name] = mesh
            }
            if (child.name.includes("outer_floor")) {
                const mesh = new THREE.Mesh(child.geometry, this.materials.road)
                mesh.name = child.name
                this.allMeshes[child.name] = mesh
            }
        })
    }
}



const createMaterials = assets => {
    for (let key in assets) 
        assets[key].wrapS && (assets[key].wrapS = assets[key].wrapT = THREE.RepeatWrapping)

    const mapsKeys = ['bumpMap', 'envMap', 'map', 'normalMap', 'lightMap', 'aoMap']
    const materials = {}
    for (let key in MATERIALS_CONFIG) {
        materials[key] = new THREE[MATERIALS_CONFIG[key].mat]({
            ...MATERIALS_CONFIG[key].props
        })
        mapsKeys.map(keyMap =>
            MATERIALS_CONFIG[key].props[keyMap] &&
                (materials[key][keyMap] = assets[MATERIALS_CONFIG[key].props[keyMap]])
        )
    }
    return materials
}
