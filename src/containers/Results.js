import React from 'react'
import { connect } from 'react-redux'
import { Module } from '../components/layout'

const Results = ({ url, status, result }) => (
  <Module>
    <div>
      {url} 
      { status && <span style={{ fontSize: '.7em', color: 'grey', marginLeft: '5px' }}>({status})</span> }
    </div>
    <pre>{result}</pre>
  </Module>
)

export default connect(
  state => ({
    ...state.results[state.selectedUrl]
  })
)(Results)
