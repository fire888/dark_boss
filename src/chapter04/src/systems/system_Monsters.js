import * as THREE from 'three'




export class system_Monsters {
    constructor(root) {
        const { 
            studio, 
            assets, 
            materials, 
        } = root

        assets.monster.position.fromArray([-1855.9946632526953, 2120.171875, -90.80075096163549])
        assets.monster.traverse(item => {
            item.material = materials['skin']
        })

        console.log(assets.monster)

        studio.addToScene(assets.monster)
    }
}

