import {dispatcher} from "../componentsReact/App";
import {store} from "../store/createStore";
import {GAME_MODULES} from "../constants/constants_modules";
import {ASSETS_TO_LOAD} from "../constants/constants_elements";
import {startPlay} from "../store/actions";
import { connectEmitterToActions } from "../store/actions";


export async function pipeLineForInit () {
    const gameContext = {
        pr: dispatcher,
        store,
        appWrapper: document.querySelector('.app-wrapper'),
    }

    initModulesByState('pageLoaded', GAME_MODULES, gameContext)

    const { loaderAssets, emitter } = gameContext

    connectEmitterToActions(emitter)
    gameContext.assets = await loaderAssets.loadAssets(ASSETS_TO_LOAD)

    initModulesByState('beforeStartPlay', GAME_MODULES, gameContext)

    const { player, ui } = gameContext
    ui.showStartButton(() => {
        startPlay(dispatcher.dispatch).startPlay()
        startPlay(dispatcher.dispatch).showBackground()
        player.toggleBlocked(false)
    })
}


const initModulesByState = (state, modulesData, gameContext) => {
    for (let i = 0; i < modulesData.length; ++i) {
        const {  key, constr, initStateKey } = GAME_MODULES[i]
        initStateKey === state && (gameContext[key] = new constr(gameContext))
    }
}