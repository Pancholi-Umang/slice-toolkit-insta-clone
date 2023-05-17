import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { patchData } from '../redux/LoginSlice';


const EditProfile = () => {

  const navigate = useNavigate();
  const myFunction = () => {
    document.getElementById('clickImage').click();
  }
  const loginUser = useSelector((state) => state?.registration?.user)
  const { id } = loginUser;

  const [imageSrc, setImageSrc] = useState("");
  const [name, setName] = useState("")
  const [dummyImage,setDummyImage] = useState("")

  useEffect(() => {
    setName(loginUser?.name)
    setDummyImage(loginUser?.profile)
  }, [loginUser])


  const dispatch = useDispatch();
  const onImageChange = (event) => {
    let files = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  }

  const clickHandleData = (e) => {
    e.preventDefault();
    if (imageSrc == "") {
      navigate("/");
      dispatch(patchData({ name, id }))
    } else if (imageSrc != "") {
      const profile = imageSrc;
      dispatch(patchData({ name, profile, id }))
      navigate("/");
    }
  }

  console.log(name)

  return (
    <div className="profile_body">
      <div className="profile_container d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="upper">
            <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid" />
          </div>

          <div className="user text-center">
            <div className="profile">
              {
                imageSrc == "" ? (
                  <img
                    src={dummyImage}
                    className="my-2 pointer rounded-circle"
                    width="100"
                    height="100"
                    onClick={myFunction}
                  />
                ) : (
                  <img
                    src={imageSrc}
                    className="my-2 pointer rounded-circle"
                    width="100"
                    height="100"
                    onClick={myFunction}
                  />
                )
              }

            </div>
          </div>
          <input type="file" className="d-none" id="clickImage" onChange={onImageChange} />
          <div className="my-3 text-center">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <span className="text-muted d-block mb-2"></span>

            {
              name == "" ? (null) :
                <button className="btn btn-primary btn-sm follow" onClick={clickHandleData}>Submit</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile