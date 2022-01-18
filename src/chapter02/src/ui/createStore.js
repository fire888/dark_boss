import { REPLICIES_CONFIG } from '../constants/constants_replicies'
import { END_ENV } from '../constants/constants_elements'
import { toggleOpenDialog } from '../actions/AdderActions'

const storeStartState = {
    replicies: REPLICIES_CONFIG,
    isCloseisButtonDialog: false,
    isButtonDialog: false,
    isShowPalleteDialog: false,
    currentTerminalKey: null,
    currentPhraseIndex: 0,
    currentLanguage: 'en',
    isShowFinalMessage: false,
}


export const createCustomStore = root => {
    
    const dialogs = (store = storeStartState, action) => {
        if (action.type === 'BUTTON_DIALOG_TOGGLE') {
            const {  isButtonDialog, currentTerminalKey } = action
            return {
                ...store,
                isButtonDialog,
                currentTerminalKey,
            }
        }

        if (action.type === 'TOGGLE_TERMINAL_ANIMATION') {
            action.is
                ? root.terminals.openTerminal(store.currentTerminalKey)
                : root.terminals.closeTerminal(store.currentTerminalKey)
        }

        if (action.type === 'SHOW_PALLETE_DIALOG') {
            root.player.toggleBlocked(action.is)
            return {
                ...store,
                isButtonDialog: !action.is,
                isShowPalleteDialog: action.is,
            }
        }

        if (action.type === 'CLICK_ON_PLAYER_PHRASE') {
            if (action.actionKey === 'next') {
                return {
                    ...store,
                    currentPhraseIndex: ++store.currentPhraseIndex,
                }
            }

            if (action.actionKey === 'startBridge') {
                setTimeout(() => toggleOpenDialog(root.dispatcher.dispatch, false))
                if (action.dataAction) {
                    if (action.dataAction.keyProgramBridge) {
                        root.bridge.startProgram(action.dataAction.keyProgramBridge)
                    }  
                    
                    if (action.dataAction.keyProgramBridge === 'PROGRAM_06') {
                        root.level.addTopZone()
                        root.terminals.addLastTerminal()
                    }

                    if (action.dataAction.idChangerState) { 
                        
                        if (action.dataAction.idChangerState === 'resetAllAfterEnd') {
                            const replicies = JSON.parse(JSON.stringify(store.replicies))
                            replicies['TERMINAL_LAST'].splice(0, 1)

                            return ({
                                ...store,
                                replicies,
                                currentPhraseIndex: 0,
                            })    
                        }
                    }
                }
                return {
                    ...store,
                    currentPhraseIndex: 0,
                }
            }

            if (action.actionKey === 'close') {
                setTimeout(() => toggleOpenDialog(root.dispatcher.dispatch, false))

                if (action.dataAction && action.dataAction.idChangerState) {
                    if (action.dataAction.idChangerState === 'openPhrasePROGRAM_00') {
                        const replicies = JSON.parse(JSON.stringify(store.replicies))
                        replicies['TERMINAL_00'][1]['a'][2].isShow = true 
                        return {
                            ...store,
                            replicies,
                            currentPhraseIndex: 0,
                        }
                    }


                    if (action.dataAction.idChangerState === 'clearMessagesAfterLastEnd') {
                        setTimeout(() => {
                            root.player.toggleBlocked(true)
                            root.studio.changeEnvironment(END_ENV, { updateAmb: false, time: 1500 }) 
                            root.dispatcher.dispatch({ type: 'SHOW_FINAL_MESSAGE' })                                        
                        }, 5000)
                        return {
                            ...store,
                            currentPhraseIndex: 0,
                        }
                    }


                }

                return {
                    ...store,
                    currentPhraseIndex: 0,
                }
            }
            
            return ({
                ...store,
            })
        }


        if (action.type === 'SHOW_FINAL_MESSAGE') {
            return ({
                ...store,
                isShowFinalMessage: true,
            })
        }

        return store
    }


    return { 
        dialogs 
    }
}



