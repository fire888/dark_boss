export class Car {
    constructor (root) {
        const { 
            studio, 
            assets, 
            materials,
            CONSTANTS,
        } = root

        const { position, rotation } = CONSTANTS.CONFIG_FOR_INIT.currentSceneConfig.carProps

        this._model = assets.car
        this._model.position.fromArray(position)
        this._model.rotation.fromArray(rotation)
        
        this._collision = assets.carCollision.children[0]
        this._collision.position.fromArray(position)
        this._collision.rotation.fromArray(rotation)
        this._collision.visible = false
        
        this._start = assets.carCollisionStart.children[0]
        this._start.position.fromArray(position)
        this._start.rotation.fromArray(rotation)
        this._start.userData.type = 'alert'
        this._start.userData.event = 'drawCar'
        this._start.name = 'drawCar!!!'
        this._start.visible = false
    }

    getModel () {
        return this._model
    }

    getCollision () {
        return this._collision
    }

    getStart () {
        return this._start
    }
}