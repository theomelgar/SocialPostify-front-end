import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const loadState = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("reduxState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  return undefined;
};


// Save state to local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const store = configureStore({
  reducer: {
    authReducer,
  },
  preloadedState: loadState(), // Load state from local storage
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
