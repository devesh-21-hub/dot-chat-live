import classes from "./Login.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchTokenFromDB } from "../../store/auth-actions";

const Login = () => {
  //const [loginError, setLoginError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const loginData = { username, password };
    dispatch(fetchTokenFromDB(loginData));

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  const isLoginError = useSelector((state) => state.auth.loginErrorMessage);

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={classes.login}>
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
      {isLoginError && <p className={classes.loginErrorMessage}></p>}
      <form className={classes.formcontainer} onSubmit={handleLoginFormSubmit}>
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
          placeholder="Enter password"
          name="psw"
          autoComplete="off"
          required
        />

        <div className={classes.input}>
          <span className={classes.loginOption}>
            <input type="checkbox" onClick={showPassword} />
            <span>Show Password</span>
          </span>
          <span className={classes.loginOption}>
            <Link to="forgot-password">Forgot Password</Link>
          </span>
        </div>

        <button className={classes.loginButton} type="submit">
          Login
        </button>
        <span className={classes.signupLink}>
          <Link className={classes.link} to="/signup">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
