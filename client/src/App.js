import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import AddContact from "./pages/addcontact/AddContact";
import Contacts from "./pages/contacts/Contacts";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginIfTokenExists } from "./store/auth-actions";
import { fetchUserData, fetchConversations } from "./store/user-actions";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import NotFound from "./pages/notfound/NotFound";
//import NoContacts from "./pages/nocontacts/NoContacts";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginIfTokenExists());
    dispatch(fetchUserData());
    dispatch(fetchConversations());
  }, [dispatch]);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const conversations = useSelector((state) => state.user.conversations);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isAuth ? conversations !== undefined && <Chat /> : <Login />}
        />
        <Route path="/signup" element={isAuth ? <Chat /> : <Signup />} />
        <Route
          path="/forgot-password"
          element={!isAuth && <ForgotPassword />}
        />

        <Route
          path="/add-contact"
          element={isAuth ? <AddContact /> : <Login />}
        />
        <Route path="/profile" element={isAuth ? <Profile /> : <Login />} />
        <Route path="/contacts" element={isAuth ? <Contacts /> : <Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

/*
<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

*/
