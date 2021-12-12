import { store } from "../store/createStore";
import { connectEmitterToActions } from "../store/actions";
import '../stylesheets/style.css'
import '../../../_CORE/stylesheets/controls.css'
import CustomReactComponent from '../ui/CustomReactComponent';



export class PreInitConnectStoreToCoreUi {
    constructor (gameContext) {
        gameContext.appWrapper = document.querySelector('.app-wrapper')
        gameContext.CustomReactComponent = CustomReactComponent
        gameContext.store = store
        connectEmitterToActions(gameContext.emitter)


        store.subscribe(() => {
            const newState = store.getState()
            gameContext.emitter.emit('changeSceneEnvironment')(newState.ui.sceneEnvironment)
        })
    }
}