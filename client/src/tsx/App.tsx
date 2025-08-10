import { useEffect, useState } from "react";
import "../css/App.css";
import reactIcon from "../assets/react.svg";

import lightIcon from "../assets/sun-fill.svg";
import darkIcon from "../assets/moon-stars-fill.svg";
import computerIcon from "../assets/pc-display.svg";

type ThemeMode = "light" | "dark" | "system";

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  const handleClick = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  useEffect(() => {
    // Match current system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark =
        "matches" in e ? e.matches : (e as MediaQueryList).matches;
      setSystemPrefersDark(isDark);
      if (theme === "system") {
        document.documentElement.setAttribute(
          "data-bs-theme",
          isDark ? "dark" : "light"
        );
      }
    };

    // Initial detection
    updateSystemTheme(mediaQuery);

    // Listen for system theme changes
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  }, [theme]);

  const getIcon = () => {
    if (theme === "light") return lightIcon;
    if (theme === "dark") return darkIcon;
    // System mode → show computer icon + sun/moon overlay
    return systemPrefersDark ? darkIcon : lightIcon;
  };

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
            id="navbar-toggler"
          >
            <img src={reactIcon} alt="Bootstrap" width="30" height="24" />
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
            className="btn position-relative"
            type="button"
            onClick={handleClick}
            aria-label="Toggle Dark/Light/System Mode"
          >
            {/* Computer icon when in system mode */}
            {theme === "system" && (
              <img
                src={computerIcon}
                alt="System Theme"
                width="24"
                height="24"
                className="me-1"
              />
            )}

            {/* Main icon */}
            <img
              src={getIcon()}
              alt={
                theme === "light"
                  ? "Switch to Dark Mode"
                  : theme === "dark"
                  ? "Switch to System Mode"
                  : "Switch to Light Mode"
              }
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
