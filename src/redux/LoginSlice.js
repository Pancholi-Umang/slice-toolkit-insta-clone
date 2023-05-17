import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  users: [],
  user: [],
  status: STATUSES.IDLE,
};

const LoginSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSingleUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setStatus, setSingleUser } = LoginSlice.actions;
export default LoginSlice.reducer;

export const postUsers = (data) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await axios
        .post(`http://localhost:3000/registration`, data)
        .then((res) => {
          dispatch(setStatus(STATUSES.IDLE));
        });
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};

export const getUsers = (data) => {
  return async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      axios
        .get(
          `http://localhost:3000/registration/?email=${data?.email}&password=${data.password}`
        )
        .then((res) => {
          localStorage.setItem("Logins", JSON.stringify(res.data[0]));
          console.log(res.data)
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(setSingleUser(res.data[0]));
        });
      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    };
  };
  
  
  export const patchData = (data) => {
    return async (dispatch) => {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        axios
        .patch(`http://localhost:3000/registration/${data?.id}`,data) 
        .then((res) => {
          console.log(res.data)
          localStorage.setItem("Logins", JSON.stringify(res.data));
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(setSingleUser(res.data));
        });
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
};
