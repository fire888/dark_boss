import * as R from 'ramda'


export class FrameUpdater {
    constructor () {
        this._subscribers = []


        let data = {
            time: 0,
            delta: 0,
            count: 0,
            oldTime: 0
        }

        const getDataFromGlobalVar = () => data

        const updateTime = data => {
            data.time = Date.now()
            return data
        }

        const updateDelta = data => {
            data.delta = (data.time - data.oldTime) * 0.001
            if (isNaN(data.delta) || data.delta > 1000 || data.delta === 0 ) {
                data.delta = 1000 / 60 * 0.001
            }
            return data
        }

        const updateCount = data => {
            data.count = data.delta / (1/60)
            return data
        }

        // const emit = data => {
        //     emitFrameUpdate(data)
        //     return data
        // }

        const updateOldTime = data => {
            data.oldTime = data.time
            return data
        }

        const saveDataInGlobalVar = dataFromChine => {
            data = dataFromChine
            return data
        }

        const updateSubscribers = data => {
            for (let i = 0; i < this._subscribers.length; ++i) {
                this._subscribers[i]({...data })
            }
            return data;
        }

        const update = R.pipe(
            getDataFromGlobalVar,
            updateTime,
            updateDelta,
            updateCount,
            updateSubscribers,
            updateOldTime,
            saveDataInGlobalVar
        )

        const animate = () => {
            setTimeout(() => {
                requestAnimationFrame(animate)
                update(data)
            }, 200)

        }
        animate()
    }

    on (fn) {
        this._subscribers.push(fn)
        return () => {
            this._subscribers = this._subscribers.filter(item => item !== fn)
        }
    }
}
