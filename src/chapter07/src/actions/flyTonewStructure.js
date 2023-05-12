// import * as THREE from 'three'
import * as TWEEN from "@tweenjs/tween.js";


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

const easyFly = (root, target) => {
    return new Promise(res => {
        const {
            flyer,
            frameUpdater,
        } = root

        const unsubscribe1 = frameUpdater.on(data => {
            flyer.mesh.position.z += -20
            if (flyer.mesh.position.z < target) {
                unsubscribe1()
                res()
            }
        })
    })
}

const endFly = (root) => {
    const {
        flyer,
        frameUpdater,
    } = root

    return new Promise(res => {
        let spd = -20
        const unsubscribe1 = frameUpdater.on(data => {
            flyer.mesh.position.z += spd
        })

        const vals = { spd: -20 }
        new TWEEN.Tween(vals)
            .to({ spd: 0, }, 1000)
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

async function flyProcess (root) {
    const {
        flyer,
    } = root

    await pause(20)

    root.system_PlayerNearLevelItems.removeItemFromCheck(flyer.objectForCheck)
    root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON_DRAW_CAR', is: false })

    root.player.mesh.position.sub(flyer.mesh.position)
    flyer.mesh.add(root.player.mesh)


    await startFly(root)
    await easyFly(root, -8000)
    await pause(100)

    flyer.mesh.position.z = 8000

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
