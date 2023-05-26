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




        // this._soundCarStart = new THREE.Audio(listener)
        // this._soundCarStart.setBuffer(root.assets.carStart)
        // this._soundCarStart.setLoop(false)
        // this._soundCarStart.setVolume(0.09)

        this._soundCar = new THREE.Audio(listener)
        this._soundCar.setBuffer(root.assets.soundPlatform)
        this._soundCar.setLoop(true)
        this._soundCar.setVolume(0.09)

        this._w = new THREE.Audio(listener)
        this._w.setBuffer(root.assets.soundStep)
        this._w.setLoop(true)
        this._w.setVolume(.3)


        this._isMuted = false

        root.emitter.subscribe('toggleSound')(isMute => {
            this._isMuted = isMute
            if (isMute) {

                this._sound.isPlaying && this._sound.stop()
                this._soundCarStart.isPlaying && this._soundCarStart.stop()
                this._soundCar.isPlaying && this._soundCar.stop()
            } else {
                this._sound.play()
            }      
        })


        this._timer = null

    }

    playAmbient () {
        this._sound.play()
    }

    startCar () {
        if (this._isMuted) {
            return;
        } 

        //this._soundCarStart.play()
        //this._timer = setTimeout(() => {
            this._soundCar.play()
        //}, 4000)
    }

    stopCar () {
        if (this._isMuted) {
            return;
        } 

        //this._soundCarStart.isPlaying && this._soundCarStart.stop()
        this._soundCar.isPlaying && this._soundCar.stop()
        clearTimeout(this._timer)
    }

    startWalk () {

        if (this._isMuted) {
            return;
        }
        this._w.play()
    }

    stopWalk () {
        if (this._isMuted) {
            return;
        }
        this._w.isPlaying && this._w.stop()
    }
}
