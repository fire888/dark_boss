

export class AdderActions {
    constructor (_root) {
        const { player, ui, dispatcher, emitter } = _root

        dispatcher.dispatch({ type: 'CHANGE_INFO_CHAPTER', currentChapterIndex: 0 })
        ui.showStartButton(() => player.toggleBlocked(false))

        emitter.subscribe('nearBot')(({ isNearBot, botKey }) => {
            dispatcher.dispatch({ type: 'BUTTON_DIALOG_TOGGLE', isButtonDialog: isNearBot, currentBotKey: botKey })
        })
    }
}
