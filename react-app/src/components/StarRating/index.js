import React, {useState} from 'react'
import './star.css'

function StarRating({ totalStars, setRate }) {
  const [starsSelected, setStarsSelected] = useState(0);

  const Star = ({selected = false, onClick = f => f}) => (
    <div className={selected ? "star selected" : "star"} onClick={onClick} />
  )

  const handleStar = (i) => {
    setStarsSelected(i + 1)
    setRate(i + 1)
  }

  return (
    <div className="star-rating">
      {
        [...Array(totalStars)].map((el, i) => (
          <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => handleStar(i)}
          />
        ))
      }
      <p>
        {starsSelected} of {totalStars} stars
      </p>
    </div>
  )
}

export default StarRating;
