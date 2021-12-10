import { toggleDialog } from '../store/actions'
//import { Component_PlayerNearItems } from '../../../_CORE/components/component_checkPlayerNearItems'

import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


const MAX_DIALOG_DIST_TO_BOT = 30

export class Component_PlayerInBot {
    constructor(gameContext) {
        console.log(gameContext)
        const { 
            bots, 
            player, 
            pr, 
            emitter, 
        } = gameContext

        // TODO: CHANGE
        const map = (bot, distance) => {
            if (bot._state === 'say' && distance > MAX_DIALOG_DIST_TO_BOT) {
                bot._startRotate()
                toggleDialog(pr.dispatch).toggleButtonDialog(false)
            }

            if (bot._state !== 'say' && distance < MAX_DIALOG_DIST_TO_BOT) {
                bot.prepareToSay(player._mainObj.position)
                toggleDialog(pr.dispatch).toggleButtonDialog(true)
            }
        }

        //const checkerNearItems = new Component_PlayerNearItems(gameContext)
        //checkerNearItems.setArrItems(bots.arrBots, map)

        const checkerNearItems = new SystemCheckerNearItem(gameContext)
        for (let i = 0; i < bots.arrBots.length; ++i) {
            checkerNearItems.setItemToCheck(bots.arrBots[i].container)
        }

        const mesh = {
            'up': player.frontObj,
            'down': player.backObj,
        }

        let keyBotNear = null
        
        emitter.subscribe('playerMove')(({ pos, dir}) => {
            /** check dialog */
            {
                const [ isNear, data ] = checkerNearItems.checkNear(mesh[dir], 20)
                console.log(isNear)
            
                if (!isNear) {
                    if (keyBotNear) {
                        keyBotNear = null
                        console.log('toggle Out', keyBotNear)
                        //bots.bots[keyBotNear].walk(player._mainObj.position)
                       
                        //emitter.emit('nearBot')({ isNearBot: false, botKey: keyBotNear })
                    }
                } else {
                    if (!keyBotNear) {
                        keyBotNear = data.key
                        console.log('toggle in', keyBotNear)
                        //bots.bots[keyBotNear].stay(player._mainObj.position)
                        //emitter.emit('nearBot')({ isNearBot: true, botKey: keyBotNear })
                    }
                }
            }
        })

    }
}
