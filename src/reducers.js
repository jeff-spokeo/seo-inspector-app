import { combineReducers } from 'redux'
import { INSPECT_URLS, SELECT_URL, ADD_RESULT } from './actions'

const urlsReducer = (state = [], action) => {
    switch (action.type) {
        case INSPECT_URLS:
            return state.concat(action.urls).filter((url, index, self) => self.indexOf(url) === index)
        default:
            return state
    }
}

const selectedUrlReducer = (state = null, action) => {
    switch (action.type) {
        case SELECT_URL:
            return action.url
        default:
            return state
    }
}

const resultsReducer = (state = {}, action) => {
    switch (action.type) {
        case INSPECT_URLS:
            let newState = { ...state }
            action.urls.forEach(url => {
                if (newState[url] === undefined) {
                    newState[url] = { url, status: 'pending' }
                } else {
                    newState[url].status = 'pending'
                }
            })
            return newState
        case ADD_RESULT:
            return {
                ...state,
                [action.url]: { ...state[action.url], status: `done in ${action.end - action.start} ms` }
            }
        default:
            return state
    }
}

export default combineReducers({
    urls: urlsReducer,
    selectedUrl: selectedUrlReducer,
    results: resultsReducer
})
