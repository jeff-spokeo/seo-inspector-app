import React, { Component } from 'react'
import { Column, Header } from './layout'
import AddUrls from '../containers/AddUrls'
import Urls from '../containers/Urls'
import Results from '../containers/Results'
import '../assets/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Spokeo SEO Inspector" />
        <div className="App-intro">
          <Column width='30%'>
            <AddUrls />
          </Column>
          <Column width='30%'>
            <Urls />
          </Column>
          <Column width='40%'>
            <Results />
          </Column>
        </div>
      </div>
    )
  }
}

export default App
