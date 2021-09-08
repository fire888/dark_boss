const dialogs = dispatch => ({
    showDialogButton: is => dispatch({
        type: 'BUTTON_DIALOG_TOGGLE',
        isButtonDialog: is,
    }),
})




export class AdderActions {
    constructor (root) {
        const { player, ui, dispatcher, emitter } = root
        ui.showStartButton(() => player.toggleBlocked(false))

        emitter.subscribe('nearBot')(({ isNearBot, botKey }) => {
            dialogs(dispatcher.dispatch).showDialogButton(isNearBot)
        })

    }
}