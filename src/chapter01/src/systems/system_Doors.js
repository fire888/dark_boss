import * as THREE from "three"
import { animateMoveAndReturn } from '../../../_CORE/components/componentMoveAndReturn'

const OFFSET_PLAYER_FROM_DOOR = 7

export class SystemDoors {
    constructor (root) {
        const {
            assets,
            materials,
            studio,
            emitter,
            systemPlayerCollisionItems
        } = root

        this._doors = {}

        assets['level-rooms'].traverse(child => {
            if (child.name.includes("doormesh_")) {
                const key = child.name.split('_')[1]
                !this._doors[key] && (this._doors[key] = {})
                this._doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.door)
                this._doors[key]['state'] = 'closed'
                this._doors[key]['access'] = 'confirm' // ||'denied' || 'confirm'
                this._doors[key]['mesh']['userData'] = {
                    part: 'mesh',
                    type: 'door',
                    id: key,
                }
            }
        })


        for (let key in this._doors) {

            studio.addToScene(this._doors[key]['mesh'])
            systemPlayerCollisionItems && systemPlayerCollisionItems.setItemToCollision({
                mesh: this._doors[key]['mesh'],
                dist: OFFSET_PLAYER_FROM_DOOR,
                itemKeyEmitCollision: { key, type: 'door' },
                isDisablePlayer: true
            })
        }


        emitter.subscribe('playerCollision')(data =>
            data.type === 'door'
                && this._doors[data.key]['access'] === 'confirm'
                    && this._doors[data.key].state === 'closed'
                        && this._openDoor(data.key)
        )
    }



    _openDoor (key) {
        this._doors[key].state = 'opened'

        const data = {
            position: this._doors[key]['mesh'].position,
            keyPos: 'y',
            fromVal: this._doors[key]['mesh'].position.y,
            offset: 15,
            time: 500,
            pause: 2000,
        }
        animateMoveAndReturn(data, () => this._doors[key].state = 'closed')
    }
}