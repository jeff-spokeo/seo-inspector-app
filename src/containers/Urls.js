import React from 'react'
import { connect } from 'react-redux'
import { selectUrl } from '../actions'
import { Module } from '../components/layout'

const Urls = ({ urls, results, onUrlClick }) => (
  <Module>
    <ol>
      {urls && urls.map((url, i) =>
        <li key={i} style={{textAlign:'left'}}>
          <a href="javascript:// void" onClick={(e) => {e.preventDefault(); onUrlClick(url)}}>{url}</a>
          <span style={{fontSize:'.7em', color:'grey', marginLeft:'5px'}}>({results[url].status})</span>
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
  dispatch => ({
    onUrlClick: (url) => dispatch(selectUrl(url))
  })
)(Urls)
