import * as THREE from 'three'


export class Level {
    constructor(root) {
        this._root = root

        const {
            assets, 
            materials,
            CONSTANTS,
            system_PlayerNearLevelItems,
            car,
            studio,
        } = root

        const { levelReal, levelVirtual, items } = createLevelMeshes(assets, materials)
        root.assets.level = { levelReal, levelVirtual }

        this._items = items
        assets.body.material = materials.car
        assets.body.children[0].material = materials.car



        this._levelsCarCollisions = {
            'locatioin_collision_01': this._items.locatioin_collision_01,
            'locatioin_collision_02': this._items.locatioin_collision_02,
            'locatioin_collision_03': this._items.locatioin_collision_03,
        }
        console.log('this._items', this._items)


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
        studio.addToScene(this._items['location01'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(this._items['location01'])
        studio.addToScene(this._items['location02'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(this._items['location02'])
        studio.addToScene(this._items['location03'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(this._items['location03'])


        this._addToLevel(bodyProps)
    }


    prepareVirtualLevel () {
        // const {
        //     studio,
        //     assets,
        //     materials,
        //     CONSTANTS,
        //     system_PlayerMoveOnLevel,
        //     car,
        // } = this._root
        //
        // for (let i = 0; i < assets.level.levelReal.length; ++i) {
        //     const item = assets.level.levelReal[i]
        //     studio.removeFromScene(item)
        //     system_PlayerMoveOnLevel.removeItemFromPlayerCollision(item)
        // }
        //
        // const { bodyProps } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig
        // this._removeFromLevel(bodyProps)
        //
        //
        // studio.addToScene(car.getModel())
        // system_PlayerMoveOnLevel.addItemToPlayerCollision(car.getCollision())
        //
        //
        // for (let i = 0; i < assets.level.levelVirtual.length; ++i) {
        //     const item = assets.level.levelVirtual[i]
        //     studio.addToScene(item)
        //     system_PlayerMoveOnLevel.addItemToPlayerCollision(item)
        // }
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
    const items = {}

    assets['level-rooms'].traverse(child => {
        let mesh = null

        if (child.geometry) {
            items[child.name] = child
            child.material = materials.wallVirtual
        }
        
        if (child.name.includes("level")) {
            if (child.name === 'level_000_000') {
                mesh = new THREE.Mesh(child.geometry, materials.wallVirtual)
                levelReal.push(mesh)
            }

            if (child.name === 'level_001_000') {
                mesh = new THREE.Mesh(child.geometry, materials.wallVirtual)
                levelVirtual.push(mesh)
            }
        }
        if (child.name === 'body') {
            mesh = new THREE.Mesh(child.geometry, materials.car)
            levelVirtual.push(mesh)
        }
    })

    items.body.material = materials.car
    console.log(items.body)


    return {
        levelReal,
        levelVirtual,
        items,
    }
}
