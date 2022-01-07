const DIALOGS_DATA = {
    '4': [
        {
            q: 'Hello there!',
            a: 'Good day, carbon-based life form.',
            event: 'nextReply',
        }, {
            q: 'What is this place ?',
            a: 'This is an entrance to the entropic hyper-maze.',
            event: 'nextReply',
        }, {
            q: 'And what happens if I enter it ?',
            a: 'This place is waiting.',
            event: 'close',
        },
    ],
    '13': [
        {
            q: 'Say, where do these corridors lead ?',
            a: 'They will lead you to the end.',
            event: 'nextReply',
        }, {
            q: 'Ooook, I\'m heading in then.',
            a: 'We will meet again.',
            event: 'close',
        },
    ],
    '20': [
        {
            q: 'What do you do here ?',
            a: 'Collecting the energy of the night.',
            event: 'nextReply',
        },
        {
            q: 'Can you tell me which way is out of here ?',
            a: 'It is about the journey, not the destination',
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


        return state
    }

    return { ui }
}



