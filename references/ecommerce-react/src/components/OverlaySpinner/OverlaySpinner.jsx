import React from 'react'

import './OverlaySpinner.scss'

const OverlaySpinner = () => {
  return (
    <div className='overlay-loader'>
      <div className='inner-div'>
        <svg className='spinner' viewBox='0 0 50 50'>
          <circle
            className='path'
            cx='25'
            cy='25'
            r='20'
            fill='none'
            strokeWidth='4'
          ></circle>
        </svg>
        <h2>loading...</h2>
      </div>
    </div>
  )
}

export default OverlaySpinner
