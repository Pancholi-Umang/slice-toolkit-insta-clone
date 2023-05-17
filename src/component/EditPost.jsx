import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPost } from '../redux/PostsSlice';
import { useSelector } from 'react-redux';


const EditPost = () => {
    const { ids } = useParams();
    const [myState, setMyState] = useState("");
    const [image, setImages] = useState([]);
    const [emptyImage, setEmptyImage] = useState([]);
    const navigate = useNavigate();
    const loginUser = useSelector((state) => state?.registration?.user)
   

    const handleImage = (event) => {
        const files = event?.target?.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                newImages?.push(reader.result);
                if (newImages?.length === files?.length) {
                    setImages([...image, ...newImages]);
                }
            };
        }
    };

    const getData = () => {
        axios?.get(`http://localhost:3000/posts/${ids}`)
            .then((res) => {
                // console.log(res.data)
                setMyState(res?.data?.User_text);
                setEmptyImage(res?.data?.Post_image);
            })
            .catch((error) => console?.error(error));
    };
    useEffect(() => {
        getData();
    }, []);

    const postEdit = () => {
        if (myState?.length !== 0 && image?.length !== 0) {
            axios?.put(`http://localhost:3000/posts/${ids}`,
                    {
                        user_id:loginUser?.id,
                        User_name:loginUser?.name,
                        User_profile:loginUser?.profile,
                        User_text: myState,
                        Post_image: image,
                        id:ids,
                    }
                )
                .then((res) => {
                    // console.log(res?.data);
                    fetchPost();
                })
                .catch((error) => {
                    console.log(error);
                });

        } else if (myState?.length !== 0 && image?.length === 0) {
            axios
                ?.put(
                    `http://localhost:3000/posts/${ids}`,
                    {
                        user_id:loginUser?.id,
                        User_name:loginUser?.name,
                        User_profile:loginUser?.profile,
                        User_text: myState,
                        Post_image: emptyImage,
                        id:ids,
                    }
                )
                .then((res) => {
                    // console.log(res?.data);
                    fetchPost();
                })
                .catch((error) => console.log(error));

        } else {
            alert("proper Edit");
        }
        navigate('/')
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center flex-column">
                <Link to="/" className="btn btn-primary text-dark mb-2">
                    back to home page
                </Link>
                <textarea
                    type="text"
                    name="text"
                    className="mb-2"
                    style={{ height: "40px", paddingLeft: "10px" }}
                    onChange={(e) => setMyState(e?.target?.value)}
                    required
                    value={myState || ""}
                />
                <input
                    type="file"
                    onChange={handleImage}
                    style={{ width: "200px" }}
                    name="image"
                    multiple
                    className="mb-2 border border-primary"
                />
                <button onClick={postEdit} className="btn btn-secondary">
                    complate Edited
                </button>
            </div>
        </div>
    )
}

export default EditPost