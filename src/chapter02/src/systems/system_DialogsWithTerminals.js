import { SystemCheckerNearItem } from "../../../_CORE/systems/SystemCheckerNearItem";


export class CheckerDialogWithTerminals {
    constructor(root) {
        const { player, terminals, emitter, dispatcher } = root

        const checkerNear = new SystemCheckerNearItem()
        for (let key in terminals.terminals) {
            checkerNear.setItemToCheck(terminals.terminals[key].mesh)
        }
        const mesh = {
            'up': player.frontObj,
            'down': player.backObj,
        }
        let keyTerminalNear = null

        emitter.subscribe('playerMove')(({ dir }) => {
            /** check dialog */
            {

                const [ isNear, data ] = checkerNear.checkNear(mesh[dir], 12)

                if (!isNear) {
                    if (keyTerminalNear) {
                        keyTerminalNear = null
                        dispatcher.dispatch({ type: 'BUTTON_DIALOG_TOGGLE', isButtonDialog: false, currentTerminalKey: null })
                    }
                } else {
                    if (!keyTerminalNear) {
                        keyTerminalNear = data.key
                        dispatcher.dispatch({ type: 'BUTTON_DIALOG_TOGGLE', isButtonDialog: true, currentTerminalKey: keyTerminalNear })
                    }
                }
            }
        })
    }
}