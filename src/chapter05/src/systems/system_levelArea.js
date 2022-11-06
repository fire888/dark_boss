// import * as THREE from 'three'
// import {
//     SIZE_QUADRANT,
// } from '../constants/constants_elements';
// import { createMeshGallery } from '../Entities/meshGallery'
//
//
//
// const createManagerBuilds = (root) => {
//     const arr = []
//     for (let i = 0; i < 30; ++i) {
//         const data = createMeshGallery(root)
//         const id = 'build_' + i
//         arr.push({...data, id, inScene: false })
//     }
//
//     return {
//         getItem: () => {
//             for (let i = 0; i < arr.length; ++i) {
//                 if (!arr[i].inScene) {
//                     arr[i].inScene = true
//                     return arr[i]
//                 }
//             }
//
//             return null
//         },
//         setFlagAsFree: id => {
//             for (let i = 0; i < arr.length; ++i) {
//                 if (arr[i].id === id) {
//                     arr[i].inScene = false
//                     break;
//                 }
//             }
//
//         }
//     }
// }




export const createLevelArea = root => {
    const {
        studio,
        car,
        system_PlayerMoveOnLevel,
        materials,
    } = root

    let arrTrash = []
    const managerBuilds = createManagerBuilds(root)

    const floorGeom = new THREE.PlaneGeometry(SIZE_QUADRANT, SIZE_QUADRANT)
    materials.floorMat.map.wrapS = materials.floorMat.map.wrapT = 80
    materials.floorMat.map.repeat.set(50, 50)

    const addItems = arr => {
        for (let i = 0; i < arr.length; ++i) {
            /** add floor */
            const p = arr[i].split('_')
            const x = +p[0] * SIZE_QUADRANT
            const z = +p[1] * SIZE_QUADRANT
            const y = -62
            const floor = new THREE.Mesh(floorGeom, materials.floorMat)
            floor.rotation.x = -Math.PI / 2
            floor.position.set(x, y, z)
            studio.addToScene(floor)
            arrTrash.push({
                mesh: floor,
                keyLocation: arr[i],
                type: 'floor',
            })
            system_PlayerMoveOnLevel.addItemToPlayerCollision(floor)



            /** add build ******************/
            const rCount = Math.floor(Math.random() * 8)
            for (let j = 0; j < rCount; ++j) {                
                const buildingData = managerBuilds.getItem()
                if (!buildingData) {
                    continue;
                }

                const { mesh, meshCollision, meshCollisionCar, id } = buildingData
                //console.log('!!!!!!!!!!!!!!!!! add Build ', id)
                mesh.position.set(
                    x + Math.random() * SIZE_QUADRANT,
                    -60,
                    z + Math.random() * SIZE_QUADRANT,
                )
                studio.addToScene(mesh)

                meshCollision.visible = false
                meshCollision.position.copy(mesh.position)
                studio.addToScene(meshCollision)
                system_PlayerMoveOnLevel.addItemToPlayerCollision(meshCollision)

                meshCollisionCar.visible = false
                meshCollisionCar.position.copy(mesh.position)
                studio.addToScene(meshCollisionCar)
                car.setCollisionForDraw(meshCollisionCar)

                arrTrash.push({ mesh, meshCollision, meshCollisionCar, keyLocation: arr[i], type: 'build', id })
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
            const { mesh, meshCollision, meshCollisionCar, type, id } = arrToRemove[i]
            studio.removeFromScene(mesh)
            system_PlayerMoveOnLevel.removeItemFromPlayerCollision(mesh)

            if (type === 'build') {
                system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
                studio.removeFromScene(meshCollision)
                //arrToRemove[i].meshCollision.geometry.dispose()
                //delete arrToRemove[i].meshCollision

                car.removeCollisionForDraw(meshCollisionCar)
                studio.removeFromScene(meshCollisionCar)
                //arrToRemove[i].meshCollisionCar.geometry.dispose()
                //delete arrToRemove[i].meshCollisionCar

                managerBuilds.setFlagAsFree(id)
            }

            if (type === 'floor') {
                arrToRemove[i].mesh.geometry.dispose()
                delete arrToRemove[i].mesh
            }
        }
    }



    return {
        updateAreas: (removeArr, addArr) => {
            removeItems(removeArr)
            addItems(addArr)
        },
        createArea: (arr) => {
            addItems(arr)
        },
        removeAll: () => {
            for (let i = 0; i < arrTrash.length; ++i) {
                const { mesh, meshCollision, meshCollisionCar } = arrTrash[i]

                studio.removeFromScene(mesh)
                system_PlayerMoveOnLevel.removeItemFromPlayerCollision(mesh)
                arrTrash[i].mesh.geometry.dispose()
                delete arrTrash[i].mesh

                if (meshCollision) {
                    system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
                    studio.removeFromScene(meshCollision)
                    arrTrash[i].meshCollision.geometry.dispose()
                    delete arrTrash[i].meshCollision
                }

                if (meshCollisionCar) {
                    car.removeCollisionForDraw(meshCollisionCar)
                    studio.removeFromScene(meshCollisionCar)
                    arrTrash[i].meshCollisionCar.geometry.dispose()
                    delete arrTrash[i].meshCollisionCar
                }
            }
        },
    }
}