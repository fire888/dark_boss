import * as THREE from 'three'
import {
    SIZE_QUADRANT,
} from '../constants/constants_elements';
import { createMeshGallery } from '../Entities/meshGallery'

export const createLevelArea = root => {
    const {
        studio,
        car,
        system_PlayerMoveOnLevel,
        materials,
    } = root

    let arrTrash = []

    const floorGeom = new THREE.PlaneGeometry(SIZE_QUADRANT, SIZE_QUADRANT)
    materials.floorMat.map.wrapS = materials.floorMat.map.wrapT = 80
    materials.floorMat.map.repeat.set(50, 50)

    const addItems = arr => {
        for (let i = 0; i < arr.length; ++i) {
            /** add floor */
            const p = arr[i].split('_')
            const x = +p[0] * SIZE_QUADRANT
            const z = +p[1] * SIZE_QUADRANT
            const y = -50
            const floor = new THREE.Mesh(floorGeom, materials.floorMat)
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
            const rCount = Math.floor(Math.random() * 3)
            for (let j = 0; j < rCount; ++j) {
                console.log('!!!!!!!!!!!!!!!!! new tresh')

                const { mesh, meshCollision, meshCollisionCar } = createMeshGallery(root)
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

                arrTrash.push({ mesh, meshCollision, meshCollisionCar, keyLocation: arr[i], type: 'trash' })
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
            const { mesh, meshCollision, meshCollisionCar } = arrToRemove[i]
            studio.removeFromScene(mesh)
            arrToRemove[i].mesh.geometry.dispose()
            delete arrToRemove[i].mesh

            if (meshCollision) {
                system_PlayerMoveOnLevel.removeItemFromPlayerCollision(meshCollision)
                studio.removeFromScene(meshCollision)
                arrToRemove[i].meshCollision.geometry.dispose()
                delete arrToRemove[i].meshCollision
            }

            if (meshCollisionCar) {
                car.removeCollisionForDraw(meshCollisionCar)
                studio.removeFromScene(meshCollisionCar)
                arrToRemove[i].meshCollisionCar.geometry.dispose()
                delete arrToRemove[i].meshCollisionCar
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