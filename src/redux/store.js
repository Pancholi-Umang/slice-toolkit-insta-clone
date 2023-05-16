import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import PostsSlice from "./PostsSlice";

const store = configureStore({
  reducer:{
    registration:LoginSlice,
    Userposts:PostsSlice,
  }
})

export default store