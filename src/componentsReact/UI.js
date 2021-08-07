import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import '../stylesheets/style.css'



/** ANIMATION LOADER */
const loader = document.querySelector('.progress')
let offsetLoader = -100
let isAnimateLoader = true



const loaderTimeOut = () => {
    if (!isAnimateLoader) return;

    setTimeout(() => {
        offsetLoader ++;
        offsetLoader === 0 && (offsetLoader -= 100)
        loader.style.marginLeft = offsetLoader + '%'
        loaderTimeOut()
    }, 30)
}



loaderTimeOut()



export class UI {
    constructor(gameContext) {
        this._gameContext = gameContext

        ReactDOM.render(
            <Provider store={gameContext.store}>
                <App
                    gameContext={gameContext}/>
            </Provider>,
            document.getElementById('root')
        )
    }

    showStartButton(onClick) {
        const startButtons = document.querySelector('.startbuttons-wrapper')
        const progressWrapper = document.querySelector('.progress-wrapper')

        const hideStartScreen = e => {
            this._gameContext.emitter.emit('setLanguage')(e.target.dataset.lang)
            document.querySelector('.start-screen').style.display = 'none'
        }

        isAnimateLoader = false
        startButtons.style.display = 'flex'
        startButtons.addEventListener('click', e => {
            onClick()
            hideStartScreen(e)
        })
        progressWrapper.style.display = 'none'

    }
}













