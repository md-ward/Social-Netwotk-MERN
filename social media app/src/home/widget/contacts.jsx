import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useProfileStore from "../../profile/store/useProfileStore";

const ContactSection = () => {
  const personalProfileDetails = useProfileStore(
    (state) => state.personalProfileDetails,
  );

  return (
    <div
      className={`    m-6 mt-2 flex h-fit flex-col  justify-center rounded-lg p-6 ring ring-black `}
    >
      <h2 className={`mb-4 text-lg font-medium`}>
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Contacts
      </h2>
      {personalProfileDetails?.friends.map((friend) => (
        <div
          key={friend._id}
          className="mb-4 flex cursor-pointer items-center rounded-lg  bg-white shadow-md"
        >
          <span className="relative flex flex-col">
            <img
              src={friend.profileImage?.originalUrl}
              alt="Contact avatar"
              className="mr-4 size-12 rounded-full "
            />
            <span
              className={`absolute bottom-0 right-4 z-40 h-4 w-4 rounded-full `}
            ></span>
          </span>
          <div>
            <h3 className={`text-base font-medium `}>
              {friend.user.first_name + " " + friend.user.last_name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactSection;
