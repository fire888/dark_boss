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
import { createSustemSprites } from '../systems/sustem_sprites';



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
        this._changerLevelTresh = createLevelArea(this._root)
        this._systemSprites = createSustemSprites(this._root)   
        this._changerLevelTresh.createTresh(currentQuadrantKey.currentEnv)
 



        /** update every frame ***************/
        frameUpdater.on(data => {
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
//
// <<<<<<< HEAD
//
//
// const createChangerLocations = root => {
//     const {
//         studio,
//         car,
//         system_Level,
//         system_PlayerMoveOnLevel,
//         system_PlayerNearLevelItems,
//     } = root
//
//     /** TEST *************************/
//     // for (let key in LOCATIONS_QUADRANTS) {
//     //     const b = new THREE.Mesh(
//     //         new THREE.BoxGeometry(55, 1000, 55),
//     //         new THREE.MeshBasicMaterial({ color: 0xff0000 })
//     //     )
//
//     //     const p = key.split('_')
//     //     b.position.set(
//     //         +p[0] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
//     //         4100,
//     //         +p[1] * SIZE_QUADRANT + SIZE_QUADRANT / 2,
//     //     )
//     //     studio.addToScene(b)
//     // }
//
//
//     // /** super */
//     const createSuper = () => {
//         const superP = createMeshSuper(root)
//         superP.meshCollision.visible = false
//         superP.meshCollisionCar.visible = false
//         superP.meshFinish.position.copy(superP.mesh.position)
//         return superP
//     }
//
//     const s = {
//         location01: createSuper(),
//         location02: createSuper(),
//         location03: createSuper(),
//     }
//     //const s2 = createSuper()
//     //const s3 = createSuper()
//
//
//
//
//
//
//     setTimeout(() => {
//         for (let key in LOCATIONS_QUADRANTS) {
//             const p = key.split('_')
//             const x = +p[0] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
//             const z = +p[1] * SIZE_QUADRANT  + SIZE_QUADRANT / 2
//             const y = 0
//             system_Level.locations[LOCATIONS_QUADRANTS[key]].mesh.position.set(x, y, z)
//             //studio.addToScene(system_Level.locations[LOCATIONS_QUADRANTS[key]].mesh)
//         }
//     }, 500)
//
//
//
//     /** add/remove locations by key */
//     const addLocationToScene = (keyLocation, x, z) => {
//         const { mesh, meshCollision, meshCollisionCar, meshFinish, lastXYZ } = s[keyLocation]
//
//         const y = -42
//
//         mesh.position.set(x, y, z)
//         studio.addToScene(mesh)
//
//         system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)
//         meshCollision.visible = false
//         meshCollision.position.set(x, y, z)
//         studio.addToScene(meshCollision)
//
//         car.setCollisionForDraw(meshCollisionCar)
//         meshCollisionCar.visible = false
//         meshCollisionCar.position.set(x, y, z)
//         studio.addToScene(meshCollisionCar)
//
//         meshFinish.position.set(x, y, z)
//         meshFinish.position.x += lastXYZ[0]
//         meshFinish.position.y += lastXYZ[1]
//         meshFinish.position.z += lastXYZ[2]
//         studio.addToScene(meshFinish)
//         system_PlayerNearLevelItems.setItemToCheck(meshFinish, 'nearPerson_' + keyLocation, 28)
//     }
//
//     const removeLocationFromScene = keyLocation => {
//         const { mesh, meshCollision, meshCollisionCar, meshFinish } = s[keyLocation]
//
//         studio.removeFromScene(mesh)
//
//         system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
//         studio.removeFromScene(meshCollision)
//
//         studio.removeFromScene(meshCollisionCar)
//         car.removeCollisionForDraw(meshCollisionCar)
//
//         studio.removeFromScene(meshFinish)
//         system_PlayerNearLevelItems.removeItemFromCheck(meshFinish)
//     }
//
//
//     /** TODO: remove */
//     addLocationToScene('location01', 0, 0)
//
//
//     return {
//         removeLocationFromScene,
//         addLocationToScene,
//     }
// }
//
//
//
// const createManagerLevelTrash = root => {
//     const {
//         studio,
//         car,
//         system_PlayerMoveOnLevel,
//         materials,
//     } = root
//
//     let arrTrash = []
//
//     /** test stairs */
//     const stairs = createMeshStairs(root)
//     stairs.mesh.position.set(400, -42, -1000)
//     studio.addToScene(stairs.mesh)
//     stairs.meshCollision.visible = false
//     stairs.meshCollision.position.copy(stairs.mesh.position)
//     studio.addToScene(stairs.meshCollision)
//     system_PlayerMoveOnLevel.addItemToPlayerCollision(stairs.meshCollision)
//
//
//     // /** super */
//     // const superP = createMeshSuper(root)
//     // superP.mesh.position.set(0, -42, 0)
//     // studio.addToScene(superP.mesh)
//
//     // superP.meshCollision.visible = false
//     // superP.meshCollision.position.copy(superP.mesh.position)
//     // studio.addToScene(superP.meshCollision)
//     // system_PlayerMoveOnLevel.addItemToPlayerCollision(superP.meshCollision)
//
//     // superP.meshCollisionCar.visible = false
//     // superP.meshCollisionCar.position.copy(superP.mesh.position)
//     // studio.addToScene(superP.meshCollisionCar)
//     // car.setCollisionForDraw(superP.meshCollisionCar)
//
//     // superP.meshFinish.position.copy(superP.mesh.position)
//     // studio.addToScene(superP.meshFinish)
//
//
//
//     const floorGeom = new THREE.PlaneGeometry(SIZE_QUADRANT, SIZE_QUADRANT)
//
//     materials.floorMat.map.wrapS = materials.floorMat.map.wrapT = 80
//     materials.floorMat.map.repeat.set(50, 50)
//
//     const addItems = arr => {
//         for (let i = 0; i < arr.length; ++i) {
//             /** add floor */
//             const p = arr[i].split('_')
//             const x = +p[0] * SIZE_QUADRANT
//             const z = +p[1] * SIZE_QUADRANT
//             const y = -50
//             const floor = new THREE.Mesh(floorGeom, materials.floorMat)
//             floor.rotation.x = -Math.PI / 2
//             floor.position.set(x, y - 12, z)
//             studio.addToScene(floor)
//             arrTrash.push({
//                 mesh: floor,
//                 keyLocation: arr[i],
//                 type: 'floor',
//             })
//             system_PlayerMoveOnLevel.addItemToPlayerCollision(floor)
//
//
//
//             /** add trash ******************/
//             const rCount = Math.floor(Math.random() * 3)
//             for (let j = 0; j < rCount; ++j) {
//                 console.log('!!!!!!!!!!!!!!!!! new tresh')
//
//                 const { mesh, meshCollision, meshCollisionCar } = createMeshGallery(root)
//                 mesh.position.set(
//                     x + Math.random() * SIZE_QUADRANT,
//                     -60,
//                     z + Math.random() * SIZE_QUADRANT,
//                 )
//                 studio.addToScene(mesh)
//
//                 meshCollision.visible = false
//                 meshCollision.position.copy(mesh.position)
//                 studio.addToScene(meshCollision)
//                 system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)
//
//                 meshCollisionCar.visible = false
//                 meshCollisionCar.position.copy(mesh.position)
//                 studio.addToScene(meshCollisionCar)
//                 car.setCollisionForDraw(meshCollisionCar)
//
//                 arrTrash.push({ mesh, meshCollision, meshCollisionCar, keyLocation: arr[i], type: 'trash' })
//             }
//         }
//     }
//
//
//     const removeItems = arr => {
//         const arrToRemove = []
//         for (let i = 0; i < arr.length; ++i) {
//             for (let j = 0; j < arrTrash.length; ++j) {
//                 if (arr[i] === arrTrash[j].keyLocation) {
//                     arrToRemove.push(arrTrash[j])
//                 }
//             }
//         }
//
//         arrTrash = arrTrash.filter(item => {
//             for (let i = 0; i < arr.length; ++i) {
//                 if (item.keyLocation === arr[i]) {
//                     return false;
//                 }
//             }
//             return true;
//         })
//
//         for (let i = 0; i < arrToRemove.length; ++i) {
//             const { mesh, meshCollision, meshCollisionCar } = arrToRemove[i]
//             studio.removeFromScene(mesh)
//             arrToRemove[i].mesh.geometry.dispose()
//             delete arrToRemove[i].mesh
//
//             if (meshCollision) {
//                 system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
//                 studio.removeFromScene(meshCollision)
//                 arrToRemove[i].meshCollision.geometry.dispose()
//                 delete arrToRemove[i].meshCollision
//             }
//
//             if (meshCollisionCar) {
//                 car.removeCollisionForDraw(meshCollisionCar)
//                 studio.removeFromScene(meshCollisionCar)
//                 arrToRemove[i].meshCollisionCar.geometry.dispose()
//                 delete arrToRemove[i].meshCollisionCar
//             }
//         }
//     }
//
//
//
//     return {
//         updateTrash: (removeArr, addArr) => {
//             removeItems(removeArr)
//             addItems(addArr)
//         },
//         createTresh: (arr) => {
//             addItems(arr)
//         },
//     }
// }
// =======
// >>>>>>> e3bfeb3a59b452320a6f831c6420d36ae13e4735
