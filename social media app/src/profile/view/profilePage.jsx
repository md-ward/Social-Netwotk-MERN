import { useEffect } from "react";
import useProfileStore from "../store/useProfileStore";
import { Post } from "../../home/widget/posts";
import { formatBirthDay } from "../../global/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const {
    handleFetchPersonalProfileDetails,
    personalProfileDetails,
    personalProfilePosts,
    handleFetchingPersonalProfilePosts,
  } = useProfileStore((state) => ({
    personalProfileDetails: state.personalProfileDetails,
    personalProfilePosts: state.personalProfilePosts,
    handleFetchPersonalProfileDetails: state.handleFetchPersonalProfileDetails,
    handleFetchingPersonalProfilePosts:
      state.handleFetchingPersonalProfilePosts,
  }));

  // ! check to personalProfileDetails to reduced fetching profile details

  useEffect(() => {
    handleFetchPersonalProfileDetails();
    handleFetchingPersonalProfilePosts();
  }, [handleFetchPersonalProfileDetails, handleFetchingPersonalProfilePosts]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800">
        <img
          src={personalProfileDetails.coverImage.originalUrl}
          alt="profile cover image"
          className="h-56 w-full object-cover"
        />
      </div>
      <div className="mx-auto flex w-full px-4 py-8">
        <div className="sticky top-0 h-fit rounded-lg bg-white p-6 shadow-md">
          {/* personal details */}
          <div className="flex items-center space-x-4 ">
            <div className="group relative aspect-square h-24 w-24 rounded-full ">
              <img
                src={personalProfileDetails.profileImage.originalUrl}
                alt="user profile image"
                className="h-full w-full rounded-full object-cover"
              />
              <span
                title="edit"
                className="absolute inset-0 hidden h-full w-full cursor-pointer rounded-full bg-slate-400/50 transition-all duration-300 ease-in-out group-hover:block "
              ></span>

              <span className="absolute bottom-4 right-0 opacity-0 transition-all  duration-300 ease-in-out group-hover:opacity-100">
                <FontAwesomeIcon icon={faPen} />
              </span>
            </div>
            <div>
              <div className="ml-3">
                <h1 className="text-3xl font-bold">
                  {personalProfileDetails.user.first_name +
                    " " +
                    personalProfileDetails.user.last_name}
                </h1>
                <p className="text-gray-500">
                  @{personalProfileDetails.user_name}
                </p>
              </div>
              <p className="mt-2 text-gray-600">
                <span className="font-bold">Account status:</span>{" "}
                {personalProfileDetails.user.accountStatus}
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-bold">Email:</span>{" "}
                {personalProfileDetails.user.email}
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-bold">Bio:</span> Software Developer
              </p>
              <p className="mt-2 text-gray-600">
                <span className="font-bold">Birthday:</span>{" "}
                {formatBirthDay(personalProfileDetails.user.dateOfBirth)}
              </p>
            </div>
          </div>{" "}
          {/* Friends section */}
          <div className="mt-8 ">
            <h3 className="mb-4 text-2xl font-bold">Friends</h3>
            <ul className="flex flex-wrap space-x-4">
              {personalProfileDetails.friends.map((friend) => (
                <li key={friend._id}>
                  <span
                    className="flex items-center hover:cursor-pointer"
                    title={friend.user.first_name + " " + friend.user.last_name}
                  >
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={friend.profileImage?.originalUrl}
                      alt={friend.user.first_name}
                    />
                    <h1 className="ml-2 text-lg font-bold">
                      {friend.user.first_name + " " + friend.user.last_name}
                    </h1>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
        {/* Personal Posts... */}
        <div className="mt-8 flex w-full flex-col items-center justify-center">
          <h3 className="mb-4 text-2xl font-bold">Posts</h3>
          {personalProfilePosts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
