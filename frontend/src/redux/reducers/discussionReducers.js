import * as actionTypes from "../constants/ActionTypes";
const USER_INITIAL_STATE = {
  loading: true,
  error: {},
  discussions: [],
};

export const discussionReducers = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_DISCUSSIONS_REQUEST:
      return { ...state };
    case actionTypes.GET_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload,
        loading: false,
      };
    case actionTypes.GET_DISCUSSIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const getDiscussionReducer = (
  state = { discussion: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_DISCUSSION_POST_REQUEST:
      return { ...state };
    case actionTypes.GET_DISCUSSION_POST_SUCCESS:
      return {
        ...state,
        discussion: action.payload,
        loading: false,
      };
    case actionTypes.GET_DISCUSSION_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const addDiscussionReducer = (
  state = { discussion: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_DISCUSSION_REQUEST:
      return { ...state };
    case actionTypes.ADD_DISCUSSION_SUCCESS:
      return { ...state, discussion: action.payload, loading: false };
    case actionTypes.ADD_DISCUSSION_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};
export const deleteDiscussionReducer = (
  state = { discussion: {}, loading: true },
  action
) => {
  switch (action.type) {
    case actionTypes.DELETE_DISCUSSION_REQUEST:
      return { ...state };
    case actionTypes.DELETE_DISCUSSION_SUCCESS:
      return { ...state, discussion:{...state.discussion, ...action.payload}, loading: false };
    case actionTypes.DELETE_DISCUSSION_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};
export const addCommentReducer = (
  state = {comments:[], loading: true},
  action
  ) => {
    debugger
    switch (action.type) {
      case actionTypes.ADD_COMMENT_REQUEST:
        return { ...state };
      case actionTypes.ADD_COMMENT_SUCCESS:
        return { ...state, comments: [...state.comments, ...action.payload], loading: false };
      case actionTypes.ADD_COMMENT_FAIL:
        return { ...state, error: action.payload, loading: false };
      default:
        return { ...state };
    }
  }
export const deleteCommentReducer = (
  state = {comments:[], loading: true},
  action
  ) => {
    switch (action.type) {
      case actionTypes.DELETE_COMMENT_REQUEST:
        return { ...state };
      case actionTypes.DELETE_COMMENT_SUCCESS:
        return { ...state, comments: [...state.comments, ...action.payload], loading: false };
      case actionTypes.DELETE_COMMENT_FAIL:
        return { ...state, error: action.payload, loading: false };
      default:
        return { ...state };
    }
  }