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
import { createSystemWorldVirtual} from "../systems/system_worldVirtual";


export class actions {
    constructor (root) {
        this._root = root

        this._isInRealWord = true
        this._isExitFromVirt = false
        this._nextLocation = null 
        this._finalCountDown = 3000


        const {
            emitter,
            car,
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
            if (this._isExitFromVirt) {
                return;
            }

            if (data.item === 'nearStarterDrawCar') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: data.is })
            }
            if (data.item.includes('nearPerson')) {

                if (data.is) {
                    root.unit.prepareDialog()
                } else {
                    root.unit.exitDialog()  
                }

                setTimeout(() => {
                    root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DIALOG', is: data.is, keyPerson: data.item })
                })
            }
        })



        this._worldReal = createWorldReal(root)
        this._worldReal.addWorld()
        this._worldVirtual = createSystemWorldVirtual(root, car._model.position.x, car._model.position.z)



        frameUpdater.on(data => {
            TWEEN.update()

            this._worldVirtual.update(car._model.position.x, car._model.position.z)

            if (!car.isFreeze) {
                car.update(data)
                this._checkEndPlay()    
            } else {
                system_PlayerMoveOnLevel.update(data)
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

        if (this._isInRealWord) {
            this._isInRealWord = false
            car.toggleMat('green')
            studio.changeEnvironment(ENV_CONFIG_WORD_2, { updateAmb: false, time: 50 })
            this._worldVirtual.addWorld()
            this._worldReal.removeWorld()
        }
    }


    clickMachineExit () {
        const { system_PlayerMoveOnLevel, player, studio, car, CONSTANTS  } = this._root

        const pos = car.getPosition()
        const q = car.getQuaternion()

        studio.setCamera(player.getCamera())
        car.toggleFreeze(true)

        system_PlayerMoveOnLevel.toggleFreeze(false)
        player.setToPos(pos.x, player.mesh.position.y, pos.z)
        player.mesh.setRotationFromQuaternion(q)
    }


    changeTargetLocation ({ key }) {
        this._nextLocation = key

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
            system_PlayerMoveOnLevel,
            system_PlayerNearLevelItems,
            CONSTANTS,
        } = this._root

        player.setToPos(...CONSTANTS.playerConfig.startPos)


        /** car ****************************/
        const { position, rotation } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig.carProps
        const carMesh = car.getModel()
        carMesh.position.fromArray(position)
        carMesh.rotation.fromArray(rotation)
        carMesh.position.y = -49

        system_PlayerNearLevelItems.setItemToCheck(carMesh, 'nearStarterDrawCar', 28)
        studio.addToScene(carMesh)
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
            const x = +p[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2
            const z = +p[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2
            const y = 0

            car.setTargetPosition(new THREE.Vector3(x, y, z))
        }, 500)




        ui.showStartButton(() => {
            studio.changeEnvironment(ENV_CONFIG_WORD_1, { updateAmb: false, time: 1000 })
            player.toggleBlocked(false)
            this._root.system_Sound.playAmbient()
        })
    }

    _checkEndPlay () {
        if (this._nextLocation !== 'locationToFinish') {
            return;
        }
        --this._finalCountDown
        if (this._finalCountDown < 1000) {
            this._root.car.updateBattary()
        }
        this._finalCountDown < 0 && this._endPlay()
    }

    _endPlay () {
        this._nextLocation = '----'
        this._isInRealWord = true
        this._isExitFromVirt = true

        const {
            CONSTANTS,
            dispatcher,
            car,
            studio,
            player,
            system_PlayerMoveOnLevel,
            system_Sound,
        } = this._root

        this._root.car.batteryLight() 
        setTimeout(() => dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false }))
        const { position, rotation } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig.carProps
        const carMesh = car.getModel()
        car.toggleMat('red')
        carMesh.position.fromArray(position)
        carMesh.rotation.fromArray(rotation)
        carMesh.position.y = -49

        const pos = car.getPosition()
        const q = car.getQuaternion()

        studio.setCamera(player.getCamera())
        car.toggleFreeze(true)
        system_Sound.stopCar()

        system_PlayerMoveOnLevel.toggleFreeze(false)
        player.setToPos(pos.x, player.mesh.position.y, pos.z)
        player.mesh.setRotationFromQuaternion(q)


        this._worldReal.addWorld()
        this._worldVirtual.removeWorld()
        studio.changeEnvironment(ENV_CONFIG_WORD_1, { updateAmb: false, time: 50 })


        setTimeout(() => {
            studio.changeEnvironment(START_ENV_CONFIG, { updateAmb: false, time: 500 })
            setTimeout(() => {
                this._root.dispatcher.dispatch({ type: 'SHOW_FINAL_MESSAGE' })
            }, 1000)
        }, 35000)
    }
}

