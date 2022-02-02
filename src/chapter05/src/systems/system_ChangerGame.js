import { 
    START_ENV_CONFIG,
    START_ENV_CONFIG_2,
    START_ENV_CONFIG_3,
} from '../constants/constants_elements';


export class system_ChangerGame {
    constructor (root) {
        this._root = root

        const { 
            player, 
            ui, 
            studio, 
            dispatcher,
            system_Level,
            CONSTANTS,
            emitter,
        } = this._root


        this._isInVirtual = false


        emitter.subscribe('collision')(data => {
            if (!this._isInVirtual && data === 'drawCar') {
                this._isInVirtual = true
                studio.prepareVirtualLevel()
                console.log(data)
            } 
        })




        if (CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig) {
            const { isInVirtual, isPlayerInCar, } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig
            if (!isInVirtual) {
                system_Level.prepareNormalLevel()
            } else {
                this._isInVirtual = true
            }
        }


        this._startPlay()
    }



    _startPlay () {
        const { 
            player, 
            ui, 
            studio, 
            dispatcher,
        } = this._root
        
        dispatcher.dispatch({ 
            type: 'CHANGE_INFO_CHAPTER', 
            currentChapterIndex: 3,
        })

        dispatcher.dispatch({ 
            type: 'ENABLE_CONTROL_SOUND',
        })

        ui.showStartButton(() => {
            studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 }) 
            player.toggleBlocked(false)
        })
    }
}