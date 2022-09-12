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


        /** locations persons ******* */
        const personCollision = new THREE.Mesh(
            new THREE.BoxGeometry(15, 15, 15),
            new THREE.MeshBasicMaterial({ color: 0xffff00 })
        )

        this._items['location01_person'].geometry.computeBoundingSphere()
        const offsetP01 = [
            this._items['location01_person'].geometry.boundingSphere.center.x,
            this._items['location01_person'].geometry.boundingSphere.center.y,
            this._items['location01_person'].geometry.boundingSphere.center.z,
        ]

        this._items['location02_person'].geometry.computeBoundingSphere()
        const offsetP02 = [
            this._items['location02_person'].geometry.boundingSphere.center.x,
            this._items['location02_person'].geometry.boundingSphere.center.y,
            this._items['location02_person'].geometry.boundingSphere.center.z,
        ]

        this._items['location03_person'].geometry.computeBoundingSphere()
        const offsetP03 = [
            this._items['location03_person'].geometry.boundingSphere.center.x,
            this._items['location03_person'].geometry.boundingSphere.center.y,
            this._items['location03_person'].geometry.boundingSphere.center.z,
        ]


        /** locations data *********** */
        this.locations = {
            location01: {
                mesh: this._items['location01'],
                carCollision: this._items['location_collision_01'],
                personOffset: offsetP01,
                personCollision,
            },
            location02: {
                mesh: this._items['location02'],
                carCollision: this._items['location_collision_02'],
                personOffset: offsetP02,
                personCollision,
            },
            location03: {
                mesh: this._items['location03'],
                carCollision: this._items['location_collision_03'],
                personOffset: offsetP03,
                personCollision,
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
