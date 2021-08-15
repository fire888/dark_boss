import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'


const app = function(state = {}, action) {
    return ({ ...state })
}



const rootReducer = combineReducers({ app })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))