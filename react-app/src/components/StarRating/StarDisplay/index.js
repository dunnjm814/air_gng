import React from 'react'
import '../star.css'
function StarDisplay({ totalStars }) {
  return (
    <div>
      {[...Array(totalStars)].map((el, i) => (
        <div className="star selected"></div>
      ))}
    </div>
  )
}

export default StarDisplay
