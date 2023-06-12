import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { checkDevice } from '../helpers/checkerDevice'


export class Player {
    constructor (root) {
        const { studio, CONSTANTS } = root

        const {
            cameraData,
            lightDataOne,
        } = CONSTANTS.playerConfig


        this._camera = null
        this.isBlocked = true
        this.isFreeze = true

        const device = checkDevice()
        this.isNeedControls = device.deviceType === 'desktop'
        console.log(device.deviceType)


        this.mesh = new THREE.Object3D()

        {
            const { fov, ratio, near, far } = cameraData
            this._camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
            this._camera.position.fromArray([0, 0, -2])
            if (this.isNeedControls) {
                this.controls = new PointerLockControls(this._camera, document.body );
                this.mesh = this._camera
            } else {
                this.mesh.add(this._camera)
            }
        }


        this.mesh.rotation.fromArray([0, 0, 0])
        this.mesh.userData.type = 'player'


        this.bottomObj = new THREE.Object3D()
        this.bottomObj.position.fromArray([0, -.02, 0])
        this.mesh.add(this.bottomObj)

        this.frontObj = new THREE.Object3D()
        this.frontObj.position.fromArray([0, 0, -.02])
        this.mesh.add(this.frontObj)

        this.backObj = new THREE.Object3D()
        this.backObj.position.fromArray([0, 0, 0.02])
        this.mesh.add(this.backObj)




        if (lightDataOne) {
            const { color, strenth, pos } = lightDataOne
            const light = new THREE.PointLight(color, strenth)
            light.position.fromArray(pos)
            this.mesh.add(light)
        }

        ///////////// TEST /////////////

        studio.setCamera(this._camera)
        studio.addToScene(this.mesh)


        root.emitter.subscribe('clickButtonMouse')(() => {
            this.controlsLock()
        })

        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement === document.body) {
            } else {
                this._camera.rotation.z = 0
                this._camera.rotation.x = 0
            }
        })
    }

    // toggleBlocked (val) {
    //     this.isFeeze = val
    // }

    toggleFeeze (val) {
        this.isFeeze = val
    }

    toggleCanMove(key, val) {
        //this._isCanMove[key] = val
    }

    getObj () {
        return this.mesh
    }

    getCamera () {
        return this._camera
    }
    
    setToPos (x, y, z) {
        this.mesh.position.set(x, y, z)
    }

    controlsLock () {
        if (this.controls) {
            this.controls.lock()
        }
    }

    controlsUnlock () {
        if (this.controls) {
            this.controls.unlock()
            this._camera.rotation.z = 0
            this._camera.rotation.x = 0
        }
    }
}
