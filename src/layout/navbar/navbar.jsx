import "./navbar.css";
import mainLogo from "../../assets/images/main-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white">
      <div className="container">
        <Link to="/home" className="min-[1680px]:h-[78px] min-[1370px]:h-[72px] min-[991px]:h-[50px] h-[30px]">
          <img src={mainLogo} alt="" className="h-full" />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <nav className="dropdown-menu">
            <div className="dropdown-heading">Major Projects:</div>
            <ul className="menu-list">
              <li><a href="#" onClick={closeMenu}>Cross River Rail</a></li>
              <li><a href="#" onClick={closeMenu}>M5 Motor Way</a></li>
              <li><a href="#" onClick={closeMenu}>Transmission Line</a></li>
              <li><a href="#" onClick={closeMenu}>CSW Line Wide Works</a></li>
              <li><a href="#" onClick={closeMenu}>Project 5</a></li>
              <li><a href="#" onClick={closeMenu}>Project 6</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
