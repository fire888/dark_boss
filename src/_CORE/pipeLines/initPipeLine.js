export async function pipeLineForInit (gameModules, CONSTANTS) {
    const gameContext = { CONSTANTS }

    initModulesByState('pageLoaded', gameModules, gameContext)

    const { loaderAssets } = gameContext

    const dataToLoad = getAssetsFromModulesData(gameModules)
    gameContext.assets = await loaderAssets.loadAssets(dataToLoad)

    initModulesByState('beforeStartPlay', gameModules, gameContext)
}


const initModulesByState = (state, modulesData, gameContext) => {
    for (let i = 0; i < modulesData.length; ++i) {
        const {  key, constr, initStateKey } = modulesData[i]
        initStateKey === state && (gameContext[key] = new constr(gameContext))
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