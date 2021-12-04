

const storeStartState = {
    replicies: {
        mechanic: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'You is new droid.',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am mechanic. I create your body.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'Go. Door is unblocked.... Beeeb.',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['factory'],
                    }
                }
            }]
        },
        programmer: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'Once .... Beeeb.. I set basic program in your memory.',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am programmer.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'Go. Once... Beeeb.. Door to laboratory unblocked.',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['fromLaboratory001'],
                    }
                }
            }]
        },
        engineer: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'Once .. Beeeb! I give name to you. Droid_Id: 17543-06767-6767',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am engineer. I test new droids.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'Go.',
                isDone: false,
            }]
        },
        scientist: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'Droid_Id: 17543-06767-6767, Hmm.., marriage. crap.',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am scientist. I check your abilities. ... garbage.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'Go to store. Doors unblocked.',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['fromFactoryCorpus', 'toLab', 'toGarage'],
                    }
                }
            }]
        },
        master: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'I don’t know anything, go to the boss. ... Beeeb. You have the accesses.',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['toBoss'],
                    }
                }
            }]
        },
        guard_Super_02: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'You want see Boss. He is absent.',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am guard. I give you a secret mission.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'You must see all around base, and return. Doors unblocked.',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['fromStore', 'fromSecurity', 'toArsenal',],
                    }
                }
            }]
        },
        guard_01: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'Droid_Id: 17543-06767-6767 with secret mission. I know.',
                isDone: false,
            },{
                player: 'You ...?', 
                nps: 'I am gateman. Beeeb... Door is opened! Good bye!',
                isDone: false,
                event: {
                    type: 'unblockDoor',
                    data: {
                        idDoor: ['toWorld',],
                    }
                }
            },]
        },
        scout: {
            isDone: false,
            messages: [{ 
                player: 'I ...?', 
                nps: 'It does not matter.',
                isDone: false,
                event: {
                    type: 'blockDoor',
                    data: {
                        idDoor: ['toWorld',],
                    }
                }
            },{
                player: 'You ...?', 
                nps: 'I am scout. Crazy factory create droids and close gates. You alone in this desert.',
                isDone: false,
            },{
                player: 'MM ...?', 
                nps: 'This is the end.',
                isDone: false,
            },]
        },
    },
    isCloseisButtonDialog: false,
    isButtonDialog: false,
    isShowPalleteDialog: false,
    currentBotKey: null,
    currentLanguage: 'en',
} 


export const createCustomStore = root => {
    
    const dialogs = (store = storeStartState, action) => {
        if (action.type === 'BUTTON_DIALOG_TOGGLE') {
            const {  isButtonDialog, currentBotKey } = action
            return {
                ...store,
                isButtonDialog,
                currentBotKey,
            }
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
            const replicies = JSON.parse(JSON.stringify(store.replicies))
            replicies[action.currentBotKey].messages[action.phraseIndex].isDone = true

            /** emit event */
            if (replicies[action.currentBotKey].messages[action.phraseIndex].event) {
                const { type, data } = replicies[action.currentBotKey].messages[action.phraseIndex].event
                root.emitter.emit(type)(data) 
            }

            let isBotDone = true
            for (let i = 0; i < replicies[action.currentBotKey].messages.length; ++i) {
                replicies[action.currentBotKey].messages[i].isDone === false && (isBotDone = false)
            }
            replicies[action.currentBotKey].isDone = isBotDone
            
            return ({
                ...store,
                replicies,
                isCloseisButtonDialog: isBotDone,
            })
        }

        return store
    }


    return { 
        dialogs 
    }
}



