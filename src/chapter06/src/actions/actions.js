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
import {createFractions} from "../Entities/meshTrunck";

import { createCheckerRoom } from '../helpers/checkerPlayerRoom'


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



        const fractions = createFractions(root)
        fractions.m.position.x = 0//200//1500
        fractions.m.position.z = -40//150//1500
        fractions.m.position.y = -61//150//1500
        fractions.m.rotation.y = Math.PI
        studio.addToScene(fractions.m)


        const checkerPlayerRoom = createCheckerRoom(root, this._worldReal.roomsArr)
        checkerPlayerRoom.onChangeRoom(r => {
            console.log('---!!!', r)
            fractions.setRoom(r)
        })



        let count = 0
        frameUpdater.on(data => {
            TWEEN.update()

            count += 0.01
            //fractions.update()
            //fractions.position.y = Math.sin(count) * 40

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

        //player.setToPos(...CONSTANTS.playerConfig.startPos)
        //player.setToPos(...CONSTANTS.playerConfig.startPos)
        player.setToPos(-30, -40, -150)
        player.mesh.rotation.y = Math.PI * 1.3













        ui.showStartButton(() => {
            studio.changeEnvironment(ENV_CONFIG_WORD_1, { updateAmb: false, time: 1000 })
            player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()
        })

    }

}

