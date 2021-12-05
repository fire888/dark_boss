import { CURRENT_CHAPTER } from '../constants/constants_elements'

export class AdderActions {
    constructor (_root) {
        const { player, ui, dispatcher, emitter } = _root

        dispatcher.dispatch({ type: 'CHANGE_INFO_CHAPTER', currentChapterIndex: CURRENT_CHAPTER })
        ui.showStartButton(() => player.toggleBlocked(false))

        // emitter.subscribe('nearTerminal')(({ isNearTerminal, terminalKey }) => {
        //     dispatcher.dispatch({ type: 'BUTTON_DIALOG_TOGGLE', isButtonDialog: isNearBot, currentBotKey: terminalKey })
        // })
    }
}
