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


        this._soundSteps = new THREE.Audio(listener)
        this._soundSteps.setBuffer(root.assets.soundStep)
        this._soundSteps.setLoop(true)
        this._soundSteps.setVolume(0.5)

        this._statue = new THREE.PositionalAudio(listener)
        this._statue.setBuffer(root.assets.soundStatue)
        this._statue.setRefDistance(200)
        this._statue.setVolume(1)


        this._isMuted = false

        root.emitter.subscribe('toggleSound')(isMute => {
            this._isMuted = isMute
            if (isMute) {

                this._sound.isPlaying && this._sound.stop()
            } else {
                this._sound.play()
            }      
        })

        //soundStep

        this._timer = null

    }

    playAmbient () {
        this._sound.play()
    }

    startSteps () {
        if (this._isMuted) {
            return;
        } 

        this._soundSteps.play()

    }

    stopSteps () {
        if (this._isMuted) {
            return;
        } 

        this._soundSteps.stop()
    }


    setMeshStatue (m) {
        m.add(this._statue)
    }

    playStatue () {
        if (this._isMuted) {
            return;
        }
        this._statue.play()
    }
}
