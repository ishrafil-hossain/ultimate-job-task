
import React from 'react'
import NotFound from '../../Assets/notfound.jpg'

const ErrorPage = () => {
  return (
    <div className='container'>
      <img style={{ width: "50%", margin: "0 auto", display: "block" }} src={NotFound} alt="" />
    </div>
  )
}

export default ErrorPage