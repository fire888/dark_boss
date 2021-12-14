import * as THREE from 'three'


export class Player {
    constructor (root) {
        this._root = root

        const { emitter, studio, CONSTANTS } = root

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
        let keys = {}
        let isButtonsDisabled = false
        this._isBlocked = true
        this._isCanMove = {
            'up': true,
            'down': true,
        }

        this._mainObj = new THREE.Object3D()
        this._mainObj.position.fromArray(startPos)
        this._mainObj.rotation.fromArray(startRot)
        this._mainObj.userData.type = 'player'

        const bottomObj = new THREE.Object3D() 
        bottomObj.position.fromArray([0, -.05, 0])
        this._mainObj.add(bottomObj)

        const frontObj = new THREE.Object3D()
        frontObj.position.fromArray(frontObjPos)
        this._mainObj.add(frontObj)
        this.frontObj = frontObj

        const backObj = new THREE.Object3D()
        backObj.position.fromArray(backObjPos)
        this._mainObj.add(backObj)
        this.backObj = backObj

        {
            const { fov, ratio, near, far, pos } = cameraData
            this._camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
            this._camera.position.fromArray(pos)
            this._mainObj.add(this._camera)
        }

        {
            const { color, strenth, pos } = lightDataOne
            const light = new THREE.PointLight(color, strenth)
            light.position.fromArray(pos)
            this._mainObj.add(light)
        }


        const update = data => {
            if (isButtonsDisabled) return;

            keys['left'] && (this._mainObj.rotation.y += (speedRot * data.count))
            keys['right'] && (this._mainObj.rotation.y -= (speedRot * data.count))


            if (this._isBlocked) return;

            /** check bottom floors */
            if (this._root.systemCollisionFloor) {
                const [
                    isBlockedByItem, 
                    offset,
                    point, 
                ] = this._root.systemCollisionFloor.checkCollisions(this._mainObj, bottomObj, offsetFromFloor)
                
                if (!isBlockedByItem) {
                    this._mainObj.position.y += speedDown
                } else {
                    if (offset < (offsetFromFloor - offsetFromFloorFactor))  {
                        this._mainObj.position.y = point.y + offsetFromFloor
                    }                        
                }
            }


            if (!keys) return;

            if (keys['up']) {
                if (!this._isCanMove['up']) return;

                if (this._root.systemCollisionItems) {
                    const [ isBlockedByItem ] 
                        = this._root.systemCollisionItems.checkCollisions(this._mainObj, frontObj, offsetWallCollision)
                   
                        

                    if (isBlockedByItem) return;
                }

                this._mainObj.translateZ(-speed * data.count)
                emitter.emit('playerMove')({ pos: this._mainObj.position, dir: 'up' })
            }

            if (keys['down']) {
                if (!this._isCanMove['down']) return;

                if (this._root.systemCollisionItems) {
                    const [ isBlockedByItem ] 
                        = this._root.systemCollisionItems.checkCollisions(this._mainObj, backObj, offsetWallCollision)
                    if (isBlockedByItem) return;
                }

                this._mainObj.translateZ(speed * data.count)
                emitter.emit('playerMove')({ pos: this._mainObj.position, dir: 'down' })
            }
        }


        emitter.subscribe('keyEvent')(data => keys = data)
        emitter.subscribe('frameUpdate')(update)
        emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)


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
