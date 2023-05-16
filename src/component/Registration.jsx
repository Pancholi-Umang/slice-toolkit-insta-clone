import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, postUsers } from '../redux/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  name: "",
  email: "",
  password: "",
};


const Registration = () => {

  const [imageSrc, setImageSrc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      // console.log(values,"dddd",imageSrc)
      dispatch(postUsers({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        profile: imageSrc
      }))
      formik?.resetForm();
      setImageSrc("");
      navigate("/")
    },
  });


  const onImageChange = (event) => {

    let files = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  }

  return (
    <>
      <section className="vh-100" style={{ minHeight: "100vh", backgroundColor: '#2779e2' }}>
        <form className="container h-100" onSubmit={formik?.handleSubmit}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h5 className="text-white text-center mb-2">Registration</h5>
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body">
                  <div className="row align-items-center pt-2 pb-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="text" placeholder='Enter Name...' className="form-control form-control-lg" onBlur={formik?.handleBlur}
                        onChange={formik?.handleChange}
                        value={formik?.values?.name}
                        name="name" />
                      {formik?.errors?.name && formik?.touched?.name ? (
                        <p className="form-error" style={{ color: "red" }}> {formik?.errors?.name} </p>
                      ) : null}
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="email" className="form-control form-control-lg" placeholder="example@example.com" value={formik?.values?.email}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        name="email" />
                      {formik?.errors?.email && formik?.touched?.email ? (
                        <p className="form-error" style={{ color: "red" }}> {formik?.errors?.email} </p>
                      ) : null}
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type='password' autoComplete='off' className="form-control" placeholder="Enter Password..." value={formik?.values?.password}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        name="password" />
                      {formik?.errors?.password && formik?.touched?.password ? (
                        <p className="form-error" style={{ color: "red" }}> {formik?.errors?.password} </p>
                      ) : null}
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Upload Profile</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={onImageChange} name="image" required />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="px-5 py-4 d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    <Link to="/login" className="btn btn-primary btn-lg">Go To Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

    </>
  );
}

export default Registration