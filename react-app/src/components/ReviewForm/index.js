import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as reviewActions from '../../store/review'
import StarRatingComponent from "react-star-rating-component";
import './reviewForm.css'


function ReviewForm() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [rate, setRate] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const {craft_id} =  useParams()

  const onSubmit = (e) => {
    e.preventDefault()
    if (sessionUser) {
      const userId = sessionUser.id
      dispatch(reviewActions.submitReview(rate, title, comment, userId, craft_id))
    }
  }

  useEffect(() => {

  }, [])
  return <>
    <form onSubmit={onSubmit}>
      <StarRatingComponent
      name="reviewRating"
      startCount={5}

      />
      <label>Title</label>
      <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <label>Comment</label>
      <input type="text" name='comment' value={comment} onChange={(e) => setComment(e.target.value)}></input>
      <button type="submit">Submit</button>
    </form>
  </>
}

export default ReviewForm
