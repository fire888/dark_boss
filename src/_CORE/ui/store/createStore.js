import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

import { startDefaultStoreData } from './defaultUiData'

export function prepareStore(root) {
    if (!root.customStore) root.customStore = {}

    const controls = function(state = startDefaultStoreData, action) {
        if (action.type === 'TOGGLE_INFO') {
            return ({
                ...state,
                isShowControls: !!state.isInfo,
                isInfo: !state.isInfo,
            })
        }
        if (action.type === 'CHANGE_INFO_CHAPTER') {
            return ({
                ...state,
                infoPanelData: {
                    ...state.infoPanelData,
                    currentChapterIndex: action.currentChapterIndex,
                }
            })
        }
        return ({ ...state })
    }
    
    const rootReducer = combineReducers({ controls, ...root.customStore })
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}  
