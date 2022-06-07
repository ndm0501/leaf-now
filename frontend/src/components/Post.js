import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteDiscussion,
  getDiscussionPost,
  addComment,
} from "../redux/actions/discussionActions";
import Button from "./Button";
import "./Post.css";
import Comment from "./Comment";
import { validateCommentInput } from "../utils/validator";
import { getCurrentUser } from "../redux/actions/userActions";

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const discussionDetails = useSelector((state) => state.discussions);
  const authDetails = useSelector((state) => state.auth);

  const { loading, error, discussion ={} } = discussionDetails;
  const { user } = authDetails;
  const [comment, setComment] = useState({ text: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (discussion && match.params.id !== discussion._id) {
      dispatch(getDiscussionPost(match.params.id));
      dispatch(getCurrentUser());
    }
  }, [dispatch, match, discussion._id]);

  const handleDelete = (id) => {
    dispatch(deleteDiscussion(id));
    
    setTimeout(()=>{
      alert('Discussion deleted successfully')
      history.push("/discussions");
    }, 500)
    
  };

  const handleComment = (id) => {
    const {errors, isValid} = validateCommentInput(comment);
    setErrors(errors);
    if(isValid){
      dispatch(addComment(id, comment));
    }
  };

  const { name, title, text, date, likes = [], comments = [] } = discussion;
  const canDelete = (discussion && discussion.user) == (user && user.userId);

  return (
    <div className="post__screen">
      <div className="d-flex header">
        <div>
          <h2>{title}</h2>
        </div>
        {canDelete && (
          <div className="delete__post">
            <Button
              type="quaternary"
              label="Delete"
              onClick={() => handleDelete(discussion._id)}
            />
          </div>
        )}
      </div>
      <div className="d-flex header_desc">
        <div className="d-flex flex-column">
          <small className="text-muted">By {name}</small>
          <small className="text-muted">{date}</small>
        </div>
        <div className="">
          <strong className="text">
            <i className="fas fa-solid fa-heart" />
            <span className="ml-2">{`${likes && likes.length} Likes`}</span>
          </strong>
        </div>
        <div></div>
      </div>
      <div className="content mt-5">{text}</div>
      <div className="d-flex mt-5 mb-5">
        <div className="user__avatar username_avatar">{user && user.name && user.name[0]}</div>
        <div className="d-flex w-100 ">
          <form className="w-100 ml-2">
            <div className="form-group ">
              <label for="comment">Add comment:</label>
              <textarea
                className="form-control"
                id="comment"
                rows="2"
                value={comment.text}
                onChange={(e) =>
                  setComment((state) => ({ ...state, text: e.target.value }))
                }
              ></textarea>
              {errors['comment'] && <small className="text text-danger">{errors['comment']}</small>}
            </div>
            <Button
              type="tertiary"
              label="Comment"
              onClick={(e) => {
                e.preventDefault();
                handleComment(discussion._id);
              }}
            />
          </form>
        </div>
      </div>
      {comments && comments.map((comment) => (
        <Comment
          date={comment.date}
          name={comment.name}
          text={comment.text}
          key={comment._id}
          commentId={comment._id}
          postId={discussion._id}
        />
      ))}
    </div>
  );
};
export default Post;
