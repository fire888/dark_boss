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
import { createWorldReal } from '../systems/system_worldReal'
import { createMap } from "../Entities/GeneratorWave/createGeneratorWave";
import { createMeshByMap } from '../Entities/GeneratorWave/treeModel'


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

        const map = createMap()
        const arr = []
        for (let i = 0; i < map.length; ++i) {
            for (let j = 0; j < map[i].length; ++j) {
                arr.push([i, j])
            }
        }
        console.log(arr)
        const addSegment = (ind) => {
            if (!arr[ind]) {
                return
            }
            const [i, j] = arr[ind]
            const m = createMeshByMap([[map[i][j]]])
            m.position.set(j * 40, 0, i * 40)
            studio.addToScene(m)
            setTimeout(() => {addSegment(ind + 1)}, 30)
        }

        //const m = createMeshByMap(map)
        //console.log("!!", m)
        //root.studio.addToScene(m)




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


            setTimeout(() => {
                addSegment(0)
            }, 5000)

        })
    }

}

