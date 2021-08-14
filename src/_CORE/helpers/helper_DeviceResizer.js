import { clickFullScreen } from '../../chapter03/store/actions'



const MAX_W = 400
const MIN_W = 350



export class DeviceResizer {
    constructor (gameContext) {
        const { emitter, appWrapper, pr } = gameContext

        emitter.subscribe('mouseDown')(key => {
            if (key === 'butt-fullscreen') openAppFullScreenIfMobile()
        })

        /** fullscreen */
        const openAppFullScreenIfMobile = () => {
            if (appWrapper.requestFullscreen) {
                appWrapper.requestFullscreen()
            } else if (appWrapper.mozRequestFullScreen) {
                appWrapper.mozRequestFullScreen()
            } else if (appWrapper.webkitRequestFullscreen) {
                appWrapper.webkitRequestFullscreen()
            } else if (appWrapper.msRequestFullscreen) {
                appWrapper.msRequestFullscreen()
            }
        }

        /** resize */
        const resize = e => {
            appWrapper.style.width = window.innerWidth + 'px'
            appWrapper.style.height = window.innerHeight + 'px'
            appWrapper.style.fontSize = Math.max(Math.min(Math.min(window.innerWidth, window.innerHeight), MAX_W), MIN_W) / 50 + 'px'

            if (!document.fullscreenElement) {
                emitter.emit('screenMode')('exitFullScreen')
                //pr && clickFullScreen(pr.dispatch).exitFullScreen()
            }

        }

        window.addEventListener('resize', resize)
        resize()
    }
}
