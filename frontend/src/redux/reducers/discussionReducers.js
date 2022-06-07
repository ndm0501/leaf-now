import * as actionTypes from "../constants/ActionTypes";
// const USER_INITIAL_STATE = {
//   loading: true,
//   error: {},
//   discussions: [],
// };

// export const discussionReducers = (state = USER_INITIAL_STATE, action) => {
//   switch (action.type) {
//     case actionTypes.GET_DISCUSSIONS_REQUEST:
//       return { ...state };
//     case actionTypes.GET_DISCUSSIONS_SUCCESS:
//       return {
//         ...state,
//         discussions: {...state.discussions, ...action.payload},
//         loading: false,
//       };
//     case actionTypes.GET_DISCUSSIONS_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: {...state.error, ...action.payload},
//       };
//     default:
//       return { ...state };
//   }
// };

// export const getDiscussionReducer = (
//   state = { discussion: {}, loading: true },
//   action
// ) => {
//   switch (action.type) {
//     case actionTypes.GET_DISCUSSION_POST_REQUEST:
//       return { ...state };
//     case actionTypes.GET_DISCUSSION_POST_SUCCESS:
//       return {
//         ...state,
//         discussion: {...state.discussion, ...action.payload},
//         loading: false,
//       };
//     case actionTypes.GET_DISCUSSION_POST_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: {...state.error, ...action.payload},
//       };
//     default:
//       return { ...state };
//   }
// };

// export const addDiscussionReducer = (
//   state = { discussion: {}, loading: true },
//   action
// ) => {
//   switch (action.type) {
//     case actionTypes.ADD_DISCUSSION_REQUEST:
//       return { ...state };
//     case actionTypes.ADD_DISCUSSION_SUCCESS:
//       return { 
//         ...state, 
//         discussion: {...state.discussion, ...action.payload}, 
//         loading: false 
//       };
//     case actionTypes.ADD_DISCUSSION_FAIL:
//       return { 
//         ...state, 
//         error: {...state.error, ...action.payload},
//         loading: false 
//       };
//     default:
//       return { ...state };
//   }
// };
// export const deleteDiscussionReducer = (
//   state = { discussion: {}, loading: true },
//   action
// ) => {
//   switch (action.type) {
//     case actionTypes.DELETE_DISCUSSION_REQUEST:
//       return { ...state };
//     case actionTypes.DELETE_DISCUSSION_SUCCESS:
//       return { ...state, discussion:{...state.discussion, ...action.payload}, loading: false };
//     case actionTypes.DELETE_DISCUSSION_FAIL:
//       return { ...state, error: {...state.error, ...action.payload}, loading: false };
//     default:
//       return { ...state };
//   }
// };
// export const addCommentReducer = (
//   state = {comments:[], loading: true},
//   action
//   ) => {
    
//     switch (action.type) {
//       case actionTypes.ADD_COMMENT_REQUEST:
//         return { ...state };
//       case actionTypes.ADD_COMMENT_SUCCESS:
//         return { ...state, comments: [...state.comments, ...action.payload], loading: false };
//       case actionTypes.ADD_COMMENT_FAIL:
//         return { ...state, error: action.payload, loading: false };
//       default:
//         return { ...state };
//     }
//   }
// export const deleteCommentReducer = (
//   state = {comments:[], loading: true},
//   action
//   ) => {
//     switch (action.type) {
//       case actionTypes.DELETE_COMMENT_REQUEST:
//         return { ...state };
//       case actionTypes.DELETE_COMMENT_SUCCESS:
//         return { ...state, comments: [...state.comments, ...action.payload], loading: false };
//       case actionTypes.DELETE_COMMENT_FAIL:
//         return { ...state, error: action.payload, loading: false };
//       default:
//         return { ...state };
//     }
//   }


  import {
    GET_DISCUSSIONS_SUCCESS,
    GET_DISCUSSIONS_FAIL,
    GET_DISCUSSION_POST_SUCCESS,
    ADD_DISCUSSION_SUCCESS,
    DELETE_DISCUSSION_SUCCESS,
    VOTE_DISCUSSION_SUCCESS,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
  } from '../constants/ActionTypes';
  
  const initialState = {
    discussions: [],
    discussion: {},
    loading: true,
    error: {}
  };
  
  function discussionReducers(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      
      case GET_DISCUSSIONS_SUCCESS:
        return {
          ...state,
          discussions: payload,
          loading: false
        };
      case GET_DISCUSSION_POST_SUCCESS:
        return {
          ...state,
          discussion: payload,
          loading: false
        };
      case ADD_DISCUSSION_SUCCESS:
        return {
          ...state,
          discussions: [payload, ...state.discussions],
          loading: false
        };
      case DELETE_DISCUSSION_SUCCESS:
        return {
          ...state,
          discussions: state.discussions.filter((discussion) => discussion._id !== payload),
          loading: false
        };
      case GET_DISCUSSIONS_FAIL:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case VOTE_DISCUSSION_SUCCESS:
        debugger
        return {
          ...state,
          discussions: state.discussions.map((discussion) =>
            discussion._id === payload.id ? { ...discussion, likes: payload.data } : discussion
          ),
          loading: false
        };
      case ADD_COMMENT_SUCCESS:
        return {
          ...state,
          discussion: { ...state.discussion, comments: payload },
          loading: false
        };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          discussion: {
            ...state.discussion,
            comments: payload
          },
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default discussionReducers;
  