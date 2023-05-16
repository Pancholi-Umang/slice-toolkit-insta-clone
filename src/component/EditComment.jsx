import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditCommentSuccessfull } from '../redux/PostsSlice';

const EditComment = () => {

    const { ids } = useParams();
    const [inputValue, setInputValue] = useState("");

    const getData = () => {
        axios?.get(`http://localhost:3000/comments/${ids}`)
            .then((res) => {
                setInputValue(res.data.comment);
            })
            .catch((error) => console?.error(error));
    };
    useEffect(() => {
        getData();
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commentUpdated = () => {
        inputValue.length !== 0 ? dispatch(EditCommentSuccessfull({inputValue,ids})) : alert("please Enter Valid Comment")
        navigate("/")
    }


  return (
    <div className='container d-flex align-items-center justify-content-between flex-column'>
            <Link to="/" className="btn btn-outline-danger text-dark mb-2" style={{ height: "40px", width: "250px" }}>
                back to home page
            </Link>
            <input type="text" value={inputValue || ""} onChange={(e) => setInputValue(e?.target?.value)} style={{ height: "40px", width: "250px", paddingLeft: "19px" }} />
            <button onClick={commentUpdated}  className='btn btn-outline-success mt-2' style={{ height: "40px", width: "250px" }}>update comment</button>
        </div>
  )
} 
export default EditComment