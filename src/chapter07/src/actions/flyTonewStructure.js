import * as TWEEN from "@tweenjs/tween.js";
import {
    STRUCTURES,
    FOG_CONF,
    FOG_CONF_02,
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
            flyer.mesh.position.z += -20
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
        frameUpdater,
    } = root

    return new Promise(res => {
        //let spd = -20
        //const unsubscribe1 = frameUpdater.on(data => {
        //    flyer.mesh.position.z += spd
        //})

        const vals = { z: flyer.mesh.position.z }
        new TWEEN.Tween(vals)
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ z: z, }, 1000)
            .onUpdate(() => {
                flyer.mesh.position.z = vals.z
            })
            .onComplete(() => {
               // unsubscribe1()
                res()
            })
            .start()
    })
}

let countStruct = 1

async function flyProcess (root) {
    const {
        flyer,
        structure,
        dispatcher,
        system_PlayerNearLevelItems,
        player,
        studio,
    } = root

    await pause(20)

    system_PlayerNearLevelItems.removeItemFromCheck(flyer.objectForCheck)
    dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false })

    player.mesh.position.sub(flyer.mesh.position)
    flyer.mesh.add(root.player.mesh)


    await startFly(root)
    studio.changeFog(FOG_CONF_02)
    await easyFly(root, -8000)

    player.toggleBlocked = true
    structure.destroyStructure()
    await structure.generateStructure(STRUCTURES[countStruct])
    ++countStruct
    await pause(100)
    flyer.mesh.position.z = 8000
    player.toggleBlocked = false
    setTimeout(() => studio.changeFog(FOG_CONF),1000)
    await easyFly(root, 1000)
    await endFly(root)

    root.dispatcher.dispatch({ type: 'CLICK_DRAW' })
    root.system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)
    root.player.mesh.position.add(flyer.mesh.position)
    root.studio.addToScene(root.player.mesh)
}



export const flyToNewStructure = root => {
    flyProcess(root).then()
}
