import * as TWEEN from '@tweenjs/tween.js'


export class Helper_TweenUpdater {
    constructor (gameContext) {
        gameContext['emitter'].subscribe('frameUpdate')(() => TWEEN.update())
    }
}