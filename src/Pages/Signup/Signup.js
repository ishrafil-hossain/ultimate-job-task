import React, { Fragment, useState } from "react";
import logo from "../../Assets//logo.png";
import istockphoto from "../../Assets//istockphoto.png";
import Global from "../../styles/Global.css";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios/AxiosInstance";
import { toast } from "react-toastify";

const Signup = () => {
    const [firstStep, setFirstStep] = useState(true);
    const [middleStep, setMiddleStep] = useState(false);
    const [lastStep, setLastStep] = useState(false);

    // get input field value;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleMiddleStepOne = () => {
        setFirstStep(!firstStep);
        setMiddleStep(!middleStep);
    };

    const handleBackStepOne = () => {
        setFirstStep(!firstStep);
        setMiddleStep(!middleStep);
    };

    const handleMiddleStepTwo = () => {
        setMiddleStep(!middleStep);
        setLastStep(!lastStep);
    };

    const handleBackStepTwo = () => {
        setMiddleStep(!middleStep);
        setLastStep(!lastStep);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            return toast.warning("password must be at least 8 character");
        }

        const userInfo = {
            first_Name: firstName,
            last_Name: lastName,
            phone_number: phone,
            email,
            password,
        };

        const res = await Axios.post(`/signup`, userInfo).catch((err) => {
            setError(err?.message);
        });
        
        if (res?.data) {
            toast.success("your registration successful", { autoClose: 500 });
            e.target.reset();
            navigate("/attendence");
        }
        if (error) {
            toast.error("something is wrong.!!", { autoClose: 500 });
        }
        
        // console.log(res.data)
    };
    return (
        <Fragment>
            <div className="container">
                <div className="logo">
                    <Link to={"/signup"}>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="signup-container">
                    <div>
                        <img src={istockphoto} alt="" />
                    </div>
                    <div className="form-container">
                        <h3>SignUp Form</h3>
                        <form onSubmit={handleSignUp}>
                            {firstStep && (
                                <Fragment>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="Write First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />{" "}
                                    <br />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        placeholder="Write Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />{" "}
                                    <br />
                                    <Link onClick={handleMiddleStepOne} className="next-btn">
                                        Next Step <FaArrowRight />
                                    </Link>
                                </Fragment>
                            )}

                            {middleStep && (
                                <Fragment>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        required
                                        placeholder="+880 1xxxxxxxx"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />{" "}
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Write Email Address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />{" "}
                                    <br />
                                    <Link onClick={handleBackStepOne} className="back-btn">
                                        back
                                    </Link>
                                    <Link onClick={handleMiddleStepTwo} className="next-btn">
                                        Next Step <FaArrowRight />
                                    </Link>
                                </Fragment>
                            )}
                            {lastStep && (
                                <Fragment>
                                    <input
                                        className="password-field"
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="Write Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <br />
                                    <p className="password-warning">
                                        Your password must be 8 character
                                    </p>
                                    <Link onClick={handleBackStepTwo} className="back-btn">
                                        back
                                    </Link>
                                    <button type="submit" className="submit-btn">
                                        {" "}
                                        Sign up{" "}
                                    </button>
                                </Fragment>
                            )}
                        </form>
                        {firstStep && (
                            <p className="signup-text">
                                Already have an account? <Link to="/login">LOGIN HERE!</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;
