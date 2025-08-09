import { useEffect, useState } from "react";
import "./App.css";
import reactIcon from "./assets/react.svg";

import lightIcon from "./assets/sun-fill.svg";
import darkIcon from "./assets/moon-stars-fill.svg";

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <img src={reactIcon} alt="Bootstrap" width="30" height="24"></img>
            FastEats
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <button
            className="btn"
            type="button"
            onClick={handleClick}
            aria-label="Toggle Dark/Light Mode"
          >
            <img
              src={theme === 'light' ? lightIcon : darkIcon}
              alt={theme === 'light' ? 'Switch to Night Mode' : 'Switch to Light Mode'}
              width="24"
              height="24"
              className="me-2"
            />
          </button>
        </div>
      </nav>
    </>
  );
};

export default App;
