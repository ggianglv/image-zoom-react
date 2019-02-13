import React from 'react'
import styled from 'styled-components'
import ReactZoom from './components/ReactZoom'

const Wrapper = styled.div`
  width: 555px;
`

const App = () => {
  return (
    <Wrapper>
      <ReactZoom url='https://www.w3schools.com/howto/img_forest.jpg' />
    </Wrapper>
  )
}

export default App
