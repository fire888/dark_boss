import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
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
import { createStructure3 } from '../Entities/Structure03/structure03'
import { createSystemSprites } from '../Entities/sprites'
import { createPlatform } from '../Entities/Platform/platform'

import { W, H, SIZE_X, SIZE_Y, SIZE_Z } from '../constants/constants_elements'


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


        root.assets.textureTiles.magFilter = THREE.NearestFilter
        root.assets.textureTiles.minFilter = THREE.NearestFilter
        const structureMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: root.assets.textureTiles,
            vertexColors: true,
        })
        if (!root.materials) {
            root.materials = {}
        }
        root.materials.structureMaterial = structureMaterial
        const basicMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        root.materials.basicMat = basicMat


        // const plane = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry(10000, 10000, ),
        //     new THREE.MeshBasicMaterial({ color: 0xeeeeee})
        // )
        // plane.rotation.x = -Math.PI / 2
        // plane.position.y = -160
        // root.studio.addToScene(plane)

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
        //createStructure2(root)

        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////


        const sprites = createSystemSprites(root)
        sprites.addToScene()

        createStructure3(root).then(() => {
           // player.mesh.position.set(0, -40, 0)
            //player.mesh.position.set(0, -40, -120)
            //player.mesh.rotation.y = Math.PI

            const platform = createPlatform(root)

            player.setToPos(
                (W * SIZE_X) / 2,
                SIZE_Y * H - 160,
                (W * SIZE_Z) / 2
            )

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
        })

    }
}

