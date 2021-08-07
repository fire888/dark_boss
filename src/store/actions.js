//import { emitter } from '../helpers/util_emitter'
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


export const clickFullScreen = dispatch => ({
    clickFullScreen: () => {
        dispatch({
            type: 'CLICK_FULL_SCREEN',
        })
    },

    exitFullScreen: () => {
        dispatch({
            type: 'EXIT_FULL_SCREEN',
        })
    },
})


export const clickInfo = dispatch => {
    return ({
        clickInfo: val => {
            dispatch({
                type: 'INFO_TOGGLE',
                mode: val,
            })
        },
    })
}



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

            r.levelEvent && emitter && emitter.emit('changeLevelMode')(r.levelEvent)
        }, 1000)
    },


    toggleDialog: is => {
        dispatch({
            type: 'TOGGLE_DIALOG',
            isDialog: is,
        })
    },


    toggleButtonDialog: is => {
        dispatch({
            type: 'TOGGLE_BUTTON',
            isButtonDialog: is,
        })
    }
})
