import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import {
    STRUCTURES,
} from '../constants/constants_elements';
import { FINAL_ENV_COLOR } from "../constants/const_structures";
import { createStructure3 } from '../Entities/Structure03/structure03'
import { createSystemSprites } from '../Entities/sprites'
import { createFlyer } from '../Entities/Flyer/flyer'
import { createFuel } from '../Entities/fuel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'
import { flyToNewStructure } from './flyTonewStructure'
import { createFinalItem } from '../Entities/finalItem'
import { createSuperWall } from '../Entities/superWall'



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
        } = this._root


        /** prepare ui ******/
        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 6,
        })
        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })


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
            color: FINAL_ENV_COLOR,
            fog: false,
        })
        root.materials.matNotFogOuter = matNotFogOuter

        root.materials.structureMaterial = structureMaterial
        root.materials.structureMaterialInv = structureMaterialInv
        const basicMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        root.materials.basicMat = basicMat



        const geomSuperWall = createSuperWall(root)
        console.log('&*&*&*&*&*&*&*&', geomSuperWall)
        root.studio.addToScene(geomSuperWall.mesh)








        const fuel = createFuel(root)
        root.fuel = fuel

        const finalItem = createFinalItem(root)
        root.finalItem = finalItem


        const sprites = createSystemSprites(root)
        sprites.addToScene()
        root.sprites = sprites

        const structure = createStructure3(root)
        root.structure = structure
        structure.generateStructure(STRUCTURES[0]).then(() => {})


        const flyer = createFlyer(root)
        flyer.mesh.position.z = 300
        root.flyer = flyer
        root.system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)
        const unsubscribeCheckNearPlatform = root.emitter.subscribe('checkNear')(data => {
            if (data.item === 'platformObjectForCheck' && data.is) {
                unsubscribeCheckNearPlatform()
                flyToNewStructure(root)
            }
        })


        player.setToPos(0, 400, 485)


        player.toggleBlocked(false)

        /** update */
        frameUpdater.on(data => {
            TWEEN.update()
            system_PlayerMoveOnLevel.update(data)
            studio.drawFrame()
        })


        ui.showStartButton(() => {
            player.toggleBlocked(false)
            this._root.system_Sound && this._root.system_Sound.playAmbient()
            if (player.controls) {
                player.controlsLock()
            }
            //if (root.player.controls) {
            //    root.buttonMouse.style.display = 'block'
            //}
        })
    }
}

