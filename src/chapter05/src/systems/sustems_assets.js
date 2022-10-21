export class SystemAssets {
    constructor (root) {
        this._root = root

        const {
            assets,
            materials,
        } = root

        this.items = createLevelMeshes(assets, materials)
        console.log(this.items)
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

    return items
}