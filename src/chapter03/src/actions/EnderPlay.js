import { showMessages, startPlay } from "../store/actions";
import {FRAME_UPDATE} from "../constants/constants_elements";


export class EnderPlay {
    constructor (gameContext) {
        const { player, emitter, dispatcher } = gameContext



        const finalComplete = () => {
            setTimeout(() => {
                startPlay(dispatcher.dispatch).startFinalFog()
                setTimeout(() => {
                    showMessages(dispatcher.dispatch).toggleFinalMessage(true)
                }, 6000)
            }, 10000)
        }




        const playerObj = player.getObj()

        let oldY = playerObj.position.y
        let countDropped = 0
        let isGameComplete = false


        const update = () => {
            if (oldY > playerObj.position.y) {
                ++countDropped
                oldY = playerObj.position.y
            } else {
                countDropped = 0
            }
            
            if (countDropped > 800 && !isGameComplete) {
                isGameComplete = true
                finalComplete()
            }
        }


        emitter.subscribe('frameUpdate')(update)
    }
}