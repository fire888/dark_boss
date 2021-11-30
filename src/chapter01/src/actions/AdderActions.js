let root


const dialogs = dispatch => ({
    showDialogButton: (isButtonDialog, currentBotKey) => { 
        dispatch({
            type: 'BUTTON_DIALOG_TOGGLE',
            isButtonDialog,
            currentBotKey,
        })
    },
})


export const dialogChanger = dispatch => ({
    togglePalleteDialog: is => { 
        dispatch({ 
            type: 'SHOW_PALLETE_DIALOG', 
            is 
        })
        root.player.toggleBlocked(is)
    },
    clickOnPlayerPhrase: (currentBotKey, phraseIndex) => {
        dispatch({
            type: 'CLICK_ON_PLAYER_PHRASE',
            currentBotKey,
            phraseIndex, 
        })    
    }
})


export class AdderActions {
    constructor (_root) {
        root = _root

        const { player, ui, dispatcher, emitter } = root

        dispatcher.dispatch({ type: 'CHANGE_INFO_CHAPTER', currentChapterIndex: 0 })
        ui.showStartButton(() => player.toggleBlocked(false))

        emitter.subscribe('nearBot')(({ isNearBot, botKey }) => {
            dialogs(dispatcher.dispatch).showDialogButton(isNearBot, botKey)
        })
    }
}
