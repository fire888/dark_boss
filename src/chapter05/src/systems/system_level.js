export class Level {
    constructor(root) {
        this._root = root

        const {
            assets, 
            materials,
        } = root


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
