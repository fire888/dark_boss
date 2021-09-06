import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


export class CheckerDialogWithBot {
    constructor(root) {
        const { player, bots, emitter } = root

        const checkerNear = new SystemCheckerNearItem()

        for (let key in bots.bots) {
            checkerNear.setItemToCheck(bots.bots[key].mesh)
        }

        const mesh = {
            'up': player.frontObj,
            'down': player.backObj,
        }

        let keyBotNear = null 

        emitter.subscribe('playerMove')(({ dir }) => {
            const [ isNear, data ] = checkerNear.checkNear(mesh[dir], 20)
            
            
            if (!isNear) {
                if (keyBotNear) {
                    bots.bots[keyBotNear].walk(player._mainObj.position)
                    keyBotNear = null
                }
            } else {
                if (!keyBotNear) {
                    keyBotNear = data.key
                    bots.bots[keyBotNear].stay(player._mainObj.position)
                }
            }
        })
    }
}