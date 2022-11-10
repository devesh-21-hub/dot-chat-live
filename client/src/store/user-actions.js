import { userActions } from "./user-slice";

export const fetchUserData = () => {
  const profileUrl = "http://localhost:9000/users/me";

  return async (dispatch) => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(profileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    };

    try {
      const { user } = await getUser();
      const { name, username, email, profilePic } = user;
      console.log(user);
      dispatch(
        userActions.populateUserdata(
          { name, username, email, profilePic } || {}
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const fetchConversations = () => {
  const conversationsUrl = "http://localhost:9000/conversations";

  return async (dispatch) => {
    const getConversations = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(conversationsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    };

    try {
      const { conversations } = await getConversations();
      //console.log(conversations[0]);

      dispatch(
        userActions.populateConversationField({ conversations }) || [
          { messages: [] },
        ]
      );
    } catch (err) {
      console.log(err.message);
    }
  };
};
