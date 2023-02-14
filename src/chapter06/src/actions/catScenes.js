import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import {
    ENV_RED,
    ENV_NORMAL,
    ENV_RED_NEAR,
} from '../constants/constants_elements'

const pause = t => new Promise(res => setTimeout(res, t))

let q = null
let y = null
const lookTogether = (root, meshPlayer, meshStatue) => {
    y = meshStatue.position.y

    const obP = new THREE.Object3D()
    obP.position.copy(meshPlayer.position)
    obP.position.y = 0
    obP.rotation.copy(meshPlayer.rotation)

    const obS = new THREE.Object3D()
    obS.position.copy(meshStatue.position)
    obS.position.y = 0
    obS.rotation.copy(meshStatue.rotation)

    const qStatueSaved = obS.quaternion.clone()
    obS.lookAt(obP.position)
    const qStatueTarget = obS.quaternion.clone()

    const qPlayerSaved = obP.quaternion.clone()
    q = qPlayerSaved
    obP.lookAt(obS.position)
    obP.rotateX(.2)
    obP.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI) 
    const qPlayerTarget = obP.quaternion.clone()


    return new Promise(res => {
        const vals = { phase : 0 }
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                meshPlayer.quaternion.slerpQuaternions(qPlayerSaved, qPlayerTarget, vals.phase)
                meshStatue.quaternion.slerpQuaternions(qStatueSaved, qStatueTarget, vals.phase)
                meshStatue.position.y = y - (vals.phase * 10)
            })
            .onComplete(() => {

                const vals = { phase : 0 }
                new TWEEN.Tween(vals)
                    .to({ phase: 1, }, 500)
                    .onUpdate(() => {
                        meshStatue.translateZ(0.2)
                    })
                    .onComplete(() => {
                        res()
                    })
                    .start()
            })
            .start()
    })
}



const lookPlayerNormal = (p, s) => {
    const qPlayerSaved = p.quaternion.clone()

    return new Promise(res => {
        const vals = { phase : 0 }
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                p.quaternion.slerpQuaternions(qPlayerSaved, q, vals.phase)
            })
            .onComplete(res)
            .start()
    })
}



export async function pipelineToRed (root) {
    const {
        worldReal,
        statue,
        player,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    system_PlayerMoveOnLevel.toggleFreeze(true)
    worldReal.addCentralItem()
    studio.changeEnvironment(ENV_RED_NEAR, { time: 1500 })
    await lookTogether(root, player.mesh, statue.m)
    statue.toRed()
    worldReal.toNotWalls()
    system_PlayerMoveOnLevel.toggleFreeze(false)
    studio.changeEnvironment(ENV_RED, { time: 1500 })
    await lookPlayerNormal(player.mesh, statue.m)
    statue.hide()
    statue.m.position.y = y
    statue.m.position.y = y
}