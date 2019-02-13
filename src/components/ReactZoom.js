import React, { useState, useLayoutEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'

const ON_TYPES = {
  mouseover: 'mouseover',
  grab: 'grab',
}

const ReactZoom = (props) => {
  const {
    url,
    zoomUrl,
    duration,
    magnify,
    on,
    onImageLoaded,
    onZoomIn,
    onZoomOut,
    alt
  } = props
  const [data, setData] = useState({
    left: 0,
    top: 0,
  })
  const [isZoom, setIsZoom] = useState(false)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    setData({
      ...data,
      width: imageRef.current.clientWidth * magnify,
      height: imageRef.current.clientHeight * magnify,
    })
  }, [])

  const getPos = (e) => {
    const rect = e.target.getBoundingClientRect()
    return {
      x: e.clientX - (rect.left + document.body.scrollLeft),
      y: e.clientY - (rect.top + document.body.scrollTop),
    }
  }

  const zoom = (e) => {
    const pos = getPos(e)
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

  return (
    <div
      style={{
        border: 0,
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        cursor: on === ON_TYPES.grab && isZoom ? 'grab' : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <img
        ref={imageRef} alt={alt}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        src={url}
      />
      {!!data.width && (
        <img
          style={{
            pointerEvents: 'none',
            width: `${data.width}px`,
            height: `${data.height}px`,
            position: 'absolute',
            left: data.left,
            top: data.top,
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: +isZoom,
          }}
          alt="image zoom"
          src={zoomUrl || url}
        />
      )}
    </div>
  )
}

ReactZoom.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  zoomUrl: PropTypes.string,
  on: PropTypes.string,
  duration: PropTypes.number,
  magnify: PropTypes.number,
  onImageLoaded: PropTypes.func,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
}

ReactZoom.defaultProps = {
  zoomUrl: '',
  alt: 'image',
  on: ON_TYPES.grab,
  magnify: 1.5,
  duration: 200,
  onImageLoaded: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
}

export default ReactZoom
