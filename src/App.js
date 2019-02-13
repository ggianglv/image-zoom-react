import React from 'react'
import ReactZoom from './components/ReactZoom'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <ReactZoom
        url='https://www.w3schools.com/howto/img_forest.jpg'
        zoomUrl='http://www.jacklmoore.com/img/daisy.jpg'
      />
    </div>
  )
}

export default App
