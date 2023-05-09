import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App, { dispatcher } from './containersReact/App';
import { prepareStore } from './store/createStore'
import { changeLang } from "../helpers/helper_translate";


/** ANIMATION LOADER */
// const loader = document.querySelector('.progress')
// let offsetLoader = -100
// let isAnimateLoader = true



// const loaderTimeOut = () => {
//     if (!isAnimateLoader) return;

//     setTimeout(() => {
//         offsetLoader ++;
//         offsetLoader === 0 && (offsetLoader -= 100)
//         loader.style.marginLeft = offsetLoader + '%'
//         loaderTimeOut()
//     }, 30)
// }



//loaderTimeOut()



//document.querySelector('.start-screen').style.display = 'none'



export class UI {
    constructor(root) {
        root.dispatcher = dispatcher
        this._root = root
        const store = prepareStore(root)


        store && ReactDOM.render(
            <Provider store={store}>
                <App gameContext={root}/>
            </Provider>,
            document.getElementById('root')
        )
    }

    showStartButton(onClick) {
        const startButtons = document.querySelector('.startbuttons-wrapper')
        const progressWrapper = document.querySelector('.progress-wrapper')

        const hideStartScreen = e => {
            e.target.dataset && e.target.dataset.lang && changeLang(e.target.dataset.lang)
            document.querySelector('.start-screen').style.display = 'none'
        }

        // isAnimateLoader = false
        // startButtons.style.display = 'flex'
        // startButtons.addEventListener('click', e => {
        //     onClick()
        //     hideStartScreen(e)
        // })
        // progressWrapper.style.display = 'none'
    }
}













