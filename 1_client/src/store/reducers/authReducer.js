import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const varifyToken = (keyName) => {
  const storage = localStorage.getItem(keyName);
  if (storage) {
    const decodedToken = jwtDecode(storage);
    const expiresIn = new Date(decodedToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem(keyName);
      return null;
    } else {
      return storage;
    }
  } else {
    return null;
  }
};

// ********* get cutomer token  ********
const customerToken = localStorage.getItem("userToken");

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    adminToken: varifyToken("admin-token"),
    userToken: varifyToken("userToken"),
    user: customerToken ? jwtDecode(customerToken) : null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },

    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },

    logout: (state, action) => {
      localStorage.removeItem(action.payload);

      if (action.payload === "admin-token") {
        state.adminToken = null;
      } else if (action.payload === "userToken") {
        state.userToken = null;
        state.user = null;
      }
    },
  },
});

export const { setAdminToken, setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;
