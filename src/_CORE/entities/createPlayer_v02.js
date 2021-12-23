import * as THREE from 'three'


export class Player {
    constructor (root) {
        const { studio, CONSTANTS } = root

        const {
            startPos,
            startRot,
            cameraData,
            frontObjPos,
            backObjPos,
            lightDataOne,
            speed,
            offsetFromFloor,
            offsetFromFloorFactor,
            offsetWallCollision,
            speedDown,
            speedRot,
        } = CONSTANTS.playerConfig


        this._camera = null
        this._isBlocked = true


        this._mainObj = new THREE.Mesh(
            new THREE.BoxGeometry(.5, .5, .5),
            new THREE.MeshBasicMaterial({ color: 0xffff00 }) 
        )
        this._mainObj.position.fromArray([0, 0, 0])
        this._mainObj.rotation.fromArray([0, 0, 0])
        this._mainObj.userData.type = 'player'


        this.bottomObj = new THREE.Mesh(
            new THREE.BoxGeometry(.5, .5, .5),
            new THREE.MeshBasicMaterial({ color: 0x000000 }) 
        )
        this.bottomObj.position.fromArray([0, 0, -2])
        this._mainObj.add(this.bottomObj)

        this.frontObj = new THREE.Mesh(
            new THREE.BoxGeometry(.5, .5, .5),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF }) 
        )
        this.frontObj.position.fromArray([0, 2, 0])
        this._mainObj.add(this.frontObj)

        this.backObj = new THREE.Mesh(
            new THREE.BoxGeometry(.5, .5, .5),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }) 
        )
        this.backObj.position.fromArray([0, -2, 0])
        this._mainObj.add(this.backObj)




        // this._mainObj = new THREE.Object3D()
        // this._mainObj.position.fromArray(startPos)
        // this._mainObj.rotation.fromArray(startRot)
        // this._mainObj.userData.type = 'player'


        // this.bottomObj = new THREE.Object3D() 
        // this.bottomObj.position.fromArray([0, 0, .5])
        // this._mainObj.add(this.bottomObj)

        // this.frontObj = new THREE.Object3D()
        // this.frontObj.position.fromArray([0, 0, .5])
        // this._mainObj.add(this.frontObj)

        // this.backObj = new THREE.Object3D()
        // this.backObj.position.fromArray([0, .5, 0])
        // this._mainObj.add(this.backObj)

        {
            const { fov, ratio, near, far, pos } = cameraData
            this._camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
            this._camera.position.fromArray([0, 0, 2])
            this._camera.rotation.x = Math.PI / 2
            //this._camera.rotation.x = Math.PI / 2
            this._mainObj.add(this._camera)
        }

        {
            const { color, strenth, pos } = lightDataOne
            const light = new THREE.PointLight(color, strenth)
            light.position.fromArray(pos)
            this._mainObj.add(light)
        }

        //const componentPlayerMove = createComponentPlayerMove(this, root) 
        this._mainObj.lookAt(new THREE.Vector3(0, 10, 0))

        studio.setCamera(this._camera)
        studio.addToScene(this._mainObj)
    }

    toggleBlocked (val) {
        this._isBlocked = val
    }

    toggleCanMove(key, val) {
        this._isCanMove[key] = val
    }

    getObj () {
        return this._mainObj
    }

    getCamera () {
        return this._camera
    }
    
    setToPos (x, y, z) {
        this._mainObj.position.set(x, y, z)
    }
}
