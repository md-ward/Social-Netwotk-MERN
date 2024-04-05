import { create } from "zustand";
import {
  loginController,
  signupController,
} from "../controller/registeringController";
import { getCookie, setCookie } from "../../useCookie";

const useRegisteringStore = create((set) => ({
  isLoading: false,
  isLogedIn: getCookie("jwt_user") || false,

  isLogInForm: true,
  loginData: null,
  signupData: null,
  error: null,

  toggleLogInForm: () => {
    set((state) => ({
      isLogInForm: !state.isLogInForm,
      signupData: null,
      loginData: null,
      error: null,
    }));
  },

  handleLoginSubmit: async (data) => {
    set({ isLoading: true });
    if (data.username === "" || data.password === "") {
      set(() => ({ error: "Please fill in all fields" }));
      return;
    }

    loginController(data)
      .then((jwt_user) => {
        setCookie("jwt_user", jwt_user);
        set(() => ({
          isLoading: false,
          loginData: data,
          error: null,
          isDialogOpen: false,

          isLogedIn: true,
        }));
      })
      .catch((error) => {
        // Handle the login error
        console.error("Login failed:", error);
        set(() => ({ error: error, isLoading: false }));
      });
  },
  handleSignupSubmit: (data) => {
    set({ isLoading: true });

    if (data.name === "" || data.password === "" || data.email === "") {
      set(() => ({ error: "Please fill in all fields" }));
      return;
    }
    signupController(data)
      .then((jwt_user) => {
        setCookie("jwt_user", jwt_user);
        set(() => ({
          isLoading: false,
          signupData: data,
          error: null,
          isDialogOpen: false,

          isLogedIn: true,
        }));
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        set(() => ({ error, isLoading: false }));
      });
  },
}));

export default useRegisteringStore;
