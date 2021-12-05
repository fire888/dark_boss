import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


export class CheckerDialogWithBot {
    constructor(root) {
        const { player, bots, emitter } = root

        const checkerNear = new SystemCheckerNearItem()
        const checkerNearBlock = new SystemCheckerNearItem()
        for (let key in bots.bots) {
            checkerNear.setItemToCheck(bots.bots[key].mesh)
            checkerNearBlock.setItemToCheck(bots.bots[key].mesh)
        }


        const mesh = {
            'up': player.frontObj,
            'down': player.backObj,
        }

        let keyBotNear = null

        emitter.subscribe('playerMove')(({ dir }) => {
            /** check dialog */
            {
                const [ isNear, data ] = checkerNear.checkNear(mesh[dir], 20)

                if (!isNear) {
                    if (keyBotNear) {
                        bots.bots[keyBotNear].walk(player._mainObj.position)
                        keyBotNear = null
                        emitter.emit('nearBot')({ isNearBot: false, botKey: keyBotNear })
                    }
                } else {
                    if (!keyBotNear) {
                        keyBotNear = data.key
                        bots.bots[keyBotNear].stay(player._mainObj.position)
                        emitter.emit('nearBot')({ isNearBot: true, botKey: keyBotNear })
                    }
                }
            }
        })
    }
}