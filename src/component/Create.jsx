import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreated } from "../redux/PostsSlice";

const Create = ({ UserLogin }) => {

    const [text, setText] = useState("");
    const [image, setImages] = useState([]);
    const { id, name, profile } = UserLogin;
    const dispatch = useDispatch();

    const createPost = (e) => {
        e.preventDefault(); setImages([]); setText("");
        dispatch(postCreated({ id, name, profile, text, image }))
    };


    const handleImage = (event) => {
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                newImages.push(reader.result);
                if (newImages?.length === files?.length) {
                    setImages([...image, ...newImages]);
                }
            };
        }
    };

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <img
                    className="user__avatar"
                    src={profile}
                    style={{ height: "40px" }}
                    alt="error"
                />
                <form onSubmit={createPost}>
                    <input
                        className="messageSender__input"
                        onChange={(e) => setText(e?.target?.value)}
                        placeholder="What's on your mind?"
                        type="text"
                        value={text}
                        required
                    />
                    <button type="submit" className="border-0">➡️</button>
                    <input type="file" className="d-none" id="fileInput" multiple onChange={handleImage} required />
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <span style={{ color: "red" }} className="material-icons">

                        <i className="fas fa-camera-retro"></i>
                    </span>
                </div>
                <label htmlFor="fileInput">
                    <div className="messageSender__option">
                        <span style={{ color: "green" }} className="material-icons">
                            <i className="fas fa-images"></i>
                        </span>
                    </div>
                </label>
                <div className="messageSender__option">
                    <span style={{ color: "orange" }} className="material-icons">
                        <i className="fas fa-face-grin"></i>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Create;
