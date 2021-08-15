import { createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

const appData = {
    isShowControls: true,
}

const ui = function(state = appData, action) {
    if (action.type === 'AAAA') {
        return ({
            ...state,
            aaa: 'BBBB',
        })
    }
    return state
}


const rootReducer = combineReducers({ ui })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

