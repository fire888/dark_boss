import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from 'three'
import { FINAL_STRUCTURE, FINAL_MAP, FINAL_ENV_COLOR } from "../constants/const_structures";
import {
    STRUCTURES,
    FOG_CONF,
    FOG_CONF_02,
    H,
    W,
} from "../constants/constants_elements";


const pause = t => new Promise(res => setTimeout(res, t))

const startFly = (root) => {
    const {
        flyer,
        frameUpdater,
    } = root

    return new Promise(res => {
        let spd = 0
        const unsubscribe1 = frameUpdater.on(data => {
            flyer.mesh.position.z += spd
        })

        const vals = { spd: 0 }
        new TWEEN.Tween(vals)
            .to({ spd: -20, }, 5000)
            .onUpdate(() => {
                spd = vals.spd
            })
            .onComplete(() => {
                unsubscribe1()
                res()
            })
            .start()
    })
}

const easyFly = (root, targetZ) => {
    return new Promise(res => {
        const {
            flyer,
            frameUpdater,
        } = root

        const unsubscribe1 = frameUpdater.on(data => {
            flyer.mesh.position.z += -20 * data.count
            if (flyer.mesh.position.z < targetZ) {
                unsubscribe1()
                res()
            }
        })
    })
}

const endFly = (root, z = 250) => {
    const {
        flyer,
    } = root

    return new Promise(res => {


        const vals = { z: flyer.mesh.position.z }
        new TWEEN.Tween(vals)
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ z: z, }, 1000)
            .onUpdate(() => {
                flyer.mesh.position.z = vals.z
            })
            .onComplete(res)
            .start()
    })
}


const animateFuelBarMore = () => {
    const bar = document.createElement('div')
    bar.style.backgroundColor = '#ffff00'
    bar.style.minHeight = '15px'
    bar.style.minWidth = '1px'
    bar.style.position = 'absolute'
    bar.style.right = '15px'
    bar.style.top = '65px'
    bar.classList.add('fuel-bar')
    const wrapper = document.querySelector('.canvas-wrapper')
    wrapper.appendChild(bar)

    const vals = { w: 0 }
    new TWEEN.Tween(vals)
        .to({ w: 250, }, 2000)
        .onUpdate(() => {
            bar.style.minWidth = vals.w + 'px'
        })
        .start()

}

const animateFuelBarLess = (root) => {
    const bar = document.querySelector('.fuel-bar')
    const vals = { w: 0 }
    new TWEEN.Tween(vals)
        .to({ w: 1, }, 2000)
        .onUpdate(() => {
            bar.style.minWidth = (1 - vals.w) * 250 + 'px'
            root.flyer.arrow.rotation.z = (1 - vals.w) * (Math.PI / 2)
        })
        .onComplete(() => {
            bar.parentNode.removeChild(bar)
            bar.remove()
        })
        .start()
}


const findFuel = (root) => {
    return new Promise(res => {
        const {
            system_PlayerNearLevelItems,
            emitter,
            fuel,
        } = root

        system_PlayerNearLevelItems.setItemToCheck(fuel.mesh, 'nearFuel', 30, 30)
        const unsubscribe = emitter.subscribe('checkNear')(data => {
            if (data.item !== 'nearFuel') {
                return;
            }
            unsubscribe()
            system_PlayerNearLevelItems.removeItemFromCheck(fuel.mesh)
            res()
        })
    })
}


const goToPlatform = (root) => {
    return new Promise(res => {
        const {
            flyer,
            system_PlayerNearLevelItems,
            emitter,
            frameUpdater,
            fuel,
        } = root

        system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)
        const unsubscribe = emitter.subscribe('checkNear')(data => {
            if (data.item === 'platformObjectForCheck') {
                system_PlayerNearLevelItems.removeItemFromCheck(flyer.objectForCheck)
                unsubscribe()
                animateFuelBarLess(root)
                setTimeout(res, 2000)
            }
        })
    })

}



let countStruct = 1

async function flyProcess (root, onComplete) {
    const {
        flyer,
        structure,
        dispatcher,
        system_PlayerNearLevelItems,
        player,
        studio,
        emitter,
        frameUpdater,
        fuel,
        system_Sound,
    } = root

    await pause(20)

    if (!STRUCTURES[countStruct]) {
        return void onComplete()
    }


    system_PlayerNearLevelItems.removeItemFromCheck(flyer.objectForCheck)
    dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false })

    player.mesh.position.sub(flyer.mesh.position)
    flyer.mesh.add(root.player.mesh)


    const fullDiff = 8000
    const unsubscribe = frameUpdater.on(data => {
        flyer.arrow.rotation.z = (Math.abs(flyer.mesh.position.z) / fullDiff) * (Math.PI / 4)
    })

    system_Sound.startCar()
    await startFly(root)
    studio.changeFog({
        ...STRUCTURES[countStruct - 1].FOG, 
        color: STRUCTURES[countStruct - 1].ENV_COLOR 
    })
    await easyFly(root, -8000)
    studio.changeEnvColor(STRUCTURES[countStruct].ENV_COLOR)
    await pause(3000)
    
    unsubscribe()

    player.toggleBlocked = true
    emitter.emit('keyEvent')({
        'up': false,
        'down': false,
        'left': false,
        'right': false,
        'p': false,
    })
    structure.destroyStructure()
    await structure.generateStructure(STRUCTURES[countStruct])

    const coordsFuel = structure.getCoordsForItem('easyItem')
    root.studio.addToScene(fuel.mesh)
    fuel.mesh.position.set(
        coordsFuel[0] * W + STRUCTURES[countStruct].X,
        coordsFuel[1] * H + STRUCTURES[countStruct].Y + (H / 2),
        coordsFuel[2] * W + STRUCTURES[countStruct].Z
    )

    await pause(200)
    flyer.mesh.position.z = 8000

    const fullDiff2 = 8000
    const unsubscribe2 = frameUpdater.on(data => {
        flyer.arrow.rotation.z = ((8000 - flyer.mesh.position.z) / fullDiff2) * (Math.PI / 4) + (Math.PI / 4)
    })

    player.toggleBlocked = false
    setTimeout(() => studio.changeFog(STRUCTURES[countStruct].FOG),1000)
    await easyFly(root, 1000)
    await endFly(root)
    system_Sound.stopCar()

    unsubscribe2()

    dispatcher.dispatch({ type: 'CLICK_DRAW' })
    player.mesh.position.add(flyer.mesh.position)
    studio.addToScene(root.player.mesh)

    await findFuel(root)
    animateFuelBarMore()
    studio.removeFromScene(fuel.mesh)

    await goToPlatform(root)

    if (player.mesh.position.distanceTo(flyer.objectForCheck.getWorldPosition()) < 20) {
        dispatcher.dispatch({
            type: 'TOGGLE_BUTTON_DRAW_CAR',
            is: true
        })
    }

    system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)

    const unsubscribeCheckNearPlatform = root.emitter.subscribe('checkNear')(data => {
        if (data.item === 'platformObjectForCheck' && data.is) {
            dispatcher.dispatch({
                type: 'TOGGLE_BUTTON_DRAW_CAR',
                is: true
            })
        }
        if (data.item === 'platformObjectForCheck' && !data.is) {
            dispatcher.dispatch({
                type: 'TOGGLE_BUTTON_DRAW_CAR',
                is: false
            })
        }
    })

    const unsubscribeClickMachineDraw = root.emitter.subscribe('clickMachineDraw')(() => {
        unsubscribeCheckNearPlatform()
        unsubscribeClickMachineDraw()
        flyToNewStructure(root) 
    })

    ++countStruct
}


async function flyProcessToFinal(root) {
    const {
        flyer,
        structure,
        dispatcher,
        system_PlayerNearLevelItems,
        player,
        studio,
        emitter,
        frameUpdater,
        fuel,
        system_Sound,
    } = root

    await pause(20)

    system_PlayerNearLevelItems.removeItemFromCheck(flyer.objectForCheck)
    dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false })

    player.mesh.position.sub(flyer.mesh.position)
    flyer.mesh.add(root.player.mesh)


    const fullDiff = 8000
    const unsubscribe = frameUpdater.on(data => {
        flyer.arrow.rotation.z = (Math.abs(flyer.mesh.position.z) / fullDiff) * (Math.PI / 4)
    })
    system_Sound.startCar()
    await startFly(root)
    studio.changeFog({
        ...STRUCTURES[countStruct - 1].FOG,
        color: STRUCTURES[countStruct - 1].ENV_COLOR
    })
    await easyFly(root, -8000)
    studio.changeEnvColor(FINAL_ENV_COLOR)
    await pause(3000)

    unsubscribe()

    player.toggleBlocked = true
    emitter.emit('keyEvent')({
        'up': false,
        'down': false,
        'left': false,
        'right': false,
        'p': false,
    })
    structure.destroyStructure()
    await structure.generateStructureFinal(FINAL_MAP, FINAL_STRUCTURE)

    await pause(200)
    flyer.mesh.position.z = 8000

    const fullDiff2 = 8000
    const unsubscribe2 = frameUpdater.on(data => {
        flyer.arrow.rotation.z = ((8000 - flyer.mesh.position.z) / fullDiff2) * (Math.PI / 4) + (Math.PI / 4)
    })

    player.toggleBlocked = false
    setTimeout(() => studio.changeFog(FINAL_STRUCTURE.FOG), 1000)
    await easyFly(root, 1000)
    await endFly(root)
    system_Sound.stopCar()

    root.studio.addToScene(root.finalItem.mesh)
    root.finalItem.mesh.position.set(-160 * 5.75 - 40, -70, 160)
    root.system_PlayerMoveOnLevel.addItemToPlayerCollisionWalls(root.finalItem.mesh)

    unsubscribe2()

    dispatcher.dispatch({ type: 'CLICK_DRAW' })
    player.mesh.position.add(flyer.mesh.position)
    studio.addToScene(root.player.mesh)

    const finalTrigger = new THREE.Object3D()
    finalTrigger.position.set(-160 * 5.75 - 40, -800, 160)
    studio.addToScene(finalTrigger)
    system_PlayerNearLevelItems.setItemToCheck(finalTrigger, 'endGame', 400, 400)
    root.emitter.subscribe('checkNear')(data => {
        if (data.item === 'endGame' && data.is) {
            studio.changeFog({color: 0x20072a, near: 1, far: 5, time: 3000})
            setTimeout(() => {
                root.dispatcher.dispatch({ type: 'SHOW_FINAL_MESSAGE' })
                root.system_PlayerMoveOnLevel.isFreeze = true
            }, 5000)
        }
    })
}



export const flyToNewStructure = root => {
    flyProcess(root, () => {
        flyProcessToFinal(root).then()
    }).then()
}
