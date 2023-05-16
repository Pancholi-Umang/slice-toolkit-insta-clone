import React, { useEffect } from 'react'
import './style.css'
import Create from './Create'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from './Post';

const Home = () => {

  const UserLogin = useSelector(state => state?.registration?.user);
  const user_all_posts = useSelector(state => state?.Userposts?.posts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserLogin?.id) {
      navigate("/login")
    }
  }, [UserLogin])

  return (
    <div className='container'>
      <div className="feed">
        <Create UserLogin={UserLogin} />
        {
          user_all_posts?.map((post_value) => {
            return <Post key={post_value?.id} post_value={post_value} />
          })
        }
      </div>
    </div>
  )
}

export default Home