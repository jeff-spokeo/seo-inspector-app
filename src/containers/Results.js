import React from 'react'
import { connect } from 'react-redux'
import { Module } from '../components/layout'

const Results = ({ url, results }) => (
  <Module>
    <div>{url}</div>
    <pre>{results && JSON.stringify(results)}</pre>
  </Module>
)

export default connect(
  state => ({
    url: state.selectedUrl,
    results: state.results[state.selectedUrl]
  })
)(Results)
