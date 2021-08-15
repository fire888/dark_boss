import {showMessages, startPlay} from "../store/actions";
import {FRAME_UPDATE} from "../constants/constants_elements";


export class EnderPlay {
    constructor (gameContext) {
        const { player, ui, pr, emitter } = gameContext


        let oldY = player._mainObj.position.y
        let countDropped = 0
        let isGameComplete = false

        const update = data => {
            if (oldY > player._mainObj.position.y) {
                ++countDropped
            } else {
                countDropped = 0
            }
            oldY = player._mainObj.position.y

            if (countDropped > 800 && !isGameComplete) {
                isGameComplete = true
                setTimeout(() => {
                    startPlay(pr.dispatch).startFinalFog()
                    setTimeout(() => {
                        showMessages(pr.dispatch).toggleFinalMessage(true)
                    }, 6000)
                }, 10000)
            }
        }

        emitter.subscribe(FRAME_UPDATE)(update)
    }
}