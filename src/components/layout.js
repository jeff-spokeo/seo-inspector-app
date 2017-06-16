import React from 'react'
import logo from '../assets/logo.svg'

export const Header = ({ title }) => (
    <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{title}</h2>
    </div>
)

export const Column = ({ width, children }) => (
    <div style={{ float: 'left', margin: 'auto', width: width || '100%' }}>
        {children}
    </div>    
)

export const Module = ({ width, children }) => (
    <div style={{ margin: '10px' }}>
        {children}
    </div>
)