import {inspect} from './utils/inspector'

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
      urls.map((url, i) => {
        let start = Date.now()
        return fetchUrl(url)
          .then(html => processHtml(i, html))
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
    fetch(`http://localhost:5301/api/fetch?url=${url}`)
      .then(response => response.text().then(resolve))
      .catch(reject)
  })
}

const processHtml = (i, html) => {
  return new Promise((resolve, reject) => {
    let id = `url-${i}`
    let node = document.getElementById(id)
    node.innerHTML = html.replace(/css/, 'css-ignore')
    let results = inspect(node, html)
    resolve(results)
  })
}
