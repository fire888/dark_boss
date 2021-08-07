import * as TWEEN from '@tweenjs/tween.js'
import { FRAME_UPDATE } from "../constants/constants_elements";

export class TweenUpdater {
    constructor (gameContext) {
        gameContext['emitter'].subscribe(FRAME_UPDATE)(() => TWEEN.update())
    }
}