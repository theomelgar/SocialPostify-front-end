import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  token: string;
  avatar: string;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    token: "",
    avatar: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload.username,
          token: action.payload.token,
          avatar: action.payload.avatar,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
