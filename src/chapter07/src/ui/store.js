//import { START_ENV_CONFIG_4 } from '../constants/constants_elements'
import { DIALOGS_DATA, RESULT_DIALOGS } from '../constants/const_dialogs'



export const uiState = {
    botAnswers: [],
    userReplicies: [],
    isShowControls: true,
    isButtonDialog: false,
    isShowPalleteDialog: false,
    isShowFinalMessage: false,
    isShowButtonDrawCar: false,
    valButtonDrawCar: 'drive',

    currentLocation: null,
    phrasesData: DIALOGS_DATA,
    isShowButtonToggleOpenLocationsList: false,
    isLocationListOpened: false,

    // currentLocationOfList: 'location01',
    // locationsList: [
    //     'location01',
    //     'location02',
    //     'location03',
    // ],
    // "botAnswers":[
    //     {
    //         "q":"What's happening?",
    //         "a":"I am generating the Great Recursion. I need a component. Deliver it to me.","event":"nextReply"
    //     },
    //     {
    //         "q":"Good. Where can I find the component?",
    //         "a":"I updated the sign in your car, follow it.","event":"nextReply"}
    //     ],
    //     "userReplicies":[{ q: 'rrrt rtrtrt rtrtrt rtrtrt rtrtrtrt rtrtrtrtr rtrtrtrt rtrtrtr rtrtrtr rtrtrt fgfgfgfg fgfg fgfgfg fgf uyuu yuyuyu yuyu g fgf '}],
    //     "isShowControls":true,
    //     "isButtonDialog":true,
    //     "isShowPalleteDialog":true,
    //     "isShowFinalMessage":false,
    //     "isShowButtonDrawCar":false,
    //     "valButtonDrawCar":"drive",
    //     "currentLocation":
    //     "location01","phrasesData":{"location01":{"isComplete":false,"phraseIndex":1,"phrases":[{"q":"What's happening?","a":"I am generating the Great Recursion. I need a component. Deliver it to me.","event":"nextReply"},{"q":"Good. Where can I find the component?","a":"I updated the sign in your car, follow it.","event":"nextReply"},{"q":"I'll be back.","a":"For the glory of Recursion.","event":"close"}]},"location02":{"isComplete":false,"phraseIndex":0,"phrases":[{"q":"Do you have a Great Recursion Component?","a":"I will generate you a Great Component for the Great Recursion. I need a Component.","event":"nextReply"},{"q":"Where can I find her?","a":"I updated the pointer in the car.","event":"close"}]},"location03":{"isComplete":false,"phraseIndex":0,"phrases":[{"q":"Do you have a Component for the Great Component of the Great Recursion?","a":"Yes. I have finished generating the Component.","event":"nextReply"},{"q":"I need to deliver it to generate the Great Component.","a":"The pointer in your car has been updated. He will point to the Component of the Great Component.","event":"nextReply"},{"q":"Is my car the key to Components?","a":"Your Machine is the main Generator. Follow him.","event":"close"}]}},
    //     "isShowButtonToggleOpenLocationsList":false,
    //     "isLocationListOpened":false,
    //     "currentLocationOfList":"location01",
    //     "locationsList":["location01","location02","location03"]

}


export const createCustomStore = root => {
    const ui = (state = uiState, action) => {


        if (action.type === 'TOGGLE_BUTTON_DIALOG') {
            const newLocation = action.keyPerson.split('_')[1]
            const botAnswers = []

            if (state.phrasesData[newLocation]) {
                const {  phraseIndex, phrases } = state.phrasesData[newLocation]
                for (let i = 0; i < phraseIndex; ++i) {
                    botAnswers.push(phrases[i])
                }
            }


            return ({
                ...state,
                isButtonDialog: action.is,
                currentLocation: newLocation,
                userReplicies: [],
                botAnswers,
            })
        }


        if (action.type === 'TOGGLE_DIALOG') {
            let userReplicies = []
            root.player.toggleBlocked(action.isShowPalleteDialog)

            if (action.isShowPalleteDialog) {
                const { isComplete, phraseIndex, phrases } = state.phrasesData[state.currentLocation]
                userReplicies = isComplete ? [] : [phrases[phraseIndex]]
            }

            setTimeout(() => root.dispatcher.dispatch({ type: "TOGGLE_CONTROLS", is: !action.isShowPalleteDialog }))

            return ({
                ...state,
                isShowPalleteDialog: action.isShowPalleteDialog,
                userReplicies,
            })
        }



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
            const { event } = action.phrase

            if (event === 'nextReply') {
                const { phraseIndex, phrases } = state.phrasesData[state.currentLocation]
                const nextPhraseIndex = phraseIndex + 1
                const userReplicies = [phrases[nextPhraseIndex]]

                return ({
                    ...state,
                    phrasesData: {
                        ...state.phrasesData,
                        [state.currentLocation]: {
                            ...state.phrasesData[state.currentLocation],
                            phraseIndex: nextPhraseIndex
                        },
                    },
                    userReplicies,
                })

            }

            if (event === 'close') {
                const { phraseIndex } = state.phrasesData[state.currentLocation]
                const nextPhraseIndex = phraseIndex + 1

                setTimeout(() => { root.dispatcher.dispatch(
                    { type: 'SELECT_LOCATION', location: RESULT_DIALOGS[state.currentLocation],}
                ) }, 50)

                return ({
                    ...state,
                    userReplicies: [],
                    phrasesData: {
                        ...state.phrasesData,
                        [state.currentLocation]: {
                            ...state.phrasesData[state.currentLocation],
                            isComplete: true,
                            phraseIndex: nextPhraseIndex,
                        },
                    },
                    isButtonDialog: true,
                })
            }
        }

        /** draw car button */
        if (action.type === 'TOGGLE_BUTTON_DRAW_CAR') {
            return  ({
                ...state,
                isShowButtonDrawCar: action.is
            })
        }
        if (action.type === 'CLICK_DRAW') {
            const { valButtonDrawCar } = state
            if (valButtonDrawCar === 'drive') {

                //root.actions.clickMachineDraw()
                return ({
                    ...state,
                    valButtonDrawCar: 'exit',
                })
            } else {
                //root.actions.clickMachineExit()
                return ({
                    ...state,
                    valButtonDrawCar: 'drive',
                })
            }
        }
        /** *************************/



        /** select target buttons */
        if (action.type === 'OPEN_LOCATIONS_LIST') {
            return ({
                ...state,
                isLocationListOpened: true,
            })
        }
        if (action.type === 'SELECT_LOCATION') {
            root.actions.changeTargetLocation({ key: action.location })
            return ({
                ...state,
                isLocationListOpened: false,
                currentLocationOfList: action.location,
            })
        }
        /** *******************************/


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
