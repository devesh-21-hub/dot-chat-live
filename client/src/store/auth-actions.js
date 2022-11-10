import { authActions } from "./auth-slice";

//Implement Sign up

export const signupUser = (signupData) => {
  const signupUrl = "http://localhost:9000/signup";

  return async (dispatch) => {
    const createUser = async () => {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          username: signupData.username,
          password: signupData.password,
          email: signupData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not sign you up!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const { token, userData } = await createUser();
      console.log(userData);
      localStorage.setItem("token", token);
      dispatch(authActions.login());
    } catch (error) {
      dispatch(authActions.signupError({ message: error.message }));
    }
  };
};

export const fetchTokenFromDB = (loginData) => {
  const loginUrl = "http://localhost:9000/users/login";

  return async (dispatch) => {
    const fetchToken = async () => {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not log you in!");
      }

      const data = await response.json();
      const { token } = data;

      return token;
    };

    try {
      const token = await fetchToken();
      localStorage.setItem("token", token);
      dispatch(authActions.login());
    } catch (error) {
      dispatch(authActions.loginError());
    }
  };
};

export const removeTokenFromDB = () => {
  const logoutUrl = "http://localhost:9000/users/logout";
  return async (dispatch) => {
    //First remove the token forom db, upon confirmation, reomve from local storage.
    const removeToken = async () => {
      const token = localStorage.getItem("token");

      //console.log("Before removing token: ", token);
      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");

      //   const delToken = localStorage.getItem("token"); //null

      //   console.log("After removing token: ", delToken);

      if (!response.ok) {
        throw new Error("Could not log you out!");
      }
    };

    try {
      await removeToken();

      dispatch(authActions.logout());
    } catch (error) {
      dispatch(authActions.logoutError());
    }
  };
};

export const loginIfTokenExists = () => {
  return (dispatch) => {
    const chekIfUserIsLoggedIn = () => {
      const storedToken = localStorage.getItem("token");
      return storedToken;
    };

    try {
      const token = chekIfUserIsLoggedIn();
      if (!!token) {
        dispatch(authActions.login());
      } else {
        dispatch(authActions.logout());
      }
    } catch (error) {
      dispatch(authActions.sessionTimeOut());
    }
  };
};

//const storedToken = localStorage.getItem("token");

//localStorage.removeItem("token");

//localStorage.setItem("token", token);
