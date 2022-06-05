import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../redux/actions/discussionActions";

const Comment = ({ postId, name, date, text, commentId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleDeleteComment = () => {
        dispatch(deleteComment(postId, commentId));
        /**  */
        window.location.reload();
    }
    const commentDetails = useSelector((state) => state.deleteComment);
    const {comments} = commentDetails;

  return (
    <div className="d-flex mt-1 comment__section">
      <div className="user__avatar">A</div>
      <div className="w-100 ml-2">
        <div className="d-flex justify-content-between">
          <div>
            <strong>{name}</strong>
            <br />
            <small>{date}</small>
          </div>
          <div className="comment__delete" onClick={handleDeleteComment}>
          <i className="fas fa-trash">
              <span className="ml-2">Delete</span>
          </i>
          </div>
        </div>
        <div className="mt-2 comments__container">{text}</div>
      </div>
    </div>
  );
};
export default Comment;
