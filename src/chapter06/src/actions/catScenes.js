import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import {
    ENV_RED,
    ENV_NORMAL,
    ENV_RED_NEAR,
    ENV_END,
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

const  lookPlayerTo = (pM, toM) => {
    const qPlayerSaved = pM.quaternion.clone()

    const obP = new THREE.Object3D()
    obP.position.copy(pM.position)
    obP.position.y = 0

    const obS = new THREE.Object3D()
    obS.position.copy(toM.position)
    obS.position.y = 0
    obP.lookAt(obS.position)
    obP.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
    const qPlayerTarget = obP.quaternion.clone()

    return new Promise(res => {
        const vals = { phase : 0 }
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                pM.quaternion.slerpQuaternions(qPlayerSaved, qPlayerTarget, vals.phase)
            })
            .onComplete(res)
            .start()
    })
}



export async function pipelineToRed (root, P_END) {
    const {
        worldReal,
        statue,
        player,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    system_PlayerMoveOnLevel.toggleFreeze(true)
    worldReal.setEndWayPos(P_END[0], -61, P_END[1])
    studio.changeEnvironment(ENV_RED_NEAR, { time: 1500 })
    await lookTogether(root, player.mesh, statue.m)
    worldReal.toNotWalls()
    system_PlayerMoveOnLevel.toggleFreeze(false)
    studio.changeEnvironment(ENV_RED, { time: 1500 })
    await lookPlayerTo(player.mesh, worldReal.endItemObj)
    statue.hide()
    await pause(3000)
    statue.m.position.y = y
    statue.m.position.y = y
    statue.m.position.z = 6000
}




const movePlayer = (root) => {
    const {
        player,
    } = root

    return new Promise(res => {
        const vals = { z: player.mesh.position.z }
        new TWEEN.Tween(vals)
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ z: -300, }, 4000)
            .onUpdate(() => {
                player.mesh.position.z = vals.z
            })
            .onComplete(() => {
                res()
            })
            .start()
    }) 
}

export async function startPipeline (root) {
    const {
        worldReal,
        statue,
        player,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    player.mesh.position.set(1060.4553029932501, -40, -500)
    player.mesh.rotation.y = Math.PI// * 1.3

    studio.changeEnvironment(ENV_NORMAL, { time: 15000 },)
    await movePlayer(root)
    player.toggleBlocked(false)
}








const lookPlayerTop = (root, meshPlayer, meshStatue) => {
    const vStartPos = meshPlayer.position.clone()
    const vEndPos = meshStatue.position.clone()
    vEndPos.z -= 20
    vEndPos.y += 5

    const qPlayerSaved = meshPlayer.quaternion.clone()
    const obP = new THREE.Object3D()
    obP.rotation.x = -Math.PI / 2
    obP.rotation.y += Math.PI
    const qPlayerTarget = obP.quaternion.clone()

    return new Promise(res => {
        const vals = { phase : 0 }
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                meshPlayer.quaternion.slerpQuaternions(qPlayerSaved, qPlayerTarget, vals.phase)
                meshPlayer.position.lerpVectors(vStartPos, vEndPos, vals.phase)
            })
            .onComplete(res)
            .start()
    })
}


const moveTop = (m) => {
    const vStartPos = m.position.clone()
    const vEndPos = m.position.clone()
    vEndPos.y = 1000 


    return new Promise(res => {
        const vals = { phase : 0 }
        new TWEEN.Tween(vals)
            .to({ phase: 1, }, 1500)
            .onUpdate(() => {
                m.position.lerpVectors(vStartPos, vEndPos, vals.phase)
            })
            .onComplete(res)
            .start()
    })
}


export async function endPipeLine (root) {
    const {
        worldReal,
        statue,
        player,
        studio,
        system_PlayerMoveOnLevel,
    } = root

    console.log('!!!-endPipeLine')
    await lookPlayerTop(root, player.mesh, statue.m)
    await moveTop(player.mesh)
    studio.changeEnvironment(ENV_END, { time: 3000 },)
    await pause(5000)
    //alert('!!!')

}
