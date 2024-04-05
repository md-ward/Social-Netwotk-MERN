import React, { useRef, useEffect } from 'react';
import useSearchStore from '../controller/searching_controller';

const SearchingBox = () => {
  const { closeSearch } = useSearchStore()



  const boxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      closeSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });





  return (

    <div className="fixed z-50 left-80 top-16" ref={boxRef}>
      <div className="w-64  h-80 bg-white bg-opacity-90 rounded-md shadow-md"></div>
    </div>
  );
};

export default SearchingBox;