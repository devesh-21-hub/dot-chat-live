import classes from "./Signup.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth-actions";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const signupErrorMessage = useSelector(
    (state) => state.auth.signupErrorMessage
  );

  const handleSubmit = (e) => {
    setSignupError(false);
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const signupData = { name, email, username, password };

    if (confirmPassword === password) {
      dispatch(signupUser(signupData));
    } else {
      setSignupError(true);
    }

    emailRef.current.value = "";
    name.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <div className={classes.signup}>
      <h2 className={classes.title}>DotChat</h2>
      <div className={classes.cerator}>
        <a
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/devesh-kumar-089134219/"
          target="_blank"
        >
          By <u>Devesh</u>
        </a>
      </div>
      {signupError && (
        <p className={classes.signupErrorMessage}>
          Password and Confirm Password does not match
        </p>
      )}
      {signupErrorMessage !== "" && (
        <p className={classes.signupErrorMessage}>{signupErrorMessage}</p>
      )}
      <form className={classes.formcontainer} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <input
          className={classes.input}
          ref={nameRef}
          type="text"
          placeholder="Enter your full name"
          name="name"
          autoComplete="off"
          required
        />
        <label className={classes.label} htmlFor="email">
          Email
        </label>
        <input
          className={classes.input}
          ref={emailRef}
          type="email"
          placeholder="Enter Email Address"
          name="email"
          autoComplete="off"
          required
        />
        <label className={classes.label} htmlFor="uname">
          Username
        </label>
        <input
          className={classes.input}
          ref={usernameRef}
          type="text"
          placeholder="Enter Username"
          name="uname"
          autoComplete="off"
          required
        />
        <label className={classes.label} htmlFor="psw">
          Password
        </label>
        <input
          className={classes.input}
          ref={passwordRef}
          type={!passwordVisible ? "password" : "text"}
          placeholder="Enter password (min. 7 characters)"
          name="psw"
          autoComplete="off"
          required
        />
        <label className={classes.label} htmlFor="cpsw">
          Confirm Password
        </label>
        <input
          className={classes.input}
          ref={confirmPasswordRef}
          type={!passwordVisible ? "password" : "text"}
          placeholder="Confirm password"
          name="cpsw"
          autoComplete="off"
          required
        />
        <div className={classes.input}>
          <span className={classes.signupOption}>
            <input type="checkbox" onClick={showPassword} />
            <span>Show Password</span>
          </span>
        </div>
        <button className={classes.signup} type="submit">
          Sign Up
        </button>
        <span className={classes.signupLink}>
          <Link className={classes.link} to="/">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
