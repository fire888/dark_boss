export async function pipeLineForInit (gameModules, CONSTANTS) {
    const root = { CONSTANTS }

    initModulesByState('pageLoaded', gameModules, root)

    const { loaderAssets } = root

    const dataToLoad = getAssetsFromModulesData(gameModules)
    root.assets = await loaderAssets.loadAssets(dataToLoad)

    initModulesByState('beforeStartPlay', gameModules, root)
}


const initModulesByState = (state, modulesData, root) => {
    for (let i = 0; i < modulesData.length; ++i) {
        const {  key, constr, initStateKey } = modulesData[i]
        initStateKey === state && (root[key] = new constr(root))
    }
}

const getAssetsFromModulesData = modulesData => {
    const arr = []
    for (let i = 0; i < modulesData.length; ++i) {
        if (modulesData[i].assetsToLoad && modulesData[i].assetsToLoad.length) {
            for (let j = 0; j < modulesData[i].assetsToLoad.length; ++j) {
                arr.push(modulesData[i].assetsToLoad[j])
            }
        }
    }
    return arr
}