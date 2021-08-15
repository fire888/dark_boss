import "../stylesheets/style.css";



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
        const { emitter } = gameContext

        const buttLeft = document.querySelector('.butt-left')
        buttLeft.addEventListener('mousedown', function() { emitter.emit('mouseDown')('butt-left') })
        buttLeft.addEventListener('mouseup',  function() {emitter.emit('mouseUp')('butt-left') })   
        buttLeft.addEventListener('touchstart', function() { emitter.emit('mouseDown')('butt-left') })
        buttLeft.addEventListener('touchend', function() {emitter.emit('mouseUp')('butt-left') })       
        
        const buttRight = document.querySelector('.butt-right')
        buttRight.addEventListener('mousedown', function() { emitter.emit('mouseDown')('butt-right') })
        buttRight.addEventListener('mouseup', function() { emitter.emit('mouseUp')('butt-right') })
        buttRight.addEventListener('touchstart', function() { emitter.emit('mouseDown')('butt-right') })
        buttRight.addEventListener('touchend', () => emitter.emit('mouseUp')('butt-right') )         
            
        const buttUp = document.querySelector('.butt-front')
        buttUp.addEventListener('mousedown', () => emitter.emit('mouseDown')('butt-front'))
        buttUp.addEventListener('mouseup', () => emitter.emit('mouseUp')('butt-front'))
        buttUp.addEventListener('touchstart', () => emitter.emit('mouseDown')('butt-front'))
        buttUp.addEventListener('touchend', () => emitter.emit('mouseUp')('butt-front'))  
           
        createInfo(emitter)
    }

    showStartButton(onClick) {
        const startButtons = document.querySelector('.startbuttons-wrapper')
        const progressWrapper = document.querySelector('.progress-wrapper')


        isAnimateLoader = false
        progressWrapper.style.display = 'none'

        const hideStartScreen = e => {
            this._gameContext.emitter.emit('setLanguage')(e.target.dataset.lang)
            document.querySelector('.start-screen').style.display = 'none'
        }

        startButtons.addEventListener('click', e => {
            onClick()
            hideStartScreen(e)
        })

        startButtons.style.display = 'flex'
    }
}


function createInfo (eventEmitter) {
    const infoWrapper = document.getElementById('info')
    let wrapperOpened = false
    const buttInfo = document.getElementById('butt-info')
    buttInfo.onclick = () => {
        wrapperOpened = !wrapperOpened
        infoWrapper.style.display = wrapperOpened ? 'flex' : 'none'
    }
    const closeInfo = document.getElementById("close-info")
    closeInfo.onclick = () => {
        wrapperOpened = false
        infoWrapper.style.display = 'none'
    }
} 













