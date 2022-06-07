import * as actionTypes from "../constants/ActionTypes";
import axios from "axios";

export const getAllDiscussions = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DISCUSSIONS_REQUEST });
    const { status, data } = await axios.get("/api/discussions");
    if (status === 200) {
      dispatch({
        type: actionTypes.GET_DISCUSSIONS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DISCUSSIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiscussionPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DISCUSSION_POST_REQUEST });

    const { data } = await axios.get(`/api/discussions/${id}`);

    dispatch({
      type: actionTypes.GET_DISCUSSION_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DISCUSSION_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDiscussion = (formData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_DISCUSSION_REQUEST });

    const { data } = await axios.post(`/api/discussions`, formData);

    dispatch({
      type: actionTypes.ADD_DISCUSSION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_DISCUSSION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDiscussion = (id) => async (dispatch) => {
  try{
    dispatch({ type: actionTypes.DELETE_DISCUSSION_REQUEST });

    const { data } = await axios.delete(`/api/discussions/${id}`);

    dispatch({
      type: actionTypes.DELETE_DISCUSSION_SUCCESS,
      payload: data,
    });

  }catch(error){
    dispatch({
      type: actionTypes.DELETE_DISCUSSION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const addComment = (id, formData) => async (dispatch) => {
  try{
    
    dispatch({ type: actionTypes.ADD_COMMENT_REQUEST });
    
    const { data } = await axios.post(`/api/discussions/comment/${id}`, formData);
    
    dispatch({
      type: actionTypes.ADD_COMMENT_SUCCESS,
      payload: data,
    });

  }catch(error){
    
    dispatch({
      type: actionTypes.ADD_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
export const deleteComment = (discussionId, commentId) => async (dispatch) => {
  try{
    dispatch({ type: actionTypes.DELETE_COMMENT_REQUEST });
    const { data } = await axios.delete(`/api/discussions/comment/${discussionId}/${commentId}`);
    dispatch({
      type: actionTypes.DELETE_COMMENT_SUCCESS,
      payload: data,
    });
  }catch(error){
    dispatch({
      type: actionTypes.DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const upvotePost = (id) => async (dispatch) => {
  try{
    const { data } = await axios.post(`/api/discussions/upvote/${id}`);
    dispatch({
      type: actionTypes.VOTE_DISCUSSION_SUCCESS,
      payload: {id: id, data: data},
    });
  }catch(error){

  }
}
export const downvotePost = (id) => async (dispatch) => {
  try{
    const { data } = await axios.post(`/api/discussions/downvote/${id}`);
    dispatch({
      type: actionTypes.VOTE_DISCUSSION_SUCCESS,
      payload: {id: id, data: data},
    });
  }catch(error){

  }
}
