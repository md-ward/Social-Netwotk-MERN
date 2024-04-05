import { useNavigate } from "react-router-dom";
import useRegisteringStore from "../store/useRegisteringStore";
import LoginForm from "../widgets/login_form";
import SignupForm from "../widgets/signup_form";
import { useState, useEffect } from "react";

const RegistrationPage = () => {
  const isLogedIn = useRegisteringStore(state => state.isLogedIn)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLogedIn) {
      navigate("/", { replace: true })

    }
  }, [isLogedIn, navigate]);

  const [imageIndex, setImageIndex] = useState(0);
  const { isLogInForm } = useRegisteringStore((state) => ({ isLogInForm: state.isLogInForm }))
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const images = [
    "assets/images/group_1.svg",
    "assets/images/group_2.svg",
    "assets/images/group_3.svg",
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* left side  */}
      <div className="w-full md:w-2/3 sm:h-full relative overflow-hidden flex  flex-col  sm:flex-row sm:justify-center">
        <div className="flex items-center justify-start sm:absolute top-0 left-0 z-10 py-4 px-6">
          <img
            src="https://img.icons8.com/plasticine/50/sigma.png"
            alt="logo"
            className="w-8 h-8 object-contain mr-2"
          />
          <h1 className="text-sm font-bold text-dark-blue">SIGMA</h1>
        </div>

        <img
          src="assets/backGround.svg"
          alt=""
          className="absolute -z-10 w-full object-cover h-full"
        />

        <img
          src={images[imageIndex]}
          alt="image"
          className={`duration-150 ease-in-out ${imageIndex % 2 == 0 ? " scale-110" : "scale-100"
            }  md:w-1/2 md:h-auto lg:w-3/4 ${imageIndex === 0 ? "lg:h-3/4" : "auto"
            } max-sm:hidden`}
        />

        {/* Text  */}
        {!isLogInForm ? <div className="md:absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-center max-sm:h-48">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue mb-2">
            Join our community
          </h1>
          <p className="text-base sm:text-lg text-dark-blue opacity-90 leading-relaxed">
            Connect with friends and family, and meet new people who share
            your interests.
          </p>
        </div> :
          <div className="md:absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-center max-sm:h-48">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-blue mb-2">
              Wellcome back to SIGMA
            </h1>

          </div>}
      </div>


      {isLogInForm ? (
        <LoginForm />
      ) :
        <SignupForm />
      }
    </div>
  );
};

export default RegistrationPage;
