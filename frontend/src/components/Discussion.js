import React from "react";
import {  useHistory } from "react-router-dom";
import Button from "./Button";
import "./Discussion.css";

const Discussion = ({
  id,
  title,
  text,
  author,
  likes,
  comments,
  createdAt,
}) => {
    const history = useHistory();
    const handleReadClick = (id) => {
        return history.push(`/discussions/${id}`);
    }
  return (
    <div className="discussion__card">
      <div className="card">
        <div className="card-body">
          <div className="card__header">
            <h5 className="card-title">{title}</h5>
            <div className="d-flex vote__actions">
                <span className="px-2"><i className="fas fa-thumbs-up"></i></span>
                <span className="px-2"><i className="fas fa-thumbs-down"></i></span>
            </div>
          </div>
          <p className="card-text">{text}</p>
          <div className="card__footer">
            <p className="card-text">
              <small className="text-muted">By: {author}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated: 3 mins ago</small>
            </p>
          </div>
          <div className="card__footer">
            <i className="fas fa-solid fa-heart heart__icon">
              <span> {likes && likes.length || 0} Likes</span>
            </i>
            <Button label={"Read More..."} type="tertiary"
                onClick={() => handleReadClick(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Discussion;
