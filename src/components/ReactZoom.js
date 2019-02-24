import React, { useState, useLayoutEffect, useRef, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import './zoom.css'

const ON_TYPES = {
  mouseover: 'mouseover',
  grab: 'grab',
}

const preventBehavior = (e) => {
  if (e.cancelable) {
    e.preventDefault()
  }
}

const ReactZoom = (props) => {
  const {
    src,
    zoomSrc,
    duration,
    magnify,
    on,
    onImageLoaded,
    onZoomIn,
    onZoomOut,
    alt,
    touch,
  } = props
  const [data, setData] = useState({
    left: 0,
    top: 0,
  })
  const [isZoom, setIsZoom] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    if (isZoom) {
      onZoomIn(imageRef.current)
    } else {
      onZoomOut(imageRef.current)
    }
  }, [isZoom])

  useLayoutEffect(() => {
    const image = document.createElement('img')
    image.onload = () => {
      setData({
        ...data,
        width: imageRef.current.clientWidth * magnify,
        height: imageRef.current.clientHeight * magnify,
      })
      onImageLoaded(imageRef.current)
    }
    image.src = src
  }, [])

  const getPos = (e, isTouch = false) => {
    const rect = e.target.getBoundingClientRect()
    const clientX = isTouch ? e.targetTouches[0].clientX : e.clientX
    const clientY = isTouch ? e.targetTouches[0].clientY : e.clientY

    let x = clientX - rect.left
    let y = clientY - rect.top
    x = Math.max(0, x)
    y = Math.max(0, y)

    return { x, y }
  }

  const zoom = (e, isTouch = false) => {
    const pos = getPos(e, isTouch)
    const originWidth = data.width / magnify
    const originHeight = data.height / magnify
    const left = (pos.x / originWidth) * (originWidth - data.width)
    const top = (pos.y / originHeight) * (originHeight - data.height)
    setData({
      ...data,
      left: `${left}px`,
      top: `${top}px`,
    })
  }

  const onMouseMove = (e) => {
    if (!isZoom) {
      return
    }
    zoom(e)
  }

  const onMouseEnter = () => {
    if (on === ON_TYPES.mouseover) {
      setIsZoom(true)
    }
  }

  const onMouseLeave = () => {
    setIsZoom(false)
  }

  const onMouseDown = (e) => {
    if (on === ON_TYPES.grab) {
      setIsZoom(true)
      zoom(e)
    }
  }

  const onMouseUp = () => {
    if (on === ON_TYPES.grab) {
      setIsZoom(false)
    }
  }

  const onTouchStart = (e) => {
    if (!touch) {
      return
    }
    window.addEventListener('touchmove', preventBehavior, { passive: false })
    setIsZoom(true)
    zoom(e, true)
  }

  const onTouchMove = (e) => {
    if (!touch) {
      return
    }

    zoom(e, true)
  }

  const onTouchEnd = () => {
    if (!touch) {
      return
    }
    window.removeEventListener('touchmove', preventBehavior)

    setIsZoom(false)
  }

  return (
    <div
      className="react-zoom-wrapper"
      style={{
        cursor: on === ON_TYPES.grab && isZoom ? 'grab' : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        ref={imageRef}
        alt={alt}
        className="react-zoom-origin-image"
        src={src}
      />
      {!!data.width && (
        <img
          className="react-zoom-image"
          style={{
            width: `${data.width}px`,
            height: `${data.height}px`,
            left: data.left,
            top: data.top,
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: +isZoom,
          }}
          alt={alt}
          src={zoomSrc || src}
        />
      )}
    </div>
  )
}

ReactZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  zoomSrc: PropTypes.string,
  touch: PropTypes.bool,
  on: PropTypes.string,
  duration: PropTypes.number,
  magnify: PropTypes.number,
  onImageLoaded: PropTypes.func,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
}

ReactZoom.defaultProps = {
  zoomSrc: '',
  touch: true,
  alt: 'zoom',
  on: ON_TYPES.mouseover,
  magnify: 2,
  duration: 200,
  onImageLoaded: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
}

export default memo(ReactZoom)
