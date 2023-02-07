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

const ENV_RED = { fogNear: 0, fogFar: 1000, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
const ENV_NORMAL =  { fogNear: 0, fogFar: 1000, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }


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



        const statue = createFractions(root)
        statue.m.position.x = -100
        statue.m.position.z = -400
        statue.m.position.y = -61
        statue.m.rotation.y = Math.PI
        studio.addToScene(statue.m)
        //root.system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)

        const checkerPlayerRoom = createCheckerRoom(root, this._worldReal.roomsArr)
        let count = 0
        let countShowed = 0

        //const countNotShow = 5
        const countNotShow = 0
        const countShowedMustHide = 10
        const countShowedComplete = 20

        // statue.m.position.x = 1500
        // statue.m.position.y = -45
        // statue.m.position.z = 1495
        // statue.m.rotation.y = 0
        // statue.m.rotation.x = -Math.PI / 2

        let isInverted = false
        checkerPlayerRoom.onChangeRoom(r => {
            ++count
            if (count > countNotShow) {
                if (countShowed < countShowedMustHide) {
                    statue.setRoom(r, 1, false)
                }

                ++countShowed
            }
            if (countShowed === countShowedMustHide) {
                root.system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)
            }
            if (countShowed > countShowedMustHide - 1) {
                if (countShowed < countShowedComplete) {
                    statue.setRoom(r, 1, 'notHide')
                } else {
                        statue.m.position.x = 1500
                        statue.m.position.y = -45
                        statue.m.position.z = 1495
                        statue.m.rotation.y = 0
                        statue.m.rotation.x = -Math.PI / 2
                }

                ++countShowed
            }
            if (count < 2) {
                return;
            }
            if (count)
            //if (countShowed === countShowedComplete) {
                this._worldReal.invertColor()
                //statue.m.position.x = 500
                //statue.m.position.z = -100
                statue.invert()

                if (!isInverted) {
                    root.studio.changeEnvironment(
                        ENV_RED,
                        { time: 100 },
                    )
                }  else {
                    root.studio.changeEnvironment(
                       ENV_NORMAL,
                        { time: 100 },
                    )
                }

                isInverted = !isInverted
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
            studio.changeEnvironment(ENV_NORMAL, { updateAmb: false, time: 1000 })
            player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()
        })

    }

}

