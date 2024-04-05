import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import groups from '../model/groups_model';
import themeStore from '../controller/themeController';

const GroupSection = () => {
  const { theme } = themeStore();

  return (
    <div className={`w-1/5  rounded-lg  p-6 mt-6 fixed left-5 md:block hidden ${theme === 'dark' ? 'text-white bg-slate-600 shadow-slate-900 ' : 'bg-white shadow-md'}`}>
      <h2 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <FontAwesomeIcon icon={faUsers} className="mr-2" />
        Groups
      </h2>
      {groups.map((group) => (
        <div key={group.id} className="flex items-center mb-4">
          <img
            src={group.avatarUrl}
            alt="Group avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {group.name}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>{group.description}</p>
          </div>
        </div>
      ))}
      <a
        href="#"
        className={`text-blue-500 hover:underline text-sm mt-4 block text-center ${theme === 'dark' ? 'text-white hover:text-blue-300' : ''}`}
      >
        View All Groups
      </a>
    </div>
  );
};

export default GroupSection;