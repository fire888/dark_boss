import * as THREE from "three";


const MIN_DIST_TO_BOT = 12
const MAX_DIALOG_DIST_TO_BOT = 30

export class Component_PlayerNearItems {
    constructor(gameContext) {
        const { player, emitter, keyBoard } = gameContext

        const botWorldPos = new THREE.Vector3()


        const objToCompare = {
            'up': player.frontObj,
            'down': player.backObj,
        }


        let oldDisabledDir = null
        const vec = new THREE.Vector3()

        this._arr = []
        this._funcToMap = () => {}


        emitter.subscribe('frameUpdate')(() => {
            let downKey = null
            if (keyBoard.keys['up']) downKey = 'up'
            if (keyBoard.keys['down']) downKey = 'down'
            if (!downKey) return;

            let keyDirInBot = null

            for (let i = 0; i < this._arr.length; ++i) {
                if (!this._arr[i].inScene) continue;

                this._arr[i]._modelGroup.getWorldPosition(botWorldPos)
                const distance = botWorldPos.distanceTo(objToCompare[downKey].getWorldPosition(vec))

                distance < MIN_DIST_TO_BOT && (keyDirInBot = downKey)

                this._funcToMap(this._arr[i], distance)
            }


            if (keyDirInBot) {
                if (oldDisabledDir !== keyDirInBot) {
                    oldDisabledDir = downKey
                    player.toggleCanMove('up', true)
                    player.toggleCanMove('down', true)
                    player.toggleCanMove(downKey, false)
                }
            } else {
                if (oldDisabledDir) {
                    player.toggleCanMove('up', true)
                    player.toggleCanMove('down', true)
                    oldDisabledDir = null
                }
            }
        })
    }

    setArrItems (arr, funcToMap) {

        this._arr = arr
        this._funcToMap = funcToMap
    }
}








