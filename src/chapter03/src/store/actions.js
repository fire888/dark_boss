let emitter = null
export const connectEmitterToActions = em => {
    emitter = em
}


export const startPlay = dispatch => ({
    startPlay: () => dispatch({
        type: 'CHANGE_ENVIRONMENT',
        newQuadrant: [0, -1, -50],
        environmentMode: 'outer',
    }),
    showBackground: () => dispatch({
        type: 'CHANGE_ENVIRONMENT',
        newQuadrant: [0, -1, -50],
        environmentMode: 'back',
    }),
    startFinalFog: () => dispatch({
        type: 'CHANGE_ENVIRONMENT',
        newQuadrant: [0, -1, -50],
        environmentMode: 'start',
    }),
})


export const showMessages = dispatch => ({
    toggleFinalMessage: val => dispatch({
        type: 'TOGGLE_FINAL_MESSAGE',
        mode: val,
    })
})



export const toggleDialog = dispatch => ({
    clickPhrase: r => {
        dispatch({
            type: 'CLICK_PHRASE',
            phrase: r,
        })

        setTimeout(() => {
            dispatch({
                type: 'PHRASE_EVENT',
                phrase: r,
            })
        }, 1000)
    },
})
