import * as THREE from 'three'

export class system_Sound {
    constructor (root) {
        const listener = new THREE.AudioListener()
        const cam = root.player.getCamera()
        cam.add(listener)

        this._sound = new THREE.Audio(listener)
        this._sound.setBuffer(root.assets.soundAmbient)
        this._sound.setLoop(true)
        this._sound.setVolume(0.35)

        root.emitter.subscribe('toggleSound')(isMute => {
            isMute  
                ? this._sound.stop()
                : this._sound.play()
        }) 
    }

    playAmbient () {
        this._sound.play()
    }
}
