import * as TWEEN from '@tweenjs/tween.js'
//import * as THREE from 'three'
import {
    ENV_NORMAL
    //START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    //ENV_CONFIG_WORD_1,
    //ENV_CONFIG_WORD_2,
    //LOCATIONS_QUADRANTS,
    //SIZE_QUADRANT,
    //playerConfig,
} from '../constants/constants_elements';
//import { createWorldReal } from '../systems/system_worldReal'
//import { createWaveMain } from '../Entities/Structure01/WaveMain'
import { createStructure2 } from '../Entities/Structure02/structure02'


export class actions {
    constructor (root) {
        this._root = root

        const {
            dispatcher,
            frameUpdater,
            studio,
            system_PlayerMoveOnLevel,
            ui,
            player,
        } = this._root


        /** prepare ui ******/
        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 6,
        })
        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })

        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        //createWaveMain(root)

        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        createStructure2(root)






        /** world */
        //this._worldReal = createWorldReal(root)
        //this._worldReal.addWorld()
        //root.worldReal = this._worldReal

        player.mesh.position.set(0, -40, 0)
        player.mesh.position.set(0, -40, -120)
        //player.mesh.rotation.y = Math.PI

        studio.changeEnvironment(ENV_NORMAL, { time: 1 },)
        player.toggleBlocked(false)

        /** update */
        frameUpdater.on(data => {
            TWEEN.update()
            system_PlayerMoveOnLevel.update(data)
            studio.drawFrame()
        })


        ui.showStartButton(() => {
            //startPipeline(root).then()
            //player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()


            // setTimeout(() => {
            //     addSegment(0)
            // }, 0)

        })
    }

}

