import * as TWEEN from '@tweenjs/tween.js'
//import * as THREE from 'three'
import {
    //START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    //ENV_CONFIG_WORD_1,
    //ENV_CONFIG_WORD_2,
    //LOCATIONS_QUADRANTS,
    //SIZE_QUADRANT,
    //playerConfig,
} from '../constants/constants_elements';
import { createWorldReal } from '../systems/system_worldReal'
import { createStatue } from "../Entities/statue";

import { createCheckerRoom } from '../helpers/checkerPlayerRoom'
import { ARR_STATES } from './gameStateActions'

import {
    ENV_START
} from '../constants/constants_elements'

import { startPipeline } from './catScenes'
import { createParticles } from '../Entities/particles'


//const ENV_RED = { fogNear: 0, fogFar: 1000, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
//const ENV_NORMAL =  { fogNear: 0, fogFar: 1000, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }



export class actions {
    constructor (root) {
        this._root = root

        const {
            dispatcher,
            frameUpdater,
            studio,
            system_PlayerMoveOnLevel,
            player,
            ui,
        } = this._root


        /** prepare ui ******/
        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 5,
        })
        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })


        /** world */
        //player.setToPos(-30, -40, -150)
        this._worldReal = createWorldReal(root)
        this._worldReal.addWorld()
        root.worldReal = this._worldReal

        const statue = createStatue(root)
        statue.m.position.x = 1000
        statue.m.position.z = 3000
        statue.m.position.y = -61
        statue.m.rotation.y = Math.PI
        studio.addToScene(statue.m)
        root.statue = statue


        const p = createParticles(root)
        studio.addToScene(p.m)


        /** game state */
        const checkerPlayerRoom = createCheckerRoom(root, this._worldReal.roomsArr)

        let gameState = null
        const iterate = i => {
            if (!ARR_STATES[i]) {
                console.log('pipeline-complete')
                return;
            }
            console.log('stateIndex: ', i, ARR_STATES[i].name)
            gameState = ARR_STATES[i](root)
            gameState.onComplete(() => {
                iterate(i + 1)
            })
        }
        iterate(0)
        checkerPlayerRoom.onChangeRoom(r => {
            gameState.update(r)
        })




        root.emitter.subscribe('playerMove')(() => {
            p.setCenterPos(
                player.mesh.position.x,
                player.mesh.position.y,
                player.mesh.position.z,
            )
        })



        /** update */
        frameUpdater.on(data => {
            TWEEN.update()
            system_PlayerMoveOnLevel.update(data)
            p.update()
            studio.drawFrame()
        })

        studio.changeEnvironment(ENV_START, { time: 1 })


        ui.showStartButton(() => {
            startPipeline(root).then()
            //player.toggleBlocked(false)
            //this._root.system_Sound && this._root.system_Sound.playAmbient()
        })
    }

}

