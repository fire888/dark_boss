import { 
    START_ENV_CONFIG,
    START_ENV_CONFIG_2,
    START_ENV_CONFIG_3,
} from '../constants/constants_elements';


export class StarterPlay {
    constructor (gameContext) {
        const { 
            player, 
            ui, 
            studio, 
            dispatcher,
            system_Monsters,
        } = gameContext
        
        dispatcher.dispatch({ 
            type: 'CHANGE_INFO_CHAPTER', 
            currentChapterIndex: 3,
        })

        system_Monsters.setBotTo(0)

        const isPROD = true

        ui.showStartButton(() => {
            if (isPROD) {
                studio.changeEnvironment(START_ENV_CONFIG, { updateAmb: false, time: 1500 })

                setTimeout(() => {
                    studio.changeEnvironment(START_ENV_CONFIG_2, { updateAmb: false, time: 1500 }) 
                    
                    setTimeout(() => {
                        system_Monsters.setBotTo(4)
                        studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 }) 
                        player.toggleBlocked(false)
                    }, 1500)
                }, 4000)
            } else {
                studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 }) 
                player.toggleBlocked(false)
            }
        })
    }
}