import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import themeStore from '../controller/themeController';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

const SettingsCart = ({ setshowSettigns, isLightMode }) => {
    const { theme, toggleTheme } = themeStore();
    const navigate = useNavigate();

    function handleNav(to) {
        navigate(to, { replace: true });
        setshowSettigns(false);
    }

    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setshowSettigns(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, setshowSettigns]);

    return (
        <div
            className={`w-96 p-4 rounded-lg shadow-md ${isLightMode ? 'bg-white' : 'bg-slate-600'
                }`}
            ref={ref}
        >
            <h2 className={`text-lg ${isLightMode ? 'text-dark-blue' : 'text-white'} font-medium mb-4`}>Settings</h2>
            <div className="flex flex-col gap-3">
                <span
                    onClick={() => handleNav('/profile')}
                    className="w-full bg-custome-color p-2 rounded-lg hover:opacity-95 cursor-pointer hover:shadow-inner shadow-sm"
                >
                    <h1 className="text-center text-lg text-dark-blue">view profile</h1>
                </span>

                <span className="w-full flex justify-between items-center bg-custome-color p-2 rounded-lg hover:opacity-95 cursor-pointer hover:shadow-inner shadow-sm">
                    <h1
                        className=' text-lg text-dark-blue'
                    >Mode</h1>
                    <button
                        className={`aspect-square w-8 flex items-center justify-center text-white font-serif font-semibold border-b-4 text-xl border-transparent rounded-full ${isLightMode
                            ? theme === 'dark'
                                ? 'bg-gray-600'
                                : 'bg-dark-blue opacity-90 shadow-md'
                            : theme === 'dark'
                                ? 'bg-white text-gray-900'
                                : 'bg-gray-900 text-white'
                            } transition duration-300 ease-in-out`}
                        onClick={toggleTheme}
                    >
                        <FontAwesomeIcon
                            icon={theme === 'dark' ? faSun : faMoon}
                            className="text-yellow-400 duration-500 ease-in-out"
                            style={{
                                transform: `${theme === 'light' ? 'rotate(0)' : 'rotate(180deg)'}`,
                            }}
                        />
                    </button>
                </span>

                <span
                    onClick={() => handleNav('/register')}
                    className="w-full bg-custome-color p-2 rounded-lg hover:opacity-95 cursor-pointer hover:shadow-inner shadow-sm"
                >
                    <h1 className="text-center text-lg text-dark-blue">Logout</h1>
                </span>
            </div>
        </div>
    );
};

export default SettingsCart;