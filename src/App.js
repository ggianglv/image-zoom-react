import React, { useState } from 'react'
import styled from 'styled-components'
import ReactZoom from './dist/ReactZoom'
import './App.css'

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`

const Options = styled.div`
  display: flex;
  align-items: center;
`
const Option = styled.div`
  display: flex;
  font-size: 14px;
  margin-right: 10px;
`

const CustomLabel = styled.div`
  margin-right: 4px;
`

const CustomSelect = styled.select`
  
`

const GithubLink = styled.a`
  img {
    height: 30px;
    width: 30px;
  }
`

const App = () => {
  const [on, setOn] = useState('mouseover')
  const [magnify, setMagnify] = useState(1.5)

  const onOnChange = (e) => {
    setOn(e.target.value)
  }

  const onMagnifyChange = (e) => {
    setMagnify(+e.target.value)
  }

  return (
    <div className="App">
      <Wrapper>
        <ReactZoom
          key={magnify} // trigger remount when change magnify
          on={on}
          magnify={magnify}
          src='http://www.jacklmoore.com/img/daisy.jpg'
        />

        <Options>
          <Option>
            <CustomLabel>
              on
            </CustomLabel>
            <CustomSelect onChange={onOnChange} value={on}>
              <option value="mouseover">mouseover</option>
              <option value="grab">grab</option>
            </CustomSelect>
          </Option>

          <Option>
            <CustomLabel>
              magnify
            </CustomLabel>
            <CustomSelect onChange={onMagnifyChange} value={magnify}>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
            </CustomSelect>
          </Option>

          <GithubLink href="https://github.com/gianglevan94/image-zoom-react">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github icon" />
          </GithubLink>
        </Options>
      </Wrapper>
    </div>
  )
}

export default App
