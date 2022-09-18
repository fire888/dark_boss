import * as THREE from 'three'
import {
    //START_ENV_CONFIG,
    //START_ENV_CONFIG_2,
    //START_ENV_CONFIG_3,
    LOCATIONS_QUADRANTS,
    SIZE_QUADRANT,
} from '../constants/constants_elements';
import { createCheckerChangeLocationKey } from '../components/checkerChangeLocationKey'

import { createMeshGallery } from '../Entities/meshGallery'
import {createGeomGallery} from "../Entities/geomGallery/geomGallery";


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
            if (data.item === 'nearPerson') {
                console.log('checkNear nearPerson !!!!!!', data)
            }
        })







        const checkerChangeLocation = createCheckerChangeLocationKey(SIZE_QUADRANT, car._model.position.x, car._model.position.z)
        let currentQuadrantKey = checkerChangeLocation.getCurrent()
        
        this._changerLocations = createChangerLocations(this._root)
        this._changerLevelTresh = createManagerLevelTrash(this._root)
        this._changerLevelTresh.createTresh(currentQuadrantKey.currentEnv)




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



const createChangerLocations = root => {
    const {
        studio,
        car,
        system_Level,
        system_PlayerMoveOnLevel,
        system_PlayerNearLevelItems,
    } = root

    /** TEST *************************/
    for (let key in LOCATIONS_QUADRANTS) {
        const b = new THREE.Mesh(
            new THREE.BoxGeometry(55, 1000, 55),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )

        const p = key.split('_')
        b.position.set(
            +p[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
            4100,
            +p[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
        )
        studio.addToScene(b)
    }

    setTimeout(() => {
        for (let key in LOCATIONS_QUADRANTS) {
            const p = key.split('_')
            const x = +p[0] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const z = +p[1] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
            const y = 0
            system_Level.locations[LOCATIONS_QUADRANTS[key]].mesh.position.set(x, y, z)
            studio.addToScene(system_Level.locations[LOCATIONS_QUADRANTS[key]].mesh)
        }
    }, 500)



    /** add/remove locations by key */
    const addLocationToScene = (keyLocation, x, z) => {
        const { mesh, carCollision, personOffset, personCollision } = system_Level.locations[keyLocation]

        mesh.position.set(x, 0, z)
        /**
        *studio.addToScene(mesh)
        */

        system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
        carCollision.position.set(x, 0, z)
        studio.addToScene(carCollision)
        car.setCollisionForDraw(carCollision)

        personCollision.position.set(personOffset[0] + x, personOffset[1], personOffset[2] + z)
        studio.addToScene(personCollision)
        system_PlayerNearLevelItems.setItemToCheck(personCollision, 'nearPerson_' + keyLocation, 28)
    }

    const removeLocationFromScene = keyLocation => {
        const { mesh, carCollision, personCollision} = system_Level.locations[keyLocation]

        /**
        * studio.removeFromScene(mesh)
        */
        system_PlayerMoveOnLevel.removeItemFromPlayerCollision(mesh)

        studio.removeFromScene(carCollision)
        car.removeCollisionForDraw(carCollision)

        studio.removeFromScene(personCollision)
        system_PlayerNearLevelItems.removeItemFromCheck(personCollision)
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

    let arrTrash = []

    const p = createMeshGallery(root)
    p.position.set(0, -63, -40)
    studio.addToScene(p)


    //const trashGeom = new THREE.BoxGeometry(30, 50, 30)
    const trashCollisionGeom = new THREE.BoxGeometry(45, 50, 45)  
    const trashMat = materials.wallVirtual
    const floorGeom = new THREE.PlaneGeometry(SIZE_QUADRANT, SIZE_QUADRANT)


    const addItems = arr => {
        for (let i = 0; i < arr.length; ++i) {
            /** add floor */
            const p = arr[i].split('_')
            const x = +p[0] * SIZE_QUADRANT
            const z = +p[1] * SIZE_QUADRANT
            const y = -50
            const floor = new THREE.Mesh(floorGeom, trashMat)
            floor.rotation.x = -Math.PI / 2
            floor.position.set(x, y - 12, z)
            studio.addToScene(floor)
            arrTrash.push({
                mesh: floor,
                keyLocation: arr[i],
                type: 'floor',
            })
            system_PlayerMoveOnLevel.addItemToPlayerCollision(floor)



            /** add trash ******************/
            //const rCount = Math.floor(Math.random() * 10)
            const rCount = Math.floor(Math.random() * 3)
            for (let j = 0; j < rCount; ++j) {
                console.log('!!!!!!!!!!!!!!!!! new tresh')

                //const mesh = new THREE.Mesh(trashGeom, trashMat,)
                const mesh = createMeshGallery(root)
                mesh.position.set(
                    x + Math.random() * SIZE_QUADRANT,
                    -63,
                    z + Math.random() * SIZE_QUADRANT,
                )
                studio.addToScene(mesh)
                system_PlayerMoveOnLevel.addItemToPlayerCollision(mesh)
                
                const meshCollision = new THREE.Mesh(trashCollisionGeom, trashMat)
                meshCollision.visible = false
                meshCollision.position.copy(mesh.position)
                studio.addToScene(meshCollision)
                car.setCollisionForDraw(meshCollision)
                arrTrash.push({ mesh, meshCollision, keyLocation: arr[i], type: 'trash' })
            }
        }
    } 


    const removeItems = arr => {
        const arrToRemove = []
        for (let i = 0; i < arr.length; ++i) {
            for (let j = 0; j < arrTrash.length; ++j) {
                if (arr[i] === arrTrash[j].keyLocation) {
                    arrToRemove.push(arrTrash[j])
                }
            }
        }

        arrTrash = arrTrash.filter(item => {
            for (let i = 0; i < arr.length; ++i) {
                if (item.keyLocation === arr[i]) {
                    return false;
                }
            }
            return true;
        })

        for (let i = 0; i < arrToRemove.length; ++i) {
            const { mesh, meshCollision } = arrToRemove[i]
            studio.removeFromScene(mesh)
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(mesh)
            if (meshCollision) {
                studio.removeFromScene(meshCollision)
                car.removeCollisionForDraw(meshCollision)
            }
            arrToRemove[i].mesh.geometry.dispose()
            delete arrToRemove[i].mesh
            delete arrToRemove[i].meshCollision
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