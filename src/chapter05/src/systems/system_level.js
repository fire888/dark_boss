import * as THREE from 'three'

export class Level {
    constructor(root) {
        this._root = root

        const {
            assets, 
            materials,
        } = root


        const groundStart = new THREE.Mesh(
            new THREE.PlaneGeometry(5000, 5000),
            materials.floorMat1
        )
        materials.floorMat1.map.repeat.set(180, 180)
        groundStart.rotation.x = -Math.PI / 2
        groundStart.position.y = -62
        root.studio.addToScene(groundStart)
        setTimeout(() => {
            root.system_PlayerMoveOnLevel.addItemToPlayerCollision(groundStart)
        }, 10)


        const { items } = createLevelMeshes(assets, materials)
        this._items = items
        console.log('system_level_items', this._items)

        items.body.material = materials.car
    }
}




const createLevelMeshes = (assets, materials) => {
    const items = {}

    assets['level-rooms'].traverse(child => {
        if (child.geometry) {
            items[child.name] = child
            child.material = materials.wallVirtual
        }
    })

    return { items }
}
