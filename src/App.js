import React from 'react'
import styled from 'styled-components'
import ReactZoom from './components/ReactZoom'
import './App.css'

const Wrapper = styled.div`
  width: 500px;
`

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <ReactZoom
          url='http://www.jacklmoore.com/img/daisy.jpg'
        />
      </Wrapper>
    </div>
  )
}

export default App
