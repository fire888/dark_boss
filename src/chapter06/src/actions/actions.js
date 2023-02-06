import * as TWEEN from '@tweenjs/tween.js'
//import * as THREE from 'three'
import {
    //START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    ENV_CONFIG_WORD_1,
    //ENV_CONFIG_WORD_2,
    //LOCATIONS_QUADRANTS,
    //SIZE_QUADRANT,
    //playerConfig,
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
        fractions.m.position.x = -100
        fractions.m.position.z = -400
        fractions.m.position.y = -61
        fractions.m.rotation.y = Math.PI
        studio.addToScene(fractions.m)

        //root.system_PlayerMoveOnLevel.addItemToPlayerCollision(fractions.mCollision)

        const checkerPlayerRoom = createCheckerRoom(root, this._worldReal.roomsArr)
        let count = 0
        let countShowed = 0

        const countNotShow = 5
        const countShowedMustHide = 10
        const countShowedComplete = 20

        checkerPlayerRoom.onChangeRoom(r => {
            ++count
            //if (count === 2) {
            //    this._worldReal.invertColor()
            //}
            if (count > countNotShow && countShowed < countShowedMustHide) {
               if (Math.random() < .5) {
                    fractions.setRoom(r, (count - 5) / 20, false)
                    ++countShowed
                }
            }
            if (countShowed === countShowedMustHide) {
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(fractions.mCollision)
            }
            if (countShowed > countShowedMustHide - 1 && countShowed < countShowedComplete) {
                fractions.setRoom(r, 1, 'notHide')
                ++countShowed
            }
            //if (countShowed === countShowedComplete) {
                console.log('#@#@#@#_')
                this._worldReal.invertColor()
                fractions.m.position.x = 500
                fractions.m.position.z = -100
                ++countShowed
            //}
        })


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
        } = this._root

        player.setToPos(-30, -40, -150)
        player.mesh.rotation.y = Math.PI * 1.3


        ui.showStartButton(() => {
            studio.changeEnvironment(ENV_CONFIG_WORD_1, { updateAmb: false, time: 1000 })
            player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()
        })

    }

}

