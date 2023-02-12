import {getRandomCoordsOfRoom} from "../Entities/town/help";

// statue.m.position.x = 1500
// statue.m.position.y = -45
// statue.m.position.z = 1495
// statue.m.rotation.y = 0
// statue.m.rotation.x = -Math.PI / 2

const ENV_RED = { fogNear: 0, fogFar: 1000, colorFog: 0x880000, colorBack: 0x010101, backgroundImgKey: null }
const ENV_NORMAL =  { fogNear: 0, fogFar: 1000, colorFog: 0x455861, colorBack: 0x455861, backgroundImgKey: null }

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
        system_PlayerMoveOnLevel,
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
        system_PlayerMoveOnLevel,
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

    system_PlayerMoveOnLevel.addItemToPlayerCollision(statue.mCollision)


    let isInverted = false

    return {
        update: (r) => {
            console.log('invert', count)
            worldReal.invertColor()
            statue.invert()
            if (!isInverted) {
                studio.changeEnvironment(ENV_RED, { time: 100 })
            }  else {
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
    let count = 0

    const {
        worldReal,
    } = root

    return {
        update: r => {
            if (count === 1) {
                worldReal.addCentralItem()
                fOnComplete()
            }
            ++count

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

    worldReal.invertColor()
    statue.invert()
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
        alert('!!!')
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

    invertWorld,
    logComplete,

    setStatueOnEndStone,
    logComplete,
]


