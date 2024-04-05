import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import useMessageStore from '../controller/messagesController';
import messagesData from '../model/messages_model';
import contacts from '../model/contacts_model';
import handleStatusColor from '../controller/status_color_controller';
import useThemeStore from '../controller/themeController';

const MessageSection = () => {
  const { isOpen, close, contentId } = useMessageStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  const {theme}=useThemeStore()
  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newId = messages.length + 1;

    const newMessageObj = {
      id: newId,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  useEffect(() => {
    setMessages(messagesData[contentId].messages);
  }, [contentId]);


  return (
    <>
      {isOpen ? (
        <div className={`slide-up ${theme === 'light' ? 'bg-white' : 'bg-slate-400'}  rounded-lg shadow-md p-6 mb-6 flex flex-col fixed h-2/3 w-1/4 bottom-0 right-5`}>
          <span className="flex flex-row items-start justify-between  border-b-2 mb-1 border-gray-200 ">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Messages</h2>

            <span className='bg-slate-300 w-6 aspect-square text-center rounded-full  flex justify-center items-center text-white hover:bg-slate-400 cursor-pointer'>
              <button onClick={close} className='-translate-y-0.5'>x</button>

            </span>
          </span>
          <div className="flex flex-col overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className='flex gap-1'>

                    {message.sender !== 'You' &&

                      <span className='relative'>

                        <img src={contacts[contentId].avatarUrl} alt="" className='w-7 h-7 rounded-full' />

                        <span className={`w-2  h-2 rounded-full z-40  absolute  shadow-md  bottom-0 right-0   ${handleStatusColor(contacts[contentId].status)} `}></span>


                      </span>

                    }



                    <div className="font-medium text-gray-800">{message.sender}</div></span>
                  <div className="text-xs text-gray-500">{message.timestamp}</div>
                </div>
                <div className={`bg-gray-100 rounded-md p-2 ${message.sender === 'You' ? "ml-auto bg-blue-500 text-black " : ""}`}>{message.message}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Type your message here"
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="ml-4 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none"
              onClick={handleSendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default MessageSection;