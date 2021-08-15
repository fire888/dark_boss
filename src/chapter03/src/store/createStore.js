import { createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import { FLOORS_CONF } from '../constants/constants_elements'





const DIALOGS_DATA = [
    {
     phrases: [
         {
             q: 'Hello there!',
             a: 'Good day, carbon-based life form.',
             event: 'nextReply',
             levelEvent: null,
         }, {
             q: 'What is this place ?',
             a: 'This is an entrance to the entropic hyper-maze.',
             event: 'nextReply',
             levelEvent: null,
         }, {
             q: 'And what happens if I enter it ?',
             a: 'This place is waiting.',
             event: 'close',
             levelEvent: null,
         },
     ]
  }, {
     phrases: [
         {
             q: 'Say, where do these corridors lead ?',
             a: 'They will lead you to the end.',
             event: 'nextReply',
             levelEvent: null,
         }, {
             q: 'Ooook, I\'m heading in then.',
             a: 'We will meet again.',
             event: 'close',
             levelEvent: null,
         },
     ]
  }, {
  
  
  
     phrases: [
         {
             q: 'What do you do here ?',
             a: 'Collecting the energy of the night.',
             event: 'nextReply',
             levelEvent: null,
         },
         {
             q: 'Can you tell me which way is out of here ?',
             a: 'It is about the journey, not the destination',
             event: 'close',
             levelEvent: null,
         },
     ]
  },
  
  
  
     {
     phrases: [
         {
         q: 'Hey, it looks like I\'m walking in circles.',
         a: 'You have walked long enough.',
         event: 'nextReply',
         levelEvent: null,
     },{
         q: 'Meaning?',
         a: 'The way to the next level is open to you.',
         event: 'close',
         levelEvent: 'addStairs',
     },
     ]
  },
  
  
     // %%%%%%%%%%%%%%%%%%%%%%% 22222222222222222 %%%%%%%%%%%%%%%%%%%%
  
     {
     phrases: [
         {
             q: 'Hi, I heard I can find the "end" around here?',
             a: 'Yes, I told you this is where the corridors lead.',
             event: 'nextReply',
             levelEvent: null,
         }, {
             q: 'Man, you all look the same.',
             a: 'We will meet again.',
             event: 'close',
             levelEvent: null,
         },
     ]
  },
  
  
     {
         phrases: [
             {
                 q: 'Soooo, is that you again ?',
                 a: 'Yes. All of me are myself.',
                 event: 'nextReply',
                 levelEvent: null,
             }, {
                 q: 'Yeah, just like those corridors.',
                 a: 'The meaning of everything is in being whole.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
     {
         phrases: [
             {
                 q: 'Am I there yet?',
                 a: 'The sign will be given when you are.',
                 event: 'nextReply',
                 levelEvent: null,
             }, {
                 q: 'How do I know what it is?',
                 a: 'I will give it to you.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
     {
         phrases: [
             {
                 q: 'That\'s the same exact corridor with you again.',
                 a: 'You are ready for the next level.',
                 event: 'close',
                 levelEvent: 'addStairs',
             },
         ]
     },
  
     // %%%%%%%%%%%%%%%%%%%%% 33333333 %%%%%%%%%%%%%%%%%%%%%%
  
  
     {
         phrases: [
             {
                 q: 'Hey man, seriously, how do I get out of here ?',
                 a: 'You have not reached the end.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'We\'ll how do you reach it ?',
                 a: 'I have my way.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
  
     {
         phrases: [
             {
                 q: 'So how\'s your way btw ?',
                 a: 'It is like yourself.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'And how long you\'ve been on it ?',
                 a: 'These walls can hear us.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
     {
         phrases: [
             {
                 q: 'I think you\'re weighing this corridor down.',
                 a: 'The next level is open to you.',
                 event: 'close',
                 levelEvent: 'addStairs',
             },
         ]
     },
  
  
  
  
  
  
    // %%%%%%%%%%%%%%%%%%%%% 444444444444444 %%%%%%%%%%%%%%
  
  
     {
         phrases: [
             {
                 q: 'Look bud, next level or not, nothing\'s changed at all !',
                 a: 'Except the number of steps.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'So this place counts steps ?',
                 a: 'This is place is waiting.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
  
     {
         phrases: [
             {
                 q: 'How long have you been here ?',
                 a: 'How long is irrelevant. What matters is the journey.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'Then why aren\'t you on one?',
                 a: 'With you walking for both of us, I do not have to.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
     {
         phrases: [
             {
                 q: 'Look, just make a new level, please.',
                 a: 'You are ready. It is waiting for you.',
                 event: 'close',
                 levelEvent: 'addStairs',
             },
         ]
     },
  
  
    // %%%%%%%%%%%%%%%%%% 5555555 %%%%%%%%%%%%%%%%%%%
  
     {
         phrases: [
             {
                 q: 'Wait, you are this place! You control all its fragments.',
                 a: 'You have almost reached the end.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'Why do you do this ?',
                 a: 'It is my way to warp space. More movement. More fragments.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
     {
         phrases: [
             {
                 q: 'How many people have been through here ?',
                 a: 'Many are still here.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'So where are they?',
                 a: 'Everyone has a different system of fragments.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
     {
         phrases: [
             {
                 q: 'Will you let me out ?',
                 a: 'All ways lead to the end.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'I wanna meet the others.',
                 a: 'The next level is waiting for you.',
                 event: 'close',
                 levelEvent: 'addStairs',
             },
         ]
     },
  
    // %%%%%%%%%%%%%%%%%%% 6666666666666666 %%%%%%%%%%%%%%%%%%
  
  
     {
         phrases: [
             {
                 q: 'Everything\'s looped here.',
                 a: 'Everything is looped with small differences.',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'How many levels even are there ?',
                 a: 'It all depends on you.',
                 event: 'close',
                 levelEvent: null,
             },
         ]
     },
  
  
  
     {
         phrases: [
             {
                 q: 'That\'s it, I\'m done.',
                 a: 'Have you reached your journey\'s end ?',
                 event: 'nextReply',
                 levelEvent: null,
             },
             {
                 q: 'Yes, you mad bastard! I have !',
                 a: 'Then I am giving you the sign.',
                 event: 'close',
                 levelEvent: 'addWell',
             },
         ]
     },
  ]  
  








const uiState = {
    sceneEnvironment: {
        color: FLOORS_CONF['-1']['start'].color,
        fogNear: FLOORS_CONF['-1']['start'].fogNear,
        fogFar: FLOORS_CONF['-1']['start'].fogFar,
        backgroundImgKey: null,

        //'start': { fogNear: 0, fogFar: 5, color: 0x18257d },
    },

    playerQuadrant: {
        oldDialogPlayerQuadrant: [0, 0, -50],
        oldQuadrant: [0, 0, 0],
        newQuadrant: [0, 0, 0],
        counter: null,
    },

    level: {
        isStartCorridorShow: true,
    },

    
    isShowFinalMessage: false,
    botAnswers: [],
    userReplicies: [],
    history: [],
    isShowControls: true,
    isButtonDialog: false,

    botIndex: -1,
    phraseIndex: 0,
    phrasesData: DIALOGS_DATA,
}



const ui = function(state = uiState, action) {

    if (action.type === 'TOGGLE_FINAL_MESSAGE') {
        return ({
            ...state,
            isShowFinalMessage: action.mode,
        })
    }





    if (action.type === 'CHANGE_ENVIRONMENT') {
        const { newQuadrant, environmentMode } = action

        if (!FLOORS_CONF[newQuadrant[1]]) return state;

        const { fogNear, fogFar, color, backgroundImgKey } = FLOORS_CONF[newQuadrant[1]][environmentMode]

        return ({
            ...state,
            sceneEnvironment: {
                fogNear,
                fogFar,
                color,
                backgroundImgKey,
            }
        })
    }




    if (action.type === 'CHANGE_QUADRANT') {
        return ({
            ...state,
            playerQuadrant: {
                ...state.playerQuadrant,
                ...action,
            },
        })
    }



    if (action.type === 'DESTROY_START_CORRIDOR') {
        return ({
            ...state,
            level: {
                ...state.level,
                isStartCorridorShow: false,
            }
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
            const userReplicies = [state.phrasesData[state.botIndex].phrases[state.phraseIndex + 1]]

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
                isButtonDialog: true,
                playerQuadrant: {
                    ...state.playerQuadrant,
                    oldDialogPlayerQuadrant: [...state.playerQuadrant.newQuadrant]
                }
            })
        }
    }



    if (action.type === 'TOGGLE_DIALOG') {

        let isNewBot = false
        const { oldDialogPlayerQuadrant, newQuadrant } = state.playerQuadrant
        if (
            oldDialogPlayerQuadrant[0] !== newQuadrant[0] ||
            oldDialogPlayerQuadrant[1] !== newQuadrant[1] ||
            oldDialogPlayerQuadrant[2] !== newQuadrant[2]
        ) isNewBot = true




        if (!isNewBot) {
            return ({
                ...state,
                isDialog: action.isDialog,
                isButtonDialog: true,
            })
        }



        const phraseIndex = 0
        const botIndex = state.botIndex + 1
        const isButtonDialog = false


        const userReplicies = state.phrasesData[botIndex] ? [state.phrasesData[botIndex].phrases[phraseIndex]] : []

        return ({
            ...state,

            userReplicies,
            botAnswers: [],
            isDialog: action.isDialog,
            isButtonDialog,

            isCanChangeBotIndex: false,
            botIndex,
            phraseIndex,
        })
    }

    if (action.type === 'TOGGLE_BUTTON') {

        return ({
            ...state,
            isDialog: false,
            isButtonDialog: action.isButtonDialog,
        })
    }


    return state
}



const rootReducer = combineReducers({ ui })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

