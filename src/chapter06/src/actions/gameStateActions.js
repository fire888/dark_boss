import { getRandomCoordsOfRoom } from "../Entities/town/help";
import { pipelineToRed } from './catScenes'
import {
    ENV_RED,
    ENV_NORMAL,
} from '../constants/constants_elements'
import {set} from "ramda";

const STATUE_PLAYER_OFFSET = 45


const updateEmptyRooms = root => {
    let count = 0
    let fOnComplete = () => {}

    return {
        update: () => {
            console.log('room walk', count)

            ++count
            if (count === 5) {
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        }
    }
}


const updateRoomsStatueHide = root => {
    const {
        statue,
        //system_PlayerMoveOnLevel,
        player,
        emitter,
    } = root

    let count = 0
    let fOnComplete = () => {}
    let timer = null

    let isCanHide = true
    const stopperListen = emitter.subscribe('playerMove')(dir => {
        if (isCanHide)
            if (
                Math.abs(player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
                Math.abs(player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
            ) {
                statue.hide()
                clearTimeout(timer)
                isCanHide = false
            }
    })



    return {
        update: (r) => {
            console.log('room walk - appear hide', count)

            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
            isCanHide = true
            timer = setTimeout(() => {
                isCanHide = false
                statue.hide()
            }, Math.random() * 3000)
            ++count
            if (count === 5) {
                stopperListen()
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        },
        name: 'updateRoomsStatueHide',
    }
}


const updateRoomsStatueNotHide = (root) => {
    const {
        statue,
        //system_PlayerMoveOnLevel,
        player,
        emitter,
    } = root

    let count = 0
    let fOnComplete = () => {}


    let isCanHide = true
    const stopperListen = emitter.subscribe('playerMove')(dir => {
        if (isCanHide)
            if (
                Math.abs(player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
                Math.abs(player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
            ) {
                statue.hide()
                isCanHide = false
            }
    })

    return {
        update: (r) => {
            console.log('room walk - appear, hide near', count)
            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
            isCanHide = true
            ++count
            if (count === 5) {
                statue.hide()
                stopperListen()
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        },
        name: 'updateRoomsStatueNotHide',
    }
}


const updateRoomsStatueNotHideCollision = root => {
    const {
        statue,
        system_PlayerMoveOnLevel,
    } = root


    let count = 0
    let fOnComplete = () => {}

    system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)


    return {
        update: (r) => {
            console.log('room walk - appear hot hide', count)
            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
            ++count
            if (count === 5) {
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        },
        name: 'updateRoomsStatueNotHideCollision',
    }
}


const invertWorld = root => {
    console.log('invert!!!')
    const {
        statue,
        system_PlayerMoveOnLevel,
        studio,
        worldReal,
    } = root


    let count = 0
    let fOnComplete = () => {}

    system_PlayerMoveOnLevel.removeItemFromPlayerCollision(statue.mCollision)
    system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)


    let isInverted = false

    return {
        update: (r) => {
            console.log('invert', count)
            if (!isInverted) {
                statue.toRed()
                worldReal.toNotWalls()
                studio.changeEnvironment(ENV_RED, { time: 100 })
            }  else {
                worldReal.toNormal()
                statue.toBlack()
                studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
            }
            isInverted = !isInverted

            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
            ++count
            if (count === 6) {
                statue.hide()
                studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
                system_PlayerMoveOnLevel.removeItemFromPlayerCollision(statue.mCollision)
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        },
        name: 'invertWorld',
    }
}


const addEndStone = root => {
    let fOnComplete = () => {}

    const NEAR = 15

    const {
        //worldReal,
        statue,
        emitter,
        player,
        //studio,
        //system_PlayerMoveOnLevel,
    } = root

    //statue.hide()

    const stopperListen = emitter.subscribe('playerMove')(dir => {
        if (
            Math.abs(player.mesh.position.x - statue.m.position.x) > NEAR ||
            Math.abs(player.mesh.position.z - statue.m.position.z) > NEAR
        ) {
            return
        }

        stopperListen()
        pipelineToRed(root).then(fOnComplete)
    })


    return {
        update: r => {
            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
        },
        onComplete: f => {
            fOnComplete = f
        },
        name: 'addEndStone',
    }
}


const setStatueOnEndStone = root => {
    let fOnComplete = () => {}

    const {
        statue,
        emitter,
        player,
        worldReal,
        studio,
    } = root

    worldReal.toNotWalls()
    statue.toRed()
    studio.changeEnvironment(ENV_RED, { time: 100 })

    statue.m.position.x = 1500
    statue.m.position.y = -45
    statue.m.position.z = 1495
    statue.m.rotation.y = 0
    statue.m.rotation.x = -Math.PI / 2
    statue.appear()


    const stopperListen = emitter.subscribe('playerMove')(dir => {
        if (
            Math.abs(player.mesh.position.x - statue.m.position.x) > STATUE_PLAYER_OFFSET ||
            Math.abs(player.mesh.position.z - statue.m.position.z) > STATUE_PLAYER_OFFSET
        ) {
            return;
        }
        stopperListen()
        fOnComplete()
    })

    return {
        update: r => {},
        onComplete: f => {
            fOnComplete = f
        },
        name: 'setStatueOnEndStone',
    }
}



const logComplete = root => {
    let fOnComplete = () => {}
    return {
        update: () => {
            console.log('logger !!!')
            fOnComplete()
        },
        onComplete: f => fOnComplete = f,
    }
}


export const ARR_STATES = [
    //addEndStone,


    updateEmptyRooms,
    //logComplete,



    updateRoomsStatueHide,
    //logComplete,

    updateRoomsStatueNotHide,
    //logComplete,

    updateRoomsStatueNotHideCollision,
    //logComplete
    addEndStone,
    logComplete,

    updateEmptyRooms,

    invertWorld,
    logComplete,

    setStatueOnEndStone,
    logComplete,
]


