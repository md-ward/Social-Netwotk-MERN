import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef, useState } from "react";
import Loader from "../../global/widgets/loader";
import useRegisteringStore from "../store/useRegisteringStore";
import gsap from "gsap";

const SignupForm = () => {
  const signupRef = useRef();

  const { error, handleSignupSubmit, isLoading, toggleLogInForm } = useRegisteringStore(
    (state) => ({
      isLoading: state.isLoading,
      toggleLogInForm: state.toggleLogInForm,
      error: state.error,
      handleSignupSubmit: state.handleSignupSubmit,
    })
  );
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    gsap.fromTo(
      signupRef.current,
      { opacity: 0, translateX: -100 },
      { opacity: 1, translateX: 0, duration: 0.4 }
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the form data
    const form = event.target;
    const formData = new FormData(form);

    handleSignupSubmit(formData);
  };

  return (
    <>
      <div className="bg-white md:w-1/3 flex flex-col h-full justify-center items-center">
        <div ref={signupRef} className="w-2/3  ">
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
            Create an account
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="first_name"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                pattern="[a-zA-Z]+"
                required
                type="text"
                name="first_name"
                className="border invalid:caret-red-600  invalid:focus:border-rose-600 border-gray-300 rounded w-full py-2 px-3  outline-none focus:outline   focus:border-indigo-700"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                pattern="[a-zA-Z]+"
                required
                type="text"
                name="last_name"
                className="border invalid:caret-red-600  invalid:focus:border-rose-600 border-gray-300 rounded w-full py-2 px-3  outline-none focus:outline   focus:border-indigo-700"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                required
                id="gender"
                name="gender"
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-700"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                required
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-700"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                autoComplete="email"
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
              <span className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  className="relative border  border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-indigo-700"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute top-1/3 -right-7 cursor-pointer text-indigo-800"
                  onClick={toggleShowPassword}
                />
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white rounded py-2 px-4 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
              >
                Sign up
              </button>
            </div>
          </form>
          {error && <div className="mb-4 text-center text-red-500">{error}</div>}
          {isLoading && <Loader />}
          <p className="text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <button
              onClick={toggleLogInForm}
              className="text-indigo-700 hover:text-indigo-800"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;