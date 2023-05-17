import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Registration from "./component/Registration";
import Protected from "./component/Protected";
import Profile from "./component/Profile";
import { useEffect } from "react";
import { setSingleUser } from "./redux/LoginSlice";
import { useDispatch } from "react-redux";
import { fetchComment, fetchLike, fetchPost } from "./redux/PostsSlice";
import EditPost from "./component/EditPost";
import EditComment from "./component/EditComment";
import EditProfile from "./component/EditProfile";
// json-server --watch db.json

const LocalStorageItem = () => {
  let userDetails = localStorage.getItem("Logins");

  if (userDetails) {
    return JSON.parse(localStorage.getItem("Logins"));
  } else {
    return [];
  }
};


function App() {
  const dispatch = useDispatch();
  const data = LocalStorageItem();

  useEffect(()=>{
    if(data){
      dispatch(setSingleUser(data))
    }else {
      dispatch(setSingleUser([]))
    }
  },[data])

  useEffect(()=>{
    dispatch(fetchPost());
    dispatch(fetchComment());
    dispatch(fetchLike());
  },[])

  return (
  <BrowserRouter>
    <Navbar />
     <Routes>
      <Route path="/" element={<Protected Component={Home} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/edit-post/:ids" element={<EditPost />} />
      <Route path="/edit-comment/:ids" element={<EditComment />} />
      <Route path="/edit-profile/:ids" element={<EditProfile />} />
     </Routes>
  </BrowserRouter>
)}

export default App;
