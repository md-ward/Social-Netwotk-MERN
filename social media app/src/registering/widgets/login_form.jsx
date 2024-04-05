import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../global/widgets/loader";
import useRegisteringStore from "../store/useRegisteringStore";
import gsap from "gsap";

const LoginForm = () => {
  const loginRef = useRef();

  useEffect(() => {

    gsap.fromTo(loginRef.current, { opacity: 0, translateX: 100 }, { opacity: 1, translateX: 0, duration: 0.4 })

  }, []);

  const { error, handleLoginSubmit, isLoading, toggleLogInForm, } = useRegisteringStore((state) => ({
    isLoading: state.isLoading,
    toggleLogInForm: state.toggleLogInForm,


    error: state.error,
    handleLoginSubmit: state.handleLoginSubmit,
  }));
  function handleLogin(submitEvent) {

    submitEvent.preventDefault();
    const form = submitEvent.target;

    const formData = new FormData(form);

    handleLoginSubmit(formData)


  }

  const [showPassword, setshowPassword] = useState(false);

  const touggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <>
      <div className="bg-white md:w-1/3 flex flex-col h-full justify-center items-center !overflow-hidden">
        <div ref={loginRef} className="w-2/3  ">
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
            Log in
          </h1>
          {/* Registration form */}

          <form className="space-y-6" onSubmit={handleLogin} ref={loginRef}>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                required
                type="text"
                id="email"
                name="email"
                autoComplete="username"
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-700"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>

              <input
                required
                type={showPassword ? "text" : `password`}
                id="password"
                name="password"
                autoComplete="new-password"
                className="relative border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-700"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute top-1/2 -right-7 cursor-pointer text-indigo-800"
                onClick={touggleShowPassword}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember_me"
                className="mr-2"
              />
              <label htmlFor="remember_me" className="text-gray-700">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white rounded py-2 px-4 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
              >
                Log in
              </button>
            </div>
          </form>

          {error && <div className="mb-4 text-center text-red-500">{error}</div>}
          {isLoading && <Loader />}

          <p className="text-gray-600 mt-6 text-center">
            {" Don't  have an account? "}
            <button
              className="text-indigo-700 hover:text-indigo-800"
              onClick={toggleLogInForm}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
