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
      urls.map((url) => {
        let start = Date.now()
        return fetchUrl(url)
          .then(processHtml)
          .then(result => dispatch(addResult({ url, start, end: Date.now(), result })))
          .catch(err => dispatch(addResult({ url, start, end: Date.now(), result: err })))
      })
    )
  }
}

export const selectUrl = (url) => {
  return { type: SELECT_URL, url }
}

export const addResult = ({ url, start, end, result = null }) => {
  return { type: ADD_RESULT, url, start, end, result }
}

/*
 * helper methods
 */

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(`http://localhost:5301/api/fetch?url=${url}`)
        .then(response => response.text().then(html => {
          resolve(html)
        })).catch(reject)
    }, 5000 * Math.random())
  })
}

const processHtml = (html) => {
  return new Promise((resolve, reject) => {
    // TODO: process the html
    resolve(html)
  })
}
