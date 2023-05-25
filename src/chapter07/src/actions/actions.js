import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import {
   // ENV_NORMAL,
    STRUCTURES,
} from '../constants/constants_elements';
import { FINAL_ENV_COLOR } from "../constants/const_structures";
//import { createWorldReal } from '../systems/system_worldReal'
//import { createWaveMain } from '../Entities/Structure01/WaveMain'
import { createStructure2 } from '../Entities/Structure02/structure02'
import { createStructure3 } from '../Entities/Structure03/structure03'
import { createSystemSprites } from '../Entities/sprites'
import { createFlyer } from '../Entities/Flyer/flyer'
import { createFuel } from '../Entities/fuel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'
import { flyToNewStructure } from './flyTonewStructure'
//import {create} from "../Entities/Structure03/geometries/geomElemFinal";
import { createFinalItem } from '../Entities/finalItem'



export class actions {
    constructor (root) {
        this._root = root

        root.system_PlayerNearLevelItems = new system_PlayerNearLevelItems(root)

        const {
            dispatcher,
            frameUpdater,
            studio,
            system_PlayerMoveOnLevel,
            ui,
            player,
            emitter,
        } = this._root


        /** prepare ui ******/
        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 6,
        })
        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })

        //studio.changeEnvColor(STRUCTURES[0].ENV_COLOR)
        //studio.changeFog(STRUCTURES[0].FOG)


        if (!root.materials) {
            root.materials = {}
        }
        root.assets.textureTiles.magFilter = THREE.NearestFilter
        root.assets.textureTiles.minFilter = THREE.NearestFilter
        const structureMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: root.assets.textureTiles,
            vertexColors: true,
        })
        root.assets.textureTilesInv.magFilter = THREE.NearestFilter
        root.assets.textureTilesInv.minFilter = THREE.NearestFilter
        const structureMaterialInv = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: root.assets.textureTilesInv,
            vertexColors: true,
        })
        const matNotFog = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: root.assets.textureTilesInv,
            vertexColors: true,
        })
        root.materials.matNotFog = matNotFog

        const matNotFogOuter = new THREE.MeshBasicMaterial({
            //color: FINAL_ENV_COLOR.toHexString(),
            color: FINAL_ENV_COLOR,
            fog: false,
        })
        root.materials.matNotFogOuter = matNotFogOuter

        root.materials.structureMaterial = structureMaterial
        root.materials.structureMaterialInv = structureMaterialInv
        const basicMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        root.materials.basicMat = basicMat

        const fuel = createFuel(root)
        root.fuel = fuel

        const finalItem = createFinalItem(root)
        // console.log(finalItem)
        root.finalItem = finalItem

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
        root.sprites = sprites

        const structure = createStructure3(root)
        root.structure = structure
        structure.generateStructure(STRUCTURES[0]).then(() => {})


        const flyer = createFlyer(root)
        root.flyer = flyer
        root.system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)
        const unsubscribeCheckNearPlatform = root.emitter.subscribe('checkNear')(data => {
            if (data.item === 'platformObjectForCheck' && data.is) {
                dispatcher.dispatch({
                    type: 'TOGGLE_BUTTON_DRAW_CAR',
                    is: true
                })
            }
            if (data.item === 'platformObjectForCheck' && !data.is) {
                dispatcher.dispatch({
                    type: 'TOGGLE_BUTTON_DRAW_CAR',
                    is: false
                })
            }
        })

        const unsubscribeClickDraw = root.emitter.subscribe('clickMachineDraw')(() => {
            unsubscribeCheckNearPlatform()
            unsubscribeClickDraw()
            flyToNewStructure(root) 
        })

        player.setToPos(0, 300, 100)

        //studio.changeEnvironment(ENV_NORMAL, { time: 1 },)
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

