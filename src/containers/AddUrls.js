import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inspectUrls } from '../actions'
import { Module } from '../components/layout'

const AddUrls = ({ inspectUrls }) => {
  let input
  let defaultUrls = ['https://www.spokeo.com', 'https://www.spokeo.com/John-Smith']
  return (
    <Module>
      <textarea style={{width:'100%', maxWidth: '700px', height:200}} ref={node => input = node} 
        placeholder="Enter URL(s), one per line" 
        defaultValue={defaultUrls.join('\n')} />
      <button onClick={() => input.value && inspectUrls(input.value.trim().split('\n'))}>Inspect Urls</button>
    </Module>
  )
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators({ inspectUrls }, dispatch)
)(AddUrls)