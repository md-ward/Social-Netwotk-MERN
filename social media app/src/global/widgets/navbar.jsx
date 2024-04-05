import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faHome, faUsers, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./searchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [toggleSearch, setToggleSearch] = useState(false);

    const navigate = useNavigate()
    const navIcons = [

        { icon: faHome, title: "Home", func: () => { navigate("/") } },
        { icon: faUsers, title: "frinds", func: () => { } },
        { icon: faBell, title: "Notifications", func: () => { } },
    ];


    const accountandSettings = [{ icon: faUser, func: () => { navigate("/profile") } },
    { icon: faCog, func: () => { } },]
    return (
        <nav className="flex w-full bg-custome-color h-14">
            <div className="flex w-1/3 items-center px-4 gap-10">
                <img
                    src="https://img.icons8.com/plasticine/100/sigma.png"
                    className="h-14"
                    alt="Site Icon"
                />
                {!toggleSearch && (
                    <FontAwesomeIcon
                        icon={faSearch}
                        onClick={() => setToggleSearch(true)}
                        className="h-7 cursor-pointer text-cyan-600 transition-all duration-300 ease-in-out hover:scale-110 sm:h-6"
                    />
                )}
                {toggleSearch && (
                    <SearchBar
                        toggleSearch={toggleSearch}
                        setToggleSearch={setToggleSearch}
                    />
                )}
            </div>

            <div className="flex justify-evenly    w-1/3 gap-4 items-center ">
                {navIcons.map((item, index) => (
                    <FontAwesomeIcon
                        onClick={item.func}
                        title={item.title}
                        key={index}
                        icon={item.icon}
                        className="h-6   bg-slate-700 p-2 aspect-square rounded-full  cursor-pointer text-white transition-all duration-300 ease-in-out hover:scale-110"
                    />
                ))}
            </div>
            <div className="flex justify-end  gap-11 px-4   w-1/3  items-center ">
                {accountandSettings.map((item, index) => (
                    <FontAwesomeIcon
                        onClick={item.func}
                        key={index}
                        icon={item.icon}
                        className="h-6   bg-slate-700 p-2 aspect-square rounded-full  cursor-pointer text-white transition-all duration-300 ease-in-out hover:scale-110"
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;