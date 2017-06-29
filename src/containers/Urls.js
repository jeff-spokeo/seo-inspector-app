import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectUrl } from '../actions'
import { Module, HiddenDom } from '../components/layout'

const Urls = ({ urls, results, selectUrl }) => (
  <Module>
    <ol>
      {urls && urls.map((url, i) =>
        <li key={i} style={{ textAlign: 'left' }}>
          <a onClick={(e) => { e.preventDefault(); selectUrl(url) }} style={{cursor: 'pointer'}}>{url}</a>
          <span style={{ fontSize: '.7em', color: 'grey', marginLeft: '5px' }}>({results[url].status})</span>
          <HiddenDom id={`url-${i}`}>{`url-${i}`}</HiddenDom>
        </li>
      )}
    </ol>
  </Module>
)

export default connect(
  state => ({
    urls: state.urls,
    results: state.results
  }),
  dispatch => bindActionCreators({ selectUrl }, dispatch)
)(Urls)
