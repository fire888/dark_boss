import { dispatcher } from "../componentsReact/App";
import { store } from "../store/createStore";
import { connectEmitterToActions } from "../store/actions";
import '../stylesheets/style.css'
import App from '../componentsReact/App';


export class PreInitModules {
    constructor (gameContext) {
        gameContext.pr = dispatcher
        gameContext.store = store
        gameContext.appWrapper = document.querySelector('.app-wrapper')
        gameContext.App = App
        connectEmitterToActions(gameContext.emitter)
    }
}