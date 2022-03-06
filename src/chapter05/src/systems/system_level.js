import * as THREE from 'three'
import { Car } from '../Entities/Car'




export class Level {
    constructor(root) {
        this._root = root

        const {
            assets, 
            materials,
            CONSTANTS,
            system_PlayerNearLevelItems,
            car,
        } = root

        const { levelReal, levelVirtual } = createLevelMeshes(assets, materials)
        root.assets.level = { levelReal, levelVirtual }

        system_PlayerNearLevelItems.setItemToCheck(car.getModel(), 'nearStarterDrawCar', 28)
    }


    prepareNormalLevel () {
        const { 
            studio, 
            assets,
            CONSTANTS,
            system_PlayerMoveOnLevel,
            system_PlayerNearLevelItems,
            car,
        } = this._root

        const { bodyProps } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig

        for (let i = 0; i < assets.level.levelVirtual.length; ++i) {
            const item = assets.level.levelVirtual[i]
            studio.removeFromScene(item)
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(item)
        }


        for (let i = 0; i < assets.level.levelReal.length; ++i) {
            const item = assets.level.levelReal[i]
            studio.addToScene(item)
            system_PlayerMoveOnLevel.addItemToPlayerCollision(item)
        }

        studio.addToScene(car.getModel())
        system_PlayerMoveOnLevel.addItemToPlayerCollision(car.getCollision())

        this._addToLevel(bodyProps)
    }


    prepareVirtualLevel () {
        const {
            studio,
            assets,
            materials,
            CONSTANTS,
            system_PlayerMoveOnLevel,
            car,
        } = this._root

        for (let i = 0; i < assets.level.levelReal.length; ++i) {
            const item = assets.level.levelReal[i]
            studio.removeFromScene(item)
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(item)
        }

        const { bodyProps } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig
        this._removeFromLevel(bodyProps)


        studio.addToScene(car.getModel())
        system_PlayerMoveOnLevel.addItemToPlayerCollision(car.getCollision())


        for (let i = 0; i < assets.level.levelVirtual.length; ++i) {
            const item = assets.level.levelVirtual[i]
            studio.addToScene(item)
            system_PlayerMoveOnLevel.addItemToPlayerCollision(item)
        }
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


    _removeFromLevel (props) {
        const { keyMesh, keyCollide, position, rotation } = props

        if (!keyMesh || !this._root.assets[keyMesh]) {
            return;
        }

        this._root.studio.removeFromScene(this._root.assets[keyMesh])

        if (keyCollide && this._root.assets[keyCollide]) {
            this._root.studio.removeFromScene(this._root.assets[keyCollide])
            this._root.system_PlayerMoveOnLevel.removeItemFromCollision(this._root.assets[keyCollide].children[0])
        }
    }
}




const createLevelMeshes = (assets, materials) => {
    const levelReal = []
    const levelVirtual = []

    assets['level-rooms'].traverse(child => {
        let mesh = null
        
        if (child.name.includes("level")) {
            if (child.name === 'level_000_000') {
                mesh = new THREE.Mesh(child.geometry, materials.wall)
                levelReal.push(mesh)
            }

            if (child.name === 'level_001_000') {
                mesh = new THREE.Mesh(child.geometry, materials.wallVirtual)
                levelVirtual.push(mesh)
            }
        }
    })


    return {
        levelReal,
        levelVirtual,
    }
}
