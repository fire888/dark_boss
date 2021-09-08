import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

export function prepareStore(root) {
    if (!root.customStore) root.customStore = {}

    const controls = function(state = { isShowControls: true }, action) {
        return ({ ...state })
    }
    
    const rootReducer = combineReducers({ controls, ...root.customStore })
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}  
