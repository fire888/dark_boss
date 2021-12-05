import * as THREE from 'three'
import { GLTFCopy } from '../../../_CORE/helpers/helper_GLTFcopy'



export const createModelTerminal = (model, config, emitter) => {
    const copy = GLTFCopy(model)
    const mesh = copy.scene.children[0]
    const animations = copy.animations
    const mixer = new THREE.AnimationMixer(mesh)
    mixer.timeScale = 1.7
    const mixerUpdate = data => mixer.update(data.delta)
    const openAction = mixer.clipAction(animations[0])
    openAction.loop = THREE.LoopOnce

    const { r, angle, angleZ, angleY, y, terminalKey } = config
    mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
    mesh.rotation.set(0, angleY || angle, angleZ || 0)
    mesh.userData.terminalKey = terminalKey


    const startOpen = () => {
        const stopUpdate = emitter.subscribe('frameUpdate')(mixerUpdate)

        openAction.reset()
        mixer.timeScale = 1.7
        openAction.play()

        return new Promise(resolve => {
            setTimeout(() => {
                stopUpdate()
                openAction.paused = true
                resolve()
            }, 1100)
        })
    }


    const startClose = () => {
        const stopUpdate = emitter.subscribe('frameUpdate')(mixerUpdate)

        mixer.timeScale = -1.7
        openAction.paused = false

        return new Promise(resolve => {
            setTimeout(() => {
                stopUpdate()
                resolve()
            }, 1100)
        })
    }


    return {
        startOpen,
        startClose,
        mesh,
    }
}

