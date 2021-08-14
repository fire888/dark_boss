import * as TWEEN from '@tweenjs/tween.js'
import { FRAME_UPDATE } from "../../chapter03/constants/constants_elements";

export class Helper_TweenUpdater {
    constructor (gameContext) {
        gameContext['emitter'].subscribe(FRAME_UPDATE)(() => TWEEN.update())
    }
}