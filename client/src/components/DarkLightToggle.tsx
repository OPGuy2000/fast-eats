import React from 'react';
import lightIcon from "../assets/sun-fill.svg";
import darkIcon from "../assets/moon-stars-fill.svg";

const DarkLightToggle: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <button className="btn" type="button" onClick={handleClick} aria-label="Toggle Dark/Light Mode">
      <img src={lightIcon} alt="Night Mode" width="24" height="24" className="me-2"></img>
    </button>
  );
};

export default DarkLightToggle;
