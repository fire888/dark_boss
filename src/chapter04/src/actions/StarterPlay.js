export class StarterPlay {
    constructor (gameContext) {
        const { player, ui } = gameContext
        ui.showStartButton(() => {
            player.toggleBlocked(false)
        })
    }
}