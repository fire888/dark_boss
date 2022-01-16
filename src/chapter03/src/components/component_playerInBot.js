import * as THREE from 'three'
import { CompressedTextureLoader } from 'three';
import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


const MAX_DIALOG_DIST_TO_BOT = 30
const MIN_DIST_TO_BOT = 12


export class Component_PlayerInBot {
    constructor(root) {
        const {
            bots,
            emitter,
            dispatcher,
            player,
        } = root


        const checkerNearItems = new SystemCheckerNearItem(root)
        for (let i = 0; i < bots.arrBots.length; ++i) {
            checkerNearItems.setItemToCheck(bots.arrBots[i].mesh)
        }


        const botWorldPos = new THREE.Vector3()


        const isPlayerCanMove = {
            'up': true,
            'down': false,
        }
        let blockBot = null



        const togglePlayerMove = (data, distance, indexBot) => {
            if (
                data.dir === 'up' && 
                isPlayerCanMove['up'] &&
                blockBot === null && 
                distance < MIN_DIST_TO_BOT
            ) {
                bots.arrBots[indexBot].prepareToSay(data.pos)
                blockBot = indexBot 
                isPlayerCanMove['up'] = false
                player.toggleCanMove('up', false)
            }


            if (
                !isPlayerCanMove['up'] &&
                blockBot === indexBot && 
                distance > MIN_DIST_TO_BOT
            ) {
                blockBot = null
                isPlayerCanMove['up'] = true
                player.toggleCanMove('up', true)
            }
        }




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

                togglePlayerMove(data, distance, i)
            }
        })
    }
}