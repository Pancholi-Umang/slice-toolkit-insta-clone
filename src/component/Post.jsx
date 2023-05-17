import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { PostdeleteSuccess, commentArray, deletCommentUser, deletLikeUser, likeArray } from "../redux/PostsSlice";
import './style.css';


const Post = ({ post_value }) => {
    // post_value?.id --> aa chhe ne post ni id chhe
    const loginUser = useSelector((state) => state?.registration?.user);
    const commentList = useSelector((state) => state?.Userposts?.comment);
    const likeList = useSelector((state) => state?.Userposts?.like);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LikePost = (postId) => {
        dispatch(likeArray({ user_id: loginUser?.id, User_name: loginUser?.name, Post_id: postId }));
    };

    const deletePost = (id) => {
        dispatch(PostdeleteSuccess(id));
    };

    const deleteUserComment = (id) => {
        dispatch(deletCommentUser(id));
    };

    const editUserComment = (id) => {
        // dispatch(editCommentUser(id))
        navigate(`/edit-comment/${id}`);
    };

    const commentFilter = commentList?.filter((filterComment) => {
        return filterComment?.Post_id === post_value?.id;
    });

    const toggleLikeButton = likeList?.filter((value) => {
        return loginUser?.id === value?.user_id && post_value?.id === value?.Post_id;
    });

    const LikeCounting = likeList?.filter((value) => {
        return post_value?.id === value?.Post_id;
    });


    const [userComment, setUserComment] = useState("");

    const PostComment = (post_id) => {
        if (userComment?.length !== 0) {
            dispatch(commentArray({
                user_id: loginUser?.id,
                User_name: loginUser?.name, User_profile: loginUser?.profile,
                Post_id: post_id, comment: userComment,
            }));
            setUserComment("");
        } else {
            alert("please Enter Comment Content");
        }
    };

    const deletePosts = (id) => {
        dispatch(deletLikeUser(id));
    }

    return (
        <>
            <div className="post">
                <div className="post__top">
                    <img
                        className="user__avatar post__avatar"
                        style={{ height: "40px" }}
                        src={post_value?.User_profile}
                        alt="error"
                    />
                    <div className="post__topInfo">
                        <h3>{post_value?.User_name}</h3>
                        <p>25 April at 20:30</p>
                    </div>
                </div>
                <div className="post__bottom">
                    <p>{post_value?.User_text}</p>
                </div>
                <div className="post__image">
                    <Carousel variant="dark">
                        {post_value?.Post_image?.map((i, index) => {
                            return (
                                <Carousel.Item key={index} interval={500}>
                                    {
                                        toggleLikeButton.length == 0 ? <img
                                            className="post-image d-block w-100"
                                            onDoubleClick={() => LikePost(post_value?.id)}
                                            src={i}
                                            alt="First slide"
                                            style={{ cursor: "pointer", height: "700px" }}
                                        /> : <img
                                            className="post-image d-block w-100"
                                            onDoubleClick={() => deletePosts(toggleLikeButton[0]?.id)}
                                            src={i}
                                            alt="First slide"
                                            style={{ cursor: "pointer", height: "700px" }}
                                        />
                                    }

                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </div>
                {
                    LikeCounting.length >= 2 ? <p className="px-3"><strong>Liked by {LikeCounting[LikeCounting?.length - 1]?.User_namey} and {LikeCounting.length - 1} Others</strong></p> : <p className="px-3"><strong>{LikeCounting.length} Like </strong></p>
                }

                <div className="container">
                    {/* comments */}
                    {
                        commentFilter?.length == 0 ? <p>No Comments...</p> : <p><strong>Comments:-</strong> </p>
                    }

                    <div
                        className="container overflow-scroll"
                        style={{ minHeight: "40px", maxHeight: "100px" }}
                    >
                        {commentFilter?.map((coment, index) => {
                            // console.log(coment)
                            return (
                                <span
                                    className=" d-flex justify-content-between w-100"
                                    key={index}
                                >
                                    <p>
                                        <strong>{coment?.User_name} :- </strong>
                                        {coment?.comment}
                                    </p>
                                    {loginUser?.id == coment?.user_id ? (
                                        <span>
                                            <i
                                                className="fas fa-pencil me-5"
                                                onClick={() => editUserComment(coment?.id)}
                                            ></i>
                                            <i
                                                className="far fa-trash-can mt-1"
                                                onClick={() => deleteUserComment(coment?.id)}
                                            ></i>
                                        </span>
                                    ) : null}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="post__options">
                    {/* like */}
                    <div
                        className="post__option"

                    >
                        {toggleLikeButton.length == 0 ? (
                            <span className="material-icons">
                                <i className="fas fa-heart" onClick={() => LikePost(post_value?.id)}></i>
                            </span>
                        ) : (
                            <span className="material-icons">
                                <i style={{ color: "red" }} onClick={() => deletePosts(toggleLikeButton[0]?.id)} className="fas fa-heart"></i>
                            </span>
                        )}
                    </div>
                    <div className="post__option d-flex justify-content-between">
                        <span className="material-icons">

                            <input
                                type="text"
                                onChange={(e) => setUserComment(e?.target?.value)}
                                value={userComment}
                                className="matched bg-transparent border-0"
                                placeholder="Comment yet.."
                            />
                        </span>
                        <button className="btn" onClick={() => PostComment(post_value?.id)}>
                            post
                        </button>
                    </div>
                    {loginUser?.id === post_value?.user_id ? (
                        // aama perticular post mathi je user ni id male te id and redux ma login user ni id matchy thay tyare comment edit delete valu show karavvanu
                        <div className="post__option">
                            <Link
                                to={`/edit-post/${post_value?.id}`}
                                className="material-icons"
                            >
                                <i className="fas fa-pencil me-3"></i>
                            </Link>
                        </div>
                    ) : null}
                    {loginUser?.id === post_value?.user_id ? (
                        <div
                            className="post__option"
                            onClick={() => deletePost(post_value?.id)}
                        >
                            <i className="far fa-trash-can ms-3"></i>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Post;
