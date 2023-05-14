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


const findFuel = (root) => {
    return new Promise(res => {
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
        } = root

        system_PlayerNearLevelItems.setItemToCheck(fuel.mesh, 'nearFuel', 60, 60)
        const unsubscribe = emitter.subscribe('checkNear')(data => {
            if (data.item !== 'nearFuel') {
                return;
            }
            console.log('!!!')
            unsubscribe()
            system_PlayerNearLevelItems.removeItemFromCheck(fuel.mesh)
            res()
        })
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
        emitter,
        frameUpdater,
        fuel,
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

    await startFly(root)
    studio.changeFog(FOG_CONF_02)
    await easyFly(root, -8000)

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
    ++countStruct

    const coordsFuel = structure.getCoordsForItem('easyItem')
    root.studio.addToScene(fuel.mesh)
    //fuel.mesh.position.set(...coordsFuel)
    fuel.mesh.position.set(-200, 0, 0)

    await pause(200)
    flyer.mesh.position.z = 8000

    const fullDiff2 = 8000
    const unsubscribe2 = frameUpdater.on(data => {
        flyer.arrow.rotation.z = ((8000 - flyer.mesh.position.z) / fullDiff2) * (Math.PI / 4) + (Math.PI / 4)
    })

    player.toggleBlocked = false
    setTimeout(() => studio.changeFog(FOG_CONF),1000)
    await easyFly(root, 1000)
    await endFly(root)

    unsubscribe2()



    dispatcher.dispatch({ type: 'CLICK_DRAW' })
    player.mesh.position.add(flyer.mesh.position)
    studio.addToScene(root.player.mesh)

    await findFuel(root)
    studio.removeFromScene(fuel.mesh)

    flyer.arrow.rotation.z = 0
    system_PlayerNearLevelItems.setItemToCheck(flyer.objectForCheck, 'platformObjectForCheck', 20, 30)

}



export const flyToNewStructure = root => {
    flyProcess(root).then()
}
