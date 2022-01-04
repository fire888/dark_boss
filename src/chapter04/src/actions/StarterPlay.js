import { START_ENV_CONFIG } from '../constants/constants_elements';


export class StarterPlay {
    constructor (gameContext) {
        const { player, ui, studio, dispatcher } = gameContext
        
        dispatcher.dispatch({ 
            type: 'CHANGE_INFO_CHAPTER', 
            currentChapterIndex: 3,
        })

        ui.showStartButton(() => {
            player.toggleBlocked(false)
            studio.changeEnvironment(START_ENV_CONFIG, { updateAmb: false })

        })
    }
}