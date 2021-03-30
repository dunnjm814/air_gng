import React from 'react'
import '../star.css'
function StarDisplay({ totalStars }) {
  return (
    <div>
      {[...Array(totalStars)].map((el, i) => (
        <div key={i} className="star display"></div>
      ))}
    </div>
  )
}

export default StarDisplay
