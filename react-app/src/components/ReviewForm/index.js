import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as reviewActions from '../../store/review'
import StarRating from '../StarRating'
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

  }, [rate])
  return (
  <div className="review-form-wrapper">
    <form onSubmit={onSubmit} className='review_form'>
      <StarRating totalStars={5} setRate={setRate} />
      <label>Title</label>
      <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <label>Comment</label>
      <textarea type="text" name='comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <button type="submit" className="review-btn">Submit</button>
    </form>
  </div>
  )


  // }, [])

// previous review form
//   return (
//     <>
//       <form onSubmit={onSubmit} id="reviewform">
//         <div id="formdiv">
//           <label for="num">
//             Rate
//             <input
//               id="num"
//               type="number"
//               name="rating"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//             ></input>
//           </label>
//           <br></br>
//           <label for="title">
//             Title
//             <input
//               id="title"
//               type="text"
//               name="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             ></input>
//           </label>
//           <br></br>
//           <label for="commbox">
//             Comment
//             <textarea
//               id="commbox"
//               type="textarea"
//               name="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             ></textarea>
//           </label>
//           <br></br>
//           <button id="subbut" type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </>
//   );

}

export default ReviewForm;
