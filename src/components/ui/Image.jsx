import React from 'react'

const Image = ({src , alt , width , height}) => {
  return (
    <img src={src} 
    alt={alt} 
    width={width}
    height={height}
    className=" h-56 object-cover rounded-t-xl" 

    />
  )
}

export default Image
