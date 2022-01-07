import { START_ENV_CONFIG_4 } from '../constants/constants_elements'


const DIALOGS_DATA = {
    '4': [
        {
            q: 'What is this place ?',
            a: "It's a great way up!",
            event: 'nextReply',
        }, {
            q: 'Who are you?',
            a: 'I help the creator.',
            event: 'nextReply',
        }, {
            q: 'What are you doing?',
            a: "Don't distract, I have to dig a tunnel.",
            event: 'close',
        },
    ],
    '13': [
        {
            q: 'Such large dungeons ...',
            a: 'The Creator gave the order to dig.',
            event: 'nextReply',
        }, {
            q: 'How long have you been digging?',
            a: 'Time does not matter, the goal is important.',
            event: 'close',
        },
    ],
    '20': [
        {
            q: 'What do you do here ?',
            a: 'Long ago, the Creator fell under the ground. He created us and gave us an assignment to dig.',
            event: 'nextReply',
        },
        {
            q: "But here's the way out ...",
            a: 'When we dug a path, the creator went through it.',
            event: 'nextReply',
        },
        {
            q: "And...",
            a: 'We are made to dig. And we keep on doing it. We believe that he will return to us.',
            event: 'close',
        },
    ],
}



export const uiState = {
    botAnswers: [],
    userReplicies: [],
    isShowControls: true,
    isButtonDialog: false,
    isShowPalleteDialog: false,
    isShowFinalMessage: false,

    currentBot: null,
    phraseIndex: 0,
    isDialogComplete: false,
    phrasesData: DIALOGS_DATA,
}


export const createCustomStore = root => {
    const ui = (state = uiState, action) => {

        if (action.type === 'CLICK_PHRASE') {
            return ({
                ...state,
                botAnswers: [
                    ...state.botAnswers,
                    action.phrase,
                ],
                userReplicies: [],
            })
        }


        if (action.type === 'PHRASE_EVENT') {
            const { event, levelEvent } = action.phrase

            if (event === 'nextReply') {
                const userReplicies = [state.phrasesData[state.currentBot][state.phraseIndex + 1]]

                return ({
                    ...state,
                    phraseIndex: state.phraseIndex + 1,
                    userReplicies,
                })

            }

            if (event === 'close') {

                if (state.currentBot === 20) {
                    setTimeout(() => {
                        root.dispatcher.dispatch({ type: 'TOGGLE_BUTTON', isButtonDialog: false })
                        root.dispatcher.dispatch({ type: 'TOGGLE_DIALOG', isShowPalleteDialog: false })
                        root.studio.changeEnvironment(START_ENV_CONFIG_4, { updateAmb: false, time: 1500 }) 
                        root.player.toggleBlocked(true)
                        setTimeout(() => {
                            root.dispatcher.dispatch({ type: 'SHOW_FINAL_MESSAGE' })
                        }, 3000)
                    }, 20000)
                    
                }

                return ({
                    ...state,
                    userReplicies: [],
                    isDialogComplete: true,
                    isButtonDialog: true,
                })
            }
        }



        if (action.type === 'TOGGLE_DIALOG') {
            let userReplicies = []

            root.player.toggleBlocked(action.isShowPalleteDialog)

            if (action.isShowPalleteDialog) {
                userReplicies = state.isDialogComplete ? [] : [state.phrasesData[state.currentBot][state.phraseIndex]]
            }

            return ({
                ...state,
                isShowPalleteDialog: action.isShowPalleteDialog,
                userReplicies,
            })
        }


        if (action.type === 'TOGGLE_BUTTON') {

            let botAnswers = state.botAnswers
            let phraseIndex = state.phraseIndex
            let isDialogComplete = state.isDialogComplete
            if (action.currentBot && action.currentBot !== state.currentBot) {
                botAnswers = []
                phraseIndex = 0
                isDialogComplete = false
            }

            return ({
                ...state,
                phraseIndex,
                currentBot: action.currentBot || state.currentBot,
                isButtonDialog: action.isButtonDialog,
                isDialogComplete,
                botAnswers,
            })
        }


        if (action.type === 'SHOW_FINAL_MESSAGE') {
            return ({
                ...state,
                isShowFinalMessage: true,
            })
        }


        return state
    }

    return { ui }
}



