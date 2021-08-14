import { toggleDialog } from '../store/actions'
import { Component_PlayerNearItems } from '../../_CORE/components/component_checkPlayerNearItems'


const MAX_DIALOG_DIST_TO_BOT = 30

export class Component_PlayerInBot {
    constructor(gameContext) {
        const { bots, player, pr } = gameContext

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

        const checkerNearItems = new Component_PlayerNearItems(gameContext)
        checkerNearItems.setArrItems(bots.arrBots, map)
    }
}
