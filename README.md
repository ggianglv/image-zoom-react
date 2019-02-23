# Image Zoom React
A component react to enlarge images on touch, click, or mouseover.
### Installation
<!--`yarn add image-zoom-react` or `npm install --save image-zoom-react`-->
### Usage
```
import React from 'react'
import ReactDom from 'react-dom'
import ImageZoom from 'image-zoom-react'

const App = () => (
    <ImageZoom url="image url" magnify={3} />
)

ReactDom.render(<App />, document.getElementById('app'))
```
### props
| props          | default     |  description                                                                        |
|----------------|-------------|-------------------------------------------------------------------------------------|
|   src          |  required   | src of image                                                                        |
|   alt          |  image      | alt of image                                                                        |
| zoomSrc        |  ''         | src of zoom image (may be an image in high res)                                     |
| touch          |  true       | Enables interaction via touch events.                                               |
| on             |  mouseover  | he type of event that triggers zooming. Choose from `mouseover` or `grab`           |
| duration       |  200        | The fadeIn/fadeOut speed of the large image.                                        |
| magnify        |  2          | This value is multiplied against the full size of the zoomed image                  |
| onImageLoaded  |  () => {}   | A function to be called when the image has loaded. Has param is the image element.  |
| onZoomIn       |  () => {}   | A function to be called when zoom in. Has param is the image element.               |
| onZoomOut      |  () => {}   | A function to be called when zoom out. Has param is the image element.              |
