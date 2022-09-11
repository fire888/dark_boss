import * as THREE from 'three'


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


        this._items['location_collision_01'].visible = false
        this._items['location_collision_02'].visible = false
        this._items['location_collision_03'].visible = false

        this.locations = {
            location01: {
                mesh: this._items['location01'],
                carCollision: this._items['location_collision_01'],
                person: this._items['location01_person'],
            },
            location02: {
                mesh: this._items['location02'],
                carCollision: this._items['location_collision_02'],
                person: this._items['location02_person'],
            },
            location03: {
                mesh: this._items['location03'],
                carCollision: this._items['location_collision_03'],
                person: this._items['location03_person'],
            },
        }
    }
}




const createLevelMeshes = (assets, materials) => {
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
                mesh.name = child.name
            }

            if (child.name === 'level_001_000') {
                mesh = new THREE.Mesh(child.geometry, materials.wallVirtual)
                mesh.name = child.name
            }
        }
    })

    return { items }
}
