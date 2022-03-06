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


        emitter.subscribe('checkNear')( data => {
            if (data.item === 'nearStarterDrawCar') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: data.is })
            }
        })




        if (CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig) {
            const { isInVirtual, isPlayerInCar, } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig
            if (!isInVirtual) {
                system_Level.prepareNormalLevel()
            } else {
                system_Level.prepareVirtualLevel()
                this._isInVirtual = true
            }
        }


        this._startPlay()
    }



    clickMachineDraw () {
        const { studio, system_Level, system_PlayerMoveOnLevel, car, player  } = this._root

        system_PlayerMoveOnLevel.toggleFreeze(true)
        car.toggleFreeze(false)
        studio.setCamera(car.getCamera())

        if (!this._isInVirtual) {
            this._isInVirtual = true
            studio.changeEnvironment(START_ENV_CONFIG_2)
            setTimeout(() => {
                system_Level.prepareVirtualLevel()
                studio.changeEnvironment(START_ENV_CONFIG_3)
            }, 5000)
        }
    }

    clickMachineExit () {
        const { system_PlayerMoveOnLevel, player, studio, car  } = this._root

        studio.setCamera(player.getCamera())
        car.toggleFreeze(true)

        system_PlayerMoveOnLevel.toggleFreeze(false)
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
