import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  posts: [],
  like: [],
  comment: [],
  post: {},
  status: STATUSES.IDLE,
};

const PostsSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    getComment(state, action) {
      state.comment = action.payload;
    },
    getLike(state, action) {
      state.like = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { getPosts, setStatus, getComment, getLike } = PostsSlice.actions;
export default PostsSlice.reducer;

export const postCreated = (data) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios
        .post(`http://localhost:3000/posts`, {
          user_id: data?.id,
          User_name: data?.name,
          User_profile: data?.profile,
          User_text: data?.text,
          Post_image: data?.image,
        })
        .then((res) => {
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(fetchPost());
        });
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const fetchPost = () => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.get(`http://localhost:3000/posts`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(getPosts(res.data));
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const PostdeleteSuccess = (id) => {
  console.log(id);
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(fetchPost());
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const fetchComment = () => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.get(`http://localhost:3000/comments`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(getComment(res.data));
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const commentArray = (data) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.post(`http://localhost:3000/comments`, data).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(fetchComment());
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const EditCommentSuccessfull = ({ inputValue, ids }) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios
        .patch(`http://localhost:3000/comments/${ids}`, {
          comment: inputValue,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(fetchComment());
        });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const deletCommentUser = (id) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.delete(`http://localhost:3000/comments/${id}`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(fetchComment());
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

// -----> Like Array ----->

export const fetchLike = () => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.get(`http://localhost:3000/like`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(getLike(res.data));
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const likeArray = (data) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.post(`http://localhost:3000/like`, data).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(fetchLike());
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const EditLikeSuccessfull = ({ inputValue, ids }) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios
        .patch(`http://localhost:3000/like/${ids}`, {
          comment: inputValue,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(fetchLike());
        });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const deletLikeUser = (id) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios.delete(`http://localhost:3000/like/${id}`).then((res) => {
        dispatch(setStatus(STATUSES.IDLE));
        dispatch(fetchLike());
      });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};
