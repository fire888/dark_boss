import * as THREE from 'three'
import {
    //START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    LOCATIONS_QUADRANTS,
    SIZE_QUADRANT,
} from '../constants/constants_elements';
import { createCheckerChangeLocationKey } from '../components/checkerChangeLocationKey'
import { createChangerLocations } from '../systems/system_changerLocations'
import { createLevelArea } from '../systems/system_levelArea'
import { createSustemSprites } from '../systems/sustem_sprites'
import { createMeshUnit } from '../Entities/Pers'



export class actions {
    constructor (root) {
        this._root = root

        const {
            emitter,
            car,
            dispatcher,
            frameUpdater,
            studio,
            player,
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



        /** toggle button in sit car */
        car.onChangeCarStateMove(e => {
            if (e === 'carStart') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false })
            }
            if (e === 'carStop') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: true })
            }
        })


        emitter.subscribe('checkNear')(data => {
            console.log('checkNear', data)
            if (data.item === 'nearStarterDrawCar') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: data.is })
            }

            if (data.item.includes('nearPerson')) {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DIALOG', is: data.is, keyPerson: data.item })
            }
            //if (data.item === 'nearPerson') {
            //    console.log('checkNear nearPerson !!!!!!', data)
            //}
        })





        const checkerChangeLocation = createCheckerChangeLocationKey(SIZE_QUADRANT, car._model.position.x, car._model.position.z)
        let currentQuadrantKey = checkerChangeLocation.getCurrent()
        
        this._changerLocations = createChangerLocations(this._root)
        this._changerLevelTresh = createLevelArea(this._root)
        this._systemSprites = createSustemSprites(this._root)   
        this._changerLevelTresh.createTresh(currentQuadrantKey.currentEnv)

        const unit = createMeshUnit(root)
        unit.mesh.position.y = -35
        unit.mesh.position.z = -40
        //studio.addToScene(unit.mesh)
        root.unit = unit
 



        /** update every frame ***************/
        frameUpdater.on(data => {
            unit.update()
            system_PlayerMoveOnLevel.update(data)
            if (!car.isFreeze) {
                car.update(data)
                this._systemSprites.update()
                const l = checkerChangeLocation.checkChanged(car._model.position.x, car._model.position.z)
                if (l) {
                    console.log('quadrants data', l)
                    /** arr/remove level tresh **********************/
                    this._changerLevelTresh.updateTrash(l.removedQs, l.addedQs)

                    /** add/remove  locations ************************/
                    if (LOCATIONS_QUADRANTS[l.oldKey]) {
                        //console.log('remove', l.oldKey)
                        this._changerLocations.removeLocationFromScene(LOCATIONS_QUADRANTS[l.oldKey])
                    }
                    if (LOCATIONS_QUADRANTS[l.newKey]) {
                        //console.log('add', l.newKey)
                        const strArr = l.newKey.split('_')
                        const locationX = +strArr[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2
                        const locationZ = +strArr[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2
                        this._changerLocations.addLocationToScene(LOCATIONS_QUADRANTS[l.newKey], locationX, locationZ)
                    }

                }

            }
            studio.drawFrame()
        })
        this._startPlay()
    }


    clickMachineDraw () {
        const { studio, system_PlayerMoveOnLevel, car } = this._root

        system_PlayerMoveOnLevel.toggleFreeze(true)
        car.toggleFreeze(false)
        studio.setCamera(car.getCamera())
    }


    clickMachineExit () {
        const { system_PlayerMoveOnLevel, player, studio, car  } = this._root

        const pos = car.getPosition()
        const q = car.getQuaternion()

        studio.setCamera(player.getCamera())
        car.toggleFreeze(true)

        system_PlayerMoveOnLevel.toggleFreeze(false)

        player.setToPos(pos.x, player.mesh.position.y, pos.z)
        player.mesh.setRotationFromQuaternion(q)
    }


    changeTargetLocation ({ key }) {
        let keyXZ = null
        for (let k in LOCATIONS_QUADRANTS) {
            if (LOCATIONS_QUADRANTS[k] === key) {
                keyXZ = k
            }
        }
        if (keyXZ) {
            const p = keyXZ.split('_')
            const x = +p[0] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const z =  +p[1] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const y =  0
            const { car } = this._root
            car.setTargetPosition(new THREE.Vector3(x, y, z))
        }
    }



    _startPlay () {
        const {
            player,
            ui,
            studio,
            car,
            system_Level,
            system_PlayerMoveOnLevel,
            system_PlayerNearLevelItems,
        } = this._root






        /** car ****************************/
        system_PlayerNearLevelItems.setItemToCheck(car.getModel(), 'nearStarterDrawCar', 28)
        studio.addToScene(car.getModel())
        system_PlayerMoveOnLevel.addItemToPlayerCollision(car.getCollision())


        setTimeout(() => {
            let i = 0
            let key = null
            for (let k in LOCATIONS_QUADRANTS) {
                if (i === 0) {
                    key = k
                }
                ++i
            }
            const p = key.split('_')
            const x = +p[0] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const z = +p[1] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const y = 0

            car.setTargetPosition(new THREE.Vector3(x, y, z))
        }, 500)


        /** body **************************/
        system_Level._items['body'].position.fromArray([-20, -60, -50])
        system_Level._items['body'].rotation.fromArray([0, 2, 0])
        studio.addToScene(system_Level._items['body'])


        ui.showStartButton(() => {
            //studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 })
            player.toggleBlocked(false)
        })
    }
}

