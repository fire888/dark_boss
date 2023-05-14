import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
import {
   // ENV_NORMAL,
    STRUCTURES,
} from '../constants/constants_elements';
//import { createWorldReal } from '../systems/system_worldReal'
//import { createWaveMain } from '../Entities/Structure01/WaveMain'
import { createStructure2 } from '../Entities/Structure02/structure02'
import { createStructure3 } from '../Entities/Structure03/structure03'
import { createSystemSprites } from '../Entities/sprites'
import { createFlyer } from '../Entities/Flyer/flyer'
import { createFuel } from '../Entities/fuel'
import { system_PlayerNearLevelItems } from '../systems/system_PlayerNearLevelItems'
import { flyToNewStructure } from './flyTonewStructure'



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


        root.emitter.subscribe('checkNear')(data => {
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

        const fuel = createFuel(root)
        root.fuel = fuel
        //studio.addToScene(fuel.mesh)
        //fuel.mesh.position.set(-200, 0, 0)
        //root.system_PlayerNearLevelItems.setItemToCheck(fuel.mesh, 'nearFuel', 60, 60)
        //const unsubscribe = emitter.subscribe('checkNear')(data => {
        //    console.log('##', data)
        //})

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
        root.sprites = sprites

        const structure = createStructure3(root)
        root.structure = structure
        structure.generateStructure(STRUCTURES[0]).then(() => {})


        const flyer = createFlyer(root)
        //flyer.mesh.position.set()
        root.flyer = flyer
        root.system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)

        root.emitter.subscribe('clickMachineDraw')(() => flyToNewStructure(root))

        player.setToPos(
            0, 300, 100,
            // (W * SIZE_X) / 2,
            // SIZE_Y * H,
            // (W * SIZE_Z) / 2

            //499.38749389674507, 530, -205.35013638723814
        )

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

