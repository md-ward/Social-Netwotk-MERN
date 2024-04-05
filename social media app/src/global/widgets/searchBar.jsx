import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ setToggleSearch }) => {
    const searchRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            searchRef.current,
            { width: 0, opacity: 0 },
            {
                width: "auto",
                opacity: 1,
                duration: 0.3,
                ease: "power3",
            },
        );
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = searchRef.current.value;

        if (searchTerm.trim() === "") {
            return;
        }

    };


    const searchAnimation = () => {
        const searchInput = searchRef.current;

        gsap.fromTo(
            searchInput,
            { width: "auto", opacity: 1 },
            {
                width: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3",
                onComplete: () => {
                    setToggleSearch(false);
                },
            },
        );
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                searchAnimation();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            ref={containerRef}
            className="group relative z-10 flex w-full items-center justify-center gap-2 text-black "
            onSubmit={handleSearch}
        >
            <FontAwesomeIcon
                icon={faClose}
                className="cursor-pointer"
                onClick={searchAnimation}
            />
            <input
                role="form"
                ref={searchRef}
                placeholder="product name or category"
                autoComplete="off"
                type="search"
                name="search"
                className="rounded-lg h-9 bg-slate-50 px-3 text-black outline-none ring-cyan-400/90 invalid:ring-red-600 focus:ring"
            />
            <button type="submit" className="bg-cyan-600 place-content-center text-white px-2 rounded-md">Search</button>
        </form>
    );
};



SearchBar.propTypes = {
    setToggleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
