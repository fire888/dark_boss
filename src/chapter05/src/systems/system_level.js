import * as THREE from 'three'
import { Car } from '../Entities/Car'




export class Level {
    constructor(root) {
        this._root = root

        const { 
            studio, 
            assets, 
            materials,
            CONSTANTS,
        } = root

        console.log(CONSTANTS.CONFIG_FOR_INIT)

        const { allMeshes, areas } = createLevelMeshes(assets, materials)
        root.assets.areas = areas

        this._car = new Car(root)
    }


    prepareNormalLevel () {
        const { 
            studio, 
            assets, 
            materials,
            CONSTANTS,
            system_PlayerMoveOnLevel
        } = this._root

        const { carProps, bodyProps, isInVirtual, isPlayerInCar, } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig

        studio.addToScene(this._car.getModel())
        studio.addToScene(this._car.getCollision())
        system_PlayerMoveOnLevel.addItemToPlayerCollision(this._car.getCollision())
        studio.addToScene(this._car.getStart())
        system_PlayerMoveOnLevel.addItemToPlayerCollision(this._car.getStart())

        this._addToLevel(bodyProps)
    }


    _addToLevel (props) {
        const { keyMesh, keyCollide, position, rotation } = props

        if (!keyMesh || !this._root.assets[keyMesh]) {
            return;
        }

        this._root.studio.addToScene(this._root.assets[keyMesh])
        this._root.assets[keyMesh].position.fromArray(position)
        this._root.assets[keyMesh].rotation.fromArray(rotation)

        if (keyCollide && this._root.assets[keyCollide]) {
            this._root.assets[keyCollide].visible = false
            this._root.assets[keyCollide].position.fromArray(position)
            this._root.assets[keyCollide].rotation.fromArray(rotation)

            this._root.studio.addToScene(this._root.assets[keyCollide])
            this._root.system_PlayerMoveOnLevel.addItemToPlayerCollision(this._root.assets[keyCollide].children[0])
        }
    }
}




const createLevelMeshes = (assets, materials) => {
    const allMeshes = {}
    const areas = {}

    assets['level-rooms'].traverse(child => {
        let mesh = null
        
        if (child.name.includes("level")) {
            if (child.name === 'level_020_001') {
                mesh = new THREE.Mesh(child.geometry, materials.groundTop)
            } else {
                mesh = new THREE.Mesh(child.geometry, materials.wall)
            }
            mesh.name = child.name
            allMeshes[child.name] = mesh
        }

        if (child.name.includes("roadwall")) {
            mesh = new THREE.Mesh(child.geometry, materials.road)
            mesh.name = child.name
            mesh.userData['isWallWalking'] = true
            allMeshes[child.name] = mesh
        }


        if (child.name.includes("level") || child.name.includes("roadwall")) {
            const strArr = child.name.split('_')

            if (strArr[1] && mesh) {
                if (!areas[+strArr[1]]) {
                    areas[+strArr[1]] = [] 
                }
                mesh.userData.area = +strArr[1]
                areas[+strArr[1]].push(mesh)   
            }
        }

    })


    return {
        allMeshes,
        areas
    }
}
