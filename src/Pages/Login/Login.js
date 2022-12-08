import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Global from "../../styles/Global.css";
import istockphoto from "../../Assets//istockphoto.png";
import logo from "../../Assets//logo.png";
import Axios from "../../Axios/AxiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.warning("your password must be at least 8 character", { autoClose: 500 });
    }

    if (error) {
      toast.error("something is wrong.", { autoClose: 500 });
    }
    const userInfo = {
      email,
      password,
    };

    const res = await Axios.post("/login", userInfo).catch((err) =>
      setError(err.message)
    );

    if (res?.data) {
      toast.success("login in successful", { autoClose: 500 });
      e.target.reset();
      navigate("/attendence");
      localStorage.setItem("access_Token", res.data.access_token);
    }
  };
  
  return (
    <Fragment>
      <div className="container">
        <div className="logo">
          <Link to={"/signup"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="login-container">
          <div>
            <img src={istockphoto} alt="" />
          </div>
          <div className="form-container">
            <h3>Login Form</h3>
            <form onSubmit={handleLogIn}>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Write Email Address"
              />{" "}
              <br />
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                className="password-field"
                type="password"
                placeholder="Write Password"
              />
              <br />
              <p className="password-warning">
                Your password must be 8 character
              </p>
              <button type="submit" className="submit-btn login-btn">
                {" "}
                Log In{" "}
              </button>
            </form>
            <p className="signup-text">
              Don't have an account? <Link to="/signup">SIGNUP HERE!</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
