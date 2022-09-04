import * as THREE from 'three'
import {
    START_ENV_CONFIG,
    START_ENV_CONFIG_2,
    START_ENV_CONFIG_3,
    LOCATIONS_QUADRANTS,
    SIZE_QUADRANT,
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







        const checkerChangeLocation = createCheckerChangeLocationKey(SIZE_QUADRANT, car._model.position.x, car._model.position.z)
        let currentQuadrantKey = checkerChangeLocation.getCurrent()
        
        this._changerLocations = createChangerLocations(this._root)
        this._changerLevelTresh = createManagerLevelTrash(this._root)
        this._changerLevelTresh.createTresh(currentQuadrantKey.currentEnv)
        


        /** TEST *************************/
        for (let key in LOCATIONS_QUADRANTS) {
            const b = new THREE.Mesh(
                new THREE.BoxGeometry(55, 1000, 55),
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            )

            const p = key.split('_')
            b.position.set(
                +p[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
                1100,
                +p[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
            )
            studio.addToScene(b)
        }




        /** update every frame ***************/
        frameUpdater.on(data => {
            system_PlayerMoveOnLevel.update(data)
            if (!car.isFreeze) {
                car.update(data)
                const l = checkerChangeLocation.checkChanged(car._model.position.x, car._model.position.z)
                if (l) {
                    console.log('quadrants data', l)
                    /** arr/remove level tresh **********************/
                    this._changerLevelTresh.updateTrash(l.removedQs, l.addedQs)

                    /** add/remove  locations ************************/
                    if (LOCATIONS_QUADRANTS[l.oldKey]) {
                        console.log('remove', l.oldKey)
                        this._changerLocations.removeLocationFromScene(LOCATIONS_QUADRANTS[l.oldKey])
                    }
                    if (LOCATIONS_QUADRANTS[l.newKey]) {
                        console.log('add', l.newKey)
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

                //-4_-1
        setTimeout(() => {
            car.setTargetPosition(-4 * 2000 + 1000, 0, -1 * 2000 + 1000)
        }, 500)        


        /** body **************************/
        system_Level._items['body'].position.fromArray([-20, -60, -50])
        system_Level._items['body'].rotation.fromArray([0, 2, 0])
        studio.addToScene(system_Level._items['body'])


        /** add floor to player ********/
        studio.addToScene(system_Level._items['level_000_000'])
        system_PlayerMoveOnLevel.addItemToPlayerCollision(system_Level._items['level_000_000'])



        ui.showStartButton(() => {
            studio.changeEnvironment(START_ENV_CONFIG_3, { updateAmb: false, time: 1500 })
            player.toggleBlocked(false)
        })
    }
}



const createChangerLocations = root => {
    const {
        studio,
        car,
        system_Level,
        system_PlayerMoveOnLevel,
        system_PlayerNearLevelItems,
    } = root

    /** add/remove locations by key */
    const addLocationToScene = (keyLocation, x, z) => {
        const { mesh, carCollision } = system_Level.locations[keyLocation]
        mesh.position.set(x, 0, z)
        studio.addToScene(mesh)
        system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
        carCollision.position.set(x, 0, z)
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


    return {
        removeLocationFromScene,
        addLocationToScene,
    }
}



const createManagerLevelTrash = root => {
    const {
        studio,
        car,
        system_PlayerMoveOnLevel,
        materials,
    } = root

    const arrTrash = []

    const trashGeom = new THREE.BoxGeometry(30, 50, 30)  
    const trashCollisionGeom = new THREE.BoxGeometry(45, 50, 45)  
    const trashMat = materials.wallVirtual


    const addItems = arr => {
        for (let i = 0; i < arr.length; ++i) {
            const rCount = Math.floor(Math.random() * 10)
            for (let j = 0; j < rCount; ++j) {
                const p = arr[i].split('_')
                
                const b = new THREE.Mesh(
                    trashGeom,
                    trashMat,
                )
                b.position.set(
                    +p[0] * SIZE_QUADRANT + Math.random() * SIZE_QUADRANT,
                    -50,
                    +p[1] * SIZE_QUADRANT + Math.random() * SIZE_QUADRANT,
                )
                studio.addToScene(b)
                system_PlayerMoveOnLevel.addItemToPlayerCollision(b)
                
                const c = new THREE.Mesh(
                    trashCollisionGeom,
                    trashMat,
                )
                c.visible = false
                c.position.copy(b.position)
                studio.addToScene(c)
                car.setCollisionForDraw(c)
                
            
                arrTrash.push({ 
                    mesh: b,
                    meshCollision: c, 
                    keyLocation: arr[i]
                })
            }
        }
    } 


    const removeItems = arr => {
        for (let i = 0; i < arrTrash.length; ++i) {
            for (let j = 0; j < arr.length; ++j) {
                if (arrTrash[j].keyLocation === arr[i]) {
                    studio.removeFromScene(arrTrash[j].mesh)
                    studio.removeFromScene(arrTrash[j].meshCollision)
                    system_PlayerMoveOnLevel.removeItemFromPlayerCollision(arrTrash[j].mesh)
                    car.removeCollisionForDraw(arrTrash[j].meshCollision)
                }
            }
        }
    }



    return {
        updateTrash: (removeArr, addArr) => {
            removeItems(removeArr)
            addItems(addArr)                
        },
        createTresh: (arr) => {
            addItems(arr)                
        },
    }
}