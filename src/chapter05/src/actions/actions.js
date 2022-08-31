import {
    START_ENV_CONFIG,
    START_ENV_CONFIG_2,
    START_ENV_CONFIG_3,
} from '../constants/constants_elements';
import { createCheckerChangeLocationKey } from '../components/checkerChangeLocationKey'


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


        emitter.subscribe('checkNear')( data => {
            if (data.item === 'nearStarterDrawCar') {
                root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: data.is })
            }
        })


        const checkerChangeLocation = createCheckerChangeLocationKey()

        frameUpdater.on(data => {
            system_PlayerMoveOnLevel.update(data)
            if (!car.isFreeze) {
                car.update(data)
                const l = checkerChangeLocation.checkChanged(car._model.position.x, car._model.position.y)
                console.log(l)
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


        /** body **************************/
        system_Level._items['body'].position.fromArray([-20, -60, -50])
        system_Level._items['body'].rotation.fromArray([0, 2, 0])
        studio.addToScene(system_Level._items['body'])


        /** add floor to player ********/
        studio.addToScene(system_Level._items['level_000_000'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(system_Level._items['level_000_000'])


        /** add/remove locations by key */
        const addLocationToScene = keyLocation => {
            const { mesh, carCollision } = system_Level.locations[keyLocation]
            studio.addToScene(mesh)
            system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
            studio.addToScene(carCollision)
            car.setCollisionForDraw(carCollision)
        }

        const removeLocationFromScene = keyLocation => {
            const { mesh, carCollision } = system_Level.locations[keyLocation]
            studio.removeFromScene(mesh)
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(mesh)
            studio.removeFromScene(carCollision)
            car.removeCollisionForDraw(carCollision)
        }


        /** ----------------------------------- */
        const iterate = i => {
            if (i > 3) {
                i = 1
            }
            setTimeout(() => {
                let oldI = i - 1
                if (oldI < 1) {
                    oldI = 3
                }

                removeLocationFromScene('location0' + oldI)
                addLocationToScene('location0' + i)
                iterate(++i)
            }, 5000)
        }
        iterate(1)
        /** ----------------------------------- */


        ui.showStartButton(() => {
            studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 })
            player.toggleBlocked(false)
        })
    }
}
