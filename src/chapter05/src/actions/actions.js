import {
    START_ENV_CONFIG,
    START_ENV_CONFIG_2,
    START_ENV_CONFIG_3,
} from '../constants/constants_elements';


export class actions {
    constructor (root) {
        this._root = root

        const {
            emitter,
            car,
        } = this._root



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
            dispatcher,
            car,
            system_Level,
            system_PlayerMoveOnLevel,
            system_PlayerNearLevelItems,
        } = this._root

        dispatcher.dispatch({
            type: 'CHANGE_INFO_CHAPTER',
            currentChapterIndex: 4,
        })

        dispatcher.dispatch({
            type: 'ENABLE_CONTROL_SOUND',
        })


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


        /** add locations ****************/
        studio.addToScene(system_Level._items['location01'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(system_Level._items['location01'])
        studio.addToScene(system_Level._items['locatioin_collision_01'])
        car.setCollisionsForDraw(system_Level._items['locatioin_collision_01'])

        studio.addToScene(system_Level._items['location02'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(system_Level._items['location02'])
        studio.addToScene(system_Level._items['locatioin_collision_02'])
        car.setCollisionsForDraw(system_Level._items['location_collision_03'])

        studio.addToScene(system_Level._items['location03'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(system_Level._items['location03'])
        studio.addToScene(system_Level._items['location_collision_03'])
        car.setCollisionsForDraw(system_Level._items['locatioin_collision_02'])


        ui.showStartButton(() => {
            studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 })
            player.toggleBlocked(false)
        })
    }
}
