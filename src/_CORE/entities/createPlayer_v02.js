import * as THREE from 'three'
import { Object3D } from 'three'


export class Player {
    constructor (root) {
        const { studio, CONSTANTS } = root

        studio._changeBackground({fogNear: 20, fogFar: 500, color: 1582461, backgroundImgKey: 'skyBox'})

        const {
            startPos,
            startRot,
            cameraData,
            frontObjPos,
            backObjPos,
            lightDataOne,
        } = CONSTANTS.playerConfig


        this._camera = null
        this._isBlocked = true

        this.mesh = new THREE.Object3D()
        this.mesh.position.fromArray([0, 25, 0]) //
        //this.mesh.position.fromArray([-359.5509120346753, -19.249698816167083, -19.280099775221846]) // layer 0002
        //this.mesh.position.fromArray([-705.4687564820642, 200.96628564538472, 79.73976473321487]) // layer 0006
        //this.mesh.position.fromArray([-754.9745654011924, 186.53239310383614, 46.935836090143646])
        //this.mesh.position.fromArray([-632.6617733125263, 284.5924616087458, 245.47023525719305])
        //this.mesh.position.fromArray([-410.58781451337603, 363.14256112515284, 20.043236034992436])
        this.mesh.position.fromArray([-402.05421551152745, 375.9501037597656, -159.53997292059094])
        


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


        {
            const { fov, ratio, near, far, pos } = cameraData
            this._camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
            this._camera.position.fromArray([0, 0, -2])
            this.mesh.add(this._camera)
        }

        {
            const { color, strenth, pos } = lightDataOne
            const light = new THREE.PointLight(color, strenth)
            light.position.fromArray(pos)
            this.mesh.add(light)
        }

        studio.setCamera(this._camera)
        studio.addToScene(this.mesh)
    }

    toggleBlocked (val) {
        this._isBlocked = val
    }

    toggleCanMove(key, val) {
        this._isCanMove[key] = val
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
}
