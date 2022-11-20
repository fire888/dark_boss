import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import {
    START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    ENV_CONFIG_WORD_1,
    ENV_CONFIG_WORD_2,
    LOCATIONS_QUADRANTS,
    SIZE_QUADRANT,
    playerConfig,
} from '../constants/constants_elements';
import { createWorldReal } from '../systems/system_worldReal'


export class actions {
    constructor (root) {
        this._root = root

        const {
            dispatcher,
            frameUpdater,
            studio,
            system_PlayerMoveOnLevel,
        } = this._root

        /** prepare ui ******/
        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 4,
        })
        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })


        this._worldReal = createWorldReal(root)
        this._worldReal.addWorld()

        frameUpdater.on(data => {
            TWEEN.update()

            system_PlayerMoveOnLevel.update(data)
            studio.drawFrame()
        })

        this._startPlay()
    }


    _startPlay () {
        const {
            player,
            ui,
            studio,
            system_PlayerMoveOnLevel,
            system_PlayerNearLevelItems,
            CONSTANTS,
        } = this._root

        player.setToPos(...CONSTANTS.playerConfig.startPos)



        ui.showStartButton(() => {
            studio.changeEnvironment(ENV_CONFIG_WORD_1, { updateAmb: false, time: 1000 })
            player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()
        })
    }

}

