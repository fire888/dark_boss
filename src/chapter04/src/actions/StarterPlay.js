import { startPlay } from "../store/actions";


export class StarterPlay {
    constructor (gameContext) {
        console.log(gameContext)
        const { player, ui } = gameContext
        ui.showStartButton(() => {
            player.toggleBlocked(false)
        })
    }
}