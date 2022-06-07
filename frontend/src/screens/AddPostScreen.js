import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { addDiscussion } from "../redux/actions/discussionActions";
import { validateDiscussionPostInput } from "../utils/validator";
import "./AddPostScreen.css";


const AddPostScreen = () => {
  const [state, setState] = useState({
    title: "",
    text: "",
  });
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();
  const discussionDetails = useSelector((state) => state.discussions);
  // const { loading, discussion } = discussionDetails;

  const handleChange = (e) => {
      setState(state => ({...state, [e.target.name]: e.target.value}))
  }
  const handlePublish = (e) => {
    e.preventDefault();
    const {errors, isValid} = validateDiscussionPostInput(state);
    setErrors(errors)
    if(isValid){
      dispatch(addDiscussion(state));
      setTimeout(()=>{
        alert('Discussion added successfully')
        history.push('/discussions')
      },100);
    }
  }

  return (
    <div className="addpost__screen">
      <div className="form__container">
        <h4 className="header">Add details below</h4>
        <form className="mt-4">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <textarea
              type="text"
              className="form-control"
              id="title"
              name="title"
              rows="2"
              onChange={handleChange}
            />
            {errors['title'] && <small className="text text-danger">{errors['title']}</small>}
          </div>
          <div className="mt-2 form-group">
            <label htmlFor="text">Article content</label>
            <textarea
              className="form-control"
              id="text"
              name="text"
              rows="10"
              onChange={handleChange}
            ></textarea>
            {errors['text'] && <small className="text text-danger">{errors['text']}</small>}
          </div>
          <Button type="primary" label="Publish" onClick={handlePublish} />
        </form>
      </div>
    </div>
  );
};
function shouldUpdate(prevProps, nextProps){
  console.log('ps', prevProps)
  console.log('pk', nextProps)
}
export default React.memo(AddPostScreen, shouldUpdate);
