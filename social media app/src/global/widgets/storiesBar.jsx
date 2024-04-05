import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProfileStore from "../../profile/store/useProfileStore";

const StoriesBar = () => {
  const { personalProfileDetails } = useProfileStore((state) => ({
    personalProfileDetails: state.personalProfileDetails,
  }));
  return (
    <div className="hide-scrollbar  flex items-center  gap-3 overflow-x-auto  overflow-y-hidden scroll-smooth  p-2 ">
      <span className="relative z-30 flex aspect-square  size-24 cursor-pointer items-center justify-center rounded-xl border border-double border-gray-400 bg-white text-gray-400 ring-gray-600 duration-200 ease-in-out hover:scale-105 hover:text-gray-600 hover:ring-1">
        <FontAwesomeIcon icon={faPlus} className="absolute z-20 text-white" />
        <img
          src={personalProfileDetails.profileImage?.originalUrl ?? " "}
          alt="user profile image"
          className="absolute  h-full w-full rounded-xl object-cover"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </span>

      <div className="flex gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="relative flex   aspect-square size-24  cursor-pointer items-center justify-center overflow-clip rounded-xl border border-double border-gray-400 bg-white text-gray-400 ring-2 ring-blue-500 ring-offset-1 duration-200 ease-in-out hover:scale-105 hover:text-gray-600 "
          >
            {/* todo: stories inmage */}
            <img src="" className="h-full w-full object-cover" />
            <p className="absolute text-white">kiven</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;
