import * as THREE from 'three'
import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


const MAX_DIALOG_DIST_TO_BOT = 30


export class Component_PlayerInBot {
    constructor(root) {
        const {
            bots,
            emitter,
            dispatcher,
        } = root


        const checkerNearItems = new SystemCheckerNearItem(root)
        for (let i = 0; i < bots.arrBots.length; ++i) {
            checkerNearItems.setItemToCheck(bots.arrBots[i].mesh)
        }


        const botWorldPos = new THREE.Vector3()


        emitter.subscribe('playerMove')(data => {
            for (let i = 0; i < bots.arrBots.length; ++i) {
                if (!bots.arrBots[i].inScene) continue;


                bots.arrBots[i].mesh.getWorldPosition(botWorldPos)
                const distance = botWorldPos.distanceTo(data.pos)

                if (bots.arrBots[i]._state === 'say' && distance > MAX_DIALOG_DIST_TO_BOT) {
                    dispatcher.dispatch({
                        type: 'TOGGLE_BUTTON',
                        isButtonDialog: false,
                    })
                    bots.arrBots[i]._startRotate()
                    continue;
                }


                if (bots.arrBots[i]._state !== 'say' && distance < MAX_DIALOG_DIST_TO_BOT) {
                    bots.arrBots[i].prepareToSay(data.pos)
                    dispatcher.dispatch({
                        type: 'TOGGLE_BUTTON',
                        isButtonDialog: true,
                    })
                }
            }
        })
    }
}