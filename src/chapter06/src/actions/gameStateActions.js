import {getRandomCoordsOfRoom} from "../Entities/town/help";

// statue.m.position.x = 1500
// statue.m.position.y = -45
// statue.m.position.z = 1495
// statue.m.rotation.y = 0
// statue.m.rotation.x = -Math.PI / 2

const ENV_RED = { fogNear: 0, fogFar: 1000, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
const ENV_NORMAL =  { fogNear: 0, fogFar: 1000, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }

const STATUE_PLAYER_OFFSET = 45


const updateEmptyRooms = (root, statue) => {
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


const updateRoomsStatueHide = (root, statue) => {
    let count = 0
    let fOnComplete = () => {}
    let timer = null

    let isCanHide = true
    const stopperListen = root.emitter.subscribe('playerMove')(dir => {
        if (isCanHide)
            if (
                Math.abs(root.player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
                Math.abs(root.player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
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
        }
    }
}


const updateRoomsStatueNotHide = (root, statue) => {
    let count = 0
    let fOnComplete = () => {}


    let isCanHide = true
    const stopperListen = root.emitter.subscribe('playerMove')(dir => {
        if (isCanHide)
            if (
                Math.abs(root.player.mesh.position.x - statue.m.position.x) < STATUE_PLAYER_OFFSET &&
                Math.abs(root.player.mesh.position.z - statue.m.position.z) < STATUE_PLAYER_OFFSET
            ) {
                statue.hide()
                isCanHide = false
            }
    })

    return {
        update: (r) => {
            console.log('room walk - appear hot hide', count)
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
        }
    }
}


const updateRoomsStatueNotHideCollision= (root, statue) => {
    let count = 0
    let fOnComplete = () => {}

    root.system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)


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
        }
    }
}


const invertWorld = (root, statue) => {
    let count = 0
    let fOnComplete = () => {}

    root.system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)


    let isInverted = false

    return {
        update: (r) => {

            root.worldReal.invertColor()
            statue.invert()
            if (!isInverted) {
                     root.studio.changeEnvironment(ENV_RED, { time: 100 })
                 }  else {
                     root.studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
            }

            console.log('invert', count)
            const coord = getRandomCoordsOfRoom(r)
            statue.appear(coord.x, coord.z)
            ++count
            if (count === 6) {
                statue.hide()
                root.studio.changeEnvironment(ENV_NORMAL, { time: 100 },)
                root.system_PlayerMoveOnLevel.removeItemFromPlayerCollision(statue.mCollision)
                fOnComplete()
            }
        },
        onComplete: f => {
            fOnComplete = f
        }
    }
}


const logComplete = (root) => {
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
    invertWorld,
    updateEmptyRooms,
    //logComplete,
    updateRoomsStatueHide,
    //logComplete,
    updateRoomsStatueNotHide,
    //logComplete,
    updateRoomsStatueNotHideCollision,
    //logComplete,
    invertWorld,
    logComplete,
]


