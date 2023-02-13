import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import {
    ENV_RED,
    ENV_NORMAL,
} from '../constants/constants_elements'

const pause = t => new Promise(res => setTimeout(res, t))


const lookTogether = (root, meshPlayer, meshStatue) => {
    const obP = new THREE.Object3D()
    obP.position.copy(meshPlayer.position)
    obP.position.y = 0
    obP.rotation.copy(meshPlayer.rotation)

    const obS = new THREE.Object3D()
    obS.position.copy(meshStatue.position)
    obS.position.y = 0
    obS.rotation.copy(meshStatue.rotation)

    //obP.translateZ(100)

    const qStatueSaved = obS.quaternion.clone()
    obS.lookAt(obP.position)
    const qStatueTarget = obS.quaternion.clone()

    obP.translateZ(-200)
    //obS.position.y = 20
    const qPlayerSaved = obP.quaternion.clone()
    obP.lookAt(obS.position)
    //obP.rotation.x -= .2
    //obP.rotation.y += Math.PI
    const qPlayerTarget = obP.quaternion.clone()


    return new Promise(res => {
        const vals = { phase : 0 }
        //const tween =
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                meshPlayer.quaternion.slerpQuaternions(qPlayerSaved, qPlayerTarget, vals.phase)
                meshStatue.quaternion.slerpQuaternions(qStatueSaved, qStatueTarget, vals.phase)
            })
            .onComplete(res)
            .start()
    })
}

export async function pipelineToRed (root) {
    const {
        worldReal,
        statue,
        emitter,
        player,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    system_PlayerMoveOnLevel.toggleFreeze(true)
    worldReal.addCentralItem()
    await lookTogether(root, player.mesh, statue.m)
    //await pause(2000)
    //statue.hide()
    //await pause(2000)
    statue.invert()
    //statue.appear()
    //await pause(2000)
    worldReal.invertColor()
    studio.changeEnvironment(ENV_RED, { time: 100 })
    system_PlayerMoveOnLevel.toggleFreeze(false)
    await pause(1000)
    statue.hide()
}