// import { getRandomCoordsOfRoom } from "../Entities/town/help";
// import { pipelineToRed, endPipeLine } from './catScenes'
// import {
//     ENV_RED,
//     ENV_NORMAL,
// } from '../constants/constants_elements'
// import * as THREE from 'three'
//
//
// let COORD_END = { x: 0, z: 0 }
//
// const updateEmptyRooms = countMax => root => {
//     let count = 0
//     let fOnComplete = () => {}
//
//     return {
//         update: () => {
//             console.log('room walk', count)
//
//             ++count
//             if (count === countMax) {
//                 fOnComplete()
//             }
//         },
//         onComplete: f => {
//             fOnComplete = f
//         }
//     }
// }
//
//
// const updateRoomsStatueHide = root => {
//     const {
//         statue,
//         //system_PlayerMoveOnLevel,
//         player,
//         emitter,
//     } = root
//
//     let count = 0
//     let fOnComplete = () => {}
//     let timer = null
//
//     let isCanHide = true
//     const stopperListen = emitter.subscribe('playerMove')(dir => {
//         if (isCanHide)
//             if (
//                 Math.abs(player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
//                 Math.abs(player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
//             ) {
//                 statue.hide()
//                 clearTimeout(timer)
//                 isCanHide = false
//             }
//     })
//
//
//
//     return {
//         update: (r) => {
//             console.log('room walk - appear hide', count)
//             clearTimeout(timer)
//
//             timer = setTimeout(() => {
//                 const coord = getRandomCoordsOfRoom(r)
//                 statue.appear(coord.x, coord.z)
//                 isCanHide = true
//                 timer = setTimeout(() => {
//                     isCanHide = false
//                     statue.hide()
//                 }, Math.random() * 3000)
//
//                 ++count
//                 if (count === 5) {
//                     stopperListen()
//                     fOnComplete()
//                 }
//             }, Math.random() * 3000)
//         },
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'updateRoomsStatueHide',
//     }
// }
//
//
// const updateRoomsStatueNotHide = (root) => {
//     const {
//         statue,
//         //system_PlayerMoveOnLevel,
//         player,
//         emitter,
//     } = root
//
//     let count = 0
//     let fOnComplete = () => {}
//     let timer = null
//
//
//     let isCanHide = true
//     const stopperListen = emitter.subscribe('playerMove')(dir => {
//         if (isCanHide)
//             if (
//                 Math.abs(player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
//                 Math.abs(player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
//             ) {
//                 statue.hide()
//                 isCanHide = false
//             }
//     })
//
//     return {
//         update: (r) => {
//             console.log('room walk - appear, hide near', count)
//             clearTimeout(timer)
//
//             timer = setTimeout(() => {
//                 const coord = getRandomCoordsOfRoom(r)
//                 statue.appear(coord.x, coord.z)
//                 isCanHide = true
//                 ++count
//                 if (count === 5) {
//                     statue.hide()
//                     setTimeout(() => { statue.m.position.z = 5000}, 2000)
//                     stopperListen()
//                     fOnComplete()
//                 }
//             }, Math.random() * 5000)
//         },
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'updateRoomsStatueNotHide',
//     }
// }
//
//
// const updateRoomsStatueNotHideCollision = root => {
//     const {
//         statue,
//         system_PlayerMoveOnLevel,
//     } = root
//
//
//     let count = 0
//     let fOnComplete = () => {}
//     let timer = null
//
//     system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)
//
//
//     return {
//         update: (r) => {
//             console.log('room walk - appear hot hide', count)
//
//             timer = setTimeout(() => {
//                 const coord = getRandomCoordsOfRoom(r)
//                 statue.appear(coord.x, coord.z)
//                 ++count
//                 if (count === 5) {
//                     fOnComplete()
//                 }
//             }, Math.random() * 5000)
//         },
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'updateRoomsStatueNotHideCollision',
//     }
// }
//
//
// const invertWorld = root => {
//     const {
//         statue,
//         system_PlayerMoveOnLevel,
//         studio,
//         worldReal,
//     } = root
//
//
//     let count = 0
//     let fOnComplete = () => {}
//
//     system_PlayerMoveOnLevel.removeItemFromPlayerCollision(statue.mCollision)
//     system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)
//
//
//     let isInverted = false
//
//     return {
//         update: (r) => {
//             console.log('invert', count)
//             if (!isInverted) {
//                 statue.toRed()
//                 worldReal.toNotWalls()
//                 studio.changeEnvironment(ENV_RED, { time: 100 })
//             }  else {
//                 worldReal.toNormal()
//                 statue.toBlack()
//                 studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
//             }
//             isInverted = !isInverted
//
//             const coord = getRandomCoordsOfRoom(r)
//             statue.appear(coord.x, coord.z)
//             ++count
//             if (count === 6) {
//                 statue.hide()
//                 studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
//                 system_PlayerMoveOnLevel.removeItemFromPlayerCollision(statue.mCollision)
//                 fOnComplete()
//             }
//         },
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'invertWorld',
//     }
// }
//
//
// const addEndStone = root => {
//     let fOnComplete = () => {}
//
//     const NEAR = 20
//
//     const {
//         statue,
//         emitter,
//         player,
//         worldReal,
//     } = root
//
//     const stopperListen = emitter.subscribe('playerMove')(dir => {
//         if (
//             Math.abs(player.mesh.position.x - statue.m.position.x) > NEAR ||
//             Math.abs(player.mesh.position.z - statue.m.position.z) > NEAR
//         ) {
//             return
//         }
//
//         stopperListen()
//         COORD_END = worldReal.getCoordsForFinalBox(player.mesh.position.x, player.mesh.position.z)
//         if (COORD_END) {
//             pipelineToRed(root, [COORD_END.x, COORD_END.z]).then(fOnComplete)
//         }
//     })
//
//
//     return {
//         update: r => {
//             const coord = getRandomCoordsOfRoom(r)
//             statue.appear(coord.x, coord.z)
//         },
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'addEndStone',
//     }
// }
//
//
// const setStatueOnEndStone = root => {
//     let fOnComplete = () => {}
//
//     const {
//         statue,
//         emitter,
//         player,
//         worldReal,
//         studio,
//         system_PlayerMoveOnLevel,
//     } = root
//
//
//     worldReal.toNotWalls()
//     statue.toRed()
//     studio.changeEnvironment(ENV_RED, { time: 100 })
//
//
//     statue.m.position.set(COORD_END.x, -43.5, COORD_END.z)
//     system_PlayerMoveOnLevel.addItemToPlayerCollision(worldReal.centralItemBounds)
//     statue.m.rotation.set(0, 0, 0)
//     statue.m.rotation.x = -Math.PI / 2 - 0.027
//     statue.appear()
//     const posEnd = new THREE.Vector3()
//
//     const stopperListen = emitter.subscribe('playerMove')(dir => {
//         worldReal.endItemObj.getWorldPosition(posEnd)
//
//         if (
//             Math.abs(player.mesh.position.x - posEnd.x) > 30 ||
//             Math.abs(player.mesh.position.z - posEnd.z) > 30
//         ) {
//             return;
//         }
//         stopperListen()
//         endPipeLine(root).then(() => {
//             root.dispatcher.dispatch({ type: 'SHOW_FINAL_MESSAGE' })
//             fOnComplete()
//         })
//     })
//
//     return {
//         update: r => {},
//         onComplete: f => {
//             fOnComplete = f
//         },
//         name: 'setStatueOnEndStone',
//     }
// }
//
//
//
// const logComplete = root => {
//     let fOnComplete = () => {}
//     return {
//         update: () => {
//             console.log('logger !!!')
//             fOnComplete()
//         },
//         onComplete: f => fOnComplete = f,
//     }
// }
//
//
// export const ARR_STATES = [
//     updateEmptyRooms(6),
//     updateRoomsStatueHide,
//     updateRoomsStatueNotHide,
//     updateRoomsStatueNotHideCollision,
//     addEndStone,
//     logComplete,
//
//     setStatueOnEndStone,
//     logComplete,
// ]
//
//
