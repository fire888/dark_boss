//import { startPlay } from "../store/actions";
import { uiState } from '../store/createStore'


export class StarterPlay {
    constructor (root) {
        const { player, ui, } = root
        ui.showStartButton(() => {
            //startPlay(pr.dispatch).startPlay()
            //startPlay(pr.dispatch).showBackground()
            player.toggleBlocked(false)
        })
    }
}

/*
import { CURRENT_CHAPTER } from '../constants/constants_elements'

export const toggleOpenDialog = (dispatch, isToOpen) => {
    const time = isToOpen ? 1300 : 0
    dispatch({
        type: 'TOGGLE_TERMINAL_ANIMATION',
        is: isToOpen
    })
    setTimeout(() => {
        dispatch({
            type: 'SHOW_PALLETE_DIALOG',
            is: isToOpen
        })
    }, time)
}

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
*/