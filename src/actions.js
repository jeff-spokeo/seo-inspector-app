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
      urls.map((url, i) =>
        fetchUrl(url, i)
          .then(result => processHtml(result))
          .catch((err, start) => dispatch(addResult({ url, start, end: Date.now(), result: 'err1' })))
          .then(result => dispatch(result))
          .catch((err, start) => dispatch(addResult({ url, start, end: Date.now(), result: 'err2' })))
      )
    )
  }
}

export const selectUrl = (url) => {
  return { type: SELECT_URL, url }
}

export const addResult = ({ url, start, end, result = null }) => {
  console.log('addResult', start)
  return { type: ADD_RESULT, url, start, end, result }
}

/*
 * helper methods
 */

const fetchUrl = (url, i) => {
  return new Promise((resolve, reject) => {
    let start = Date.now()
    console.log('fetchUrl', start)
    setTimeout(() => {
      // fetch(url, { 'content-type': 'text/plain' })
      //   .then(response => response.text().then(html => {
      //     console.log('html = ', html)
      //     resolve({ url, html, start })
      //   }).catch(err => reject('err11', start))
      //   ).catch(err => reject('err22', start))
    }, 1000 * i)
  })
}

const processHtml = ({ url, html, start }) => {
  console.log('processHtml', start)
  return new Promise((resolve, reject) => {
    resolve(addResult({ url, start, end: Date.now(), result: html }))
  })
}
