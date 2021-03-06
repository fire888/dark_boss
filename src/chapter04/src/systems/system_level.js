import * as THREE from 'three'




export class Level {
    constructor(root) {
        const { 
            studio, 
            assets, 
            materials, 
        } = root

        const { allMeshes, areas } = createLevelMeshes(assets, materials)
        root.assets.areas = areas


        //this.allMeshes = allMeshes
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
