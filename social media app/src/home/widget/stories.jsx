import { useState } from 'react';

const Stories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      username: 'jane_doe',
      imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      id: 2,
      username: 'john_doe',
      imageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
    {
      id: 3,
      username: 'jane_smith',
      imageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
    },
    {
      id: 4,
      username: 'john_smith',
      imageUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
    {
      id: 5,
      username: 'jane_johnson',
      imageUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-7xl mx-auto ">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Stories</h2>
      <div className="flex items-center gap-4 overflow-x-auto">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <div className="relative">
              <img src={story.imageUrl} alt={story.username} className="w-16 h-16 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-4 h-4"></div>
            </div>
            <div className="text-center mt-2 text-sm font-medium text-gray-800">{story.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;