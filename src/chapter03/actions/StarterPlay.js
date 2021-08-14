import { startPlay } from "../store/actions";


export class StarterPlay {
    constructor (gameContext) {
        const { player, ui, pr } = gameContext
        ui.showStartButton(() => {
            startPlay(pr.dispatch).startPlay()
            startPlay(pr.dispatch).showBackground()
            player.toggleBlocked(false)
        })
    }
}