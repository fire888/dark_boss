export class StarterPlay {
    constructor (root) {
        const { player, ui, dispatcher } = root
        
        dispatcher.dispatch({ 
            type: 'CHANGE_INFO_CHAPTER', 
            currentChapterIndex: 2 
        })

        ui.showStartButton(() => {          
            dispatcher.dispatch({
                type: 'CHANGE_ENVIRONMENT',
                newQuadrant: [0, -1, -50],
                environmentMode: 'back',
            })
            player.toggleBlocked(false)
        })
    }
}
