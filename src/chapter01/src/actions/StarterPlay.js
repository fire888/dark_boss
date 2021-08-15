export class StarterPlay {
    constructor (gameContext) {
        const { player, ui } = gameContext
        ui.showStartButton(() => {
            //startPlay(pr.dispatch).showBackground()
            player.toggleBlocked(false)
        })
    }
}