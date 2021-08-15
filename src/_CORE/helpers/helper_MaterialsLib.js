import * as THREE from 'three'

export class Helper_MaterialsLib {
    constructor (gameContext) {
        const { assets, CONSTANTS } = gameContext

        gameContext.materials = createMaterials(assets, CONSTANTS.MATERIALS_CONFIG)
    }
}


const createMaterials = (assets, MATERIALS_CONFIG) => {
    for (let key in assets)
        assets[key].wrapS && (assets[key].wrapS = assets[key].wrapT = THREE.RepeatWrapping)

    const mapsKeys = ['bumpMap', 'envMap', 'map', 'normalMap', 'lightMap', 'aoMap']
    const materials = {}
    for (let key in MATERIALS_CONFIG) {
        materials[key] = new THREE[MATERIALS_CONFIG[key].mat]({
            ...MATERIALS_CONFIG[key].props
        })
        mapsKeys.map(keyMap =>
            MATERIALS_CONFIG[key].props[keyMap] &&
                (materials[key][keyMap] = assets[MATERIALS_CONFIG[key].props[keyMap]])
        )
    }
    return materials
}