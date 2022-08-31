export class EventEmitter {
    constructor() {
        this._storage = {}
    }

    emit (id) {
        return data => getOrCreateArrFromObj(this._storage)(id).forEach(action => action(data))
    }

    subscribe (id) {
        return callback => {
            getOrCreateArrFromObj(this._storage)(id).push(callback)
            return () => this._storage[id] = this._storage[id].filter(item => item !== callback)
        }
    }

    showAll () {
        const s = {}
        for (let key in this._storage) {
            s[key] = this._storage[key].length
        }
        console.log(s)
    }
}


const getOrCreateArrFromObj = obj => key => obj[key] = obj[key] || []






