import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    username: "",
    email: "",
    profilePic: [],
    conversations: [],
  },
  reducers: {
    populateUserdata(state, action) {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
    populateConversationField(state, action) {
      state.conversations = action.payload.conversations;
    },
    addNewConversation(state, action) {
      const newConversation = action.payload;
      const existingConversation = state.conversations.find(
        (item) => item._id === newConversation._id
      );
      if (!existingConversation) {
        state.conversations.push(newConversation);
      }
    },
    removeConversation(state, action) {
      const id = action.payload;
      state.conversations = state.conversations.filter(
        (conversation) => conversation._id !== id
      );
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
