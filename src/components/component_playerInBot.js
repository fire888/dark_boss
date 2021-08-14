import * as THREE from "three";
import {FRAME_UPDATE} from "../constants/constants_elements";
import { toggleDialog } from '../store/actions'

const MIN_DIST_TO_BOT = 12
const MAX_DIALOG_DIST_TO_BOT = 30

export class Component_PlayerInBot {
    constructor(gameContext) {
        const { player, bots, emitter, keyBoard, pr } = gameContext

        const botWorldPos = new THREE.Vector3()


        const objToCompare = {
            'up': player.frontObj,
            'down': player.backObj,
        }


        let oldDisabledDir = null
        const vec = new THREE.Vector3()


        emitter.subscribe(FRAME_UPDATE)(() => {
            let downKey = null
            if (keyBoard.keys['up']) downKey = 'up'
            if (keyBoard.keys['down']) downKey = 'down'
            if (!downKey) return;

            let keyDirInBot = null

            for (let i = 0; i < bots.arrBots.length; ++i) {
                if (!bots.arrBots[i].inScene) continue;

                bots.arrBots[i]._modelGroup.getWorldPosition(botWorldPos)
                const distance = botWorldPos.distanceTo(objToCompare[downKey].getWorldPosition(vec))


                distance < MIN_DIST_TO_BOT && (keyDirInBot = downKey)


                if (bots.arrBots[i]._state === 'say' && distance > MAX_DIALOG_DIST_TO_BOT) {
                    bots.arrBots[i]._startRotate()
                    toggleDialog(pr.dispatch).toggleButtonDialog(false)
                }


                if (bots.arrBots[i]._state !== 'say' && distance < MAX_DIALOG_DIST_TO_BOT) {
                    bots.arrBots[i].prepareToSay(player._mainObj.position)
                    toggleDialog(pr.dispatch).toggleButtonDialog(true)
                 }
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
}
