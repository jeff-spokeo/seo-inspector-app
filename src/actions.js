/*
 * action types
 */

export const INSPECT_URLS = 'INSPECT_URLS'
export const ADD_RESULT = 'ADD_RESULT'
export const SELECT_URL = 'SELECT_URL'

/*
 * action creators
 */

export const inspectUrls = (urls) => {
  return (dispatch, getState) => {
    dispatch({ type: INSPECT_URLS, urls })
    return Promise.all(
      urls.map((url, i) => fetchUrl(url, i)
        .then(result => dispatch(result)))
    )
  }
}

export const selectUrl = (url) => {
  return { type: SELECT_URL, url }
}

export const addResult = (url, start, end) => {
  return { type: ADD_RESULT, url, start, end }
}

/*
 * helper methods
 */

const fetchUrl = (url, i) => {
  return new Promise((resolve, reject) => {
    let start = Date.now()
    setTimeout(() => {
      fetch(url, { mode: 'no-cors' })
        .then(response => {
          resolve(addResult(url, start, Date.now()))
        })
    }, 1000 * i)
  })
}
