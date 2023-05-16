import React, { useEffect } from 'react'
import { useFormik } from "formik";
import { signupSchema } from "../schemas/LoginSpecial";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from '../redux/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  email: "",
  password: "",
};


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(getUsers(values))
      formik?.resetForm();
      navigate('/')
    },
  });

  const UserLogin = useSelector(state => state?.registration?.user);

  useEffect(() => {
    if (UserLogin?.id) {
      navigate("/")
    } 
  }, [UserLogin])

  return (
    <>
      <form className="vh-100" style={{ minHeight: "100vh", backgroundColor: '#2779e2' }} onSubmit={formik?.handleSubmit}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h3 className="text-white text-center mb-2">Login</h3>
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body">
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input type="email" value={formik?.values?.email}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur} name="email" className="form-control form-control-lg" placeholder="example@example.com" />
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
                      <input type='password' className="form-control" value={formik?.values?.password}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur} autoComplete='off' name="password" placeholder="Enter Password..." />
                      {formik?.errors?.password && formik?.touched?.password ? (
                        <p className="form-error" style={{ color: "red" }}> {formik?.errors?.password} </p>
                      ) : null}
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="px-5 py-4 d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                    <Link to="/registration" className="btn btn-primary btn-lg">Go To Registration</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>
  );
}

export default Login