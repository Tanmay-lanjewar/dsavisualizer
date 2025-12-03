
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">DSA Visualizer</h1>
        <nav>
          <ul className="nav-links">
            {/* Sorting with Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="dropbtn">Sorting ▾</span>
              {dropdownOpen && (
                <ul className="dropdown-content">
                  <li><Link to="/bubble-sort">Bubble Sort</Link></li>
                  <li><Link to="/merge-sort">Merge Sort</Link></li>
                  <li><Link to="/quick-sort">Quick Sort</Link></li>
                  <li><Link to="/insertion-sort">Insertion Sort</Link></li>
                  <li><Link to="/selection-sort">Selection Sort</Link></li>
                </ul>
              )}
            </li>

            <li
              className="dropdown"
              onMouseEnter={() => setSearchDropdownOpen(true)}
              onMouseLeave={() => setSearchDropdownOpen(false)}
            >
              <span className="dropbtn">Searching ▾</span>
              {searchDropdownOpen && (
                <ul className="dropdown-content">
                  <li><Link to="/linear-search">Linear Search</Link></li>
                  <li><Link to="/binary-search">Binary Search</Link></li>
                </ul>
              )}
            </li>
            <li><a href="#">Stack</a></li>
            <li><a href="#">Queue</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>
          Learn DSA the <span>Fun</span> Way
        </h2>
        <p>Interactive, colorful, and Gen-Z approved </p>       
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ for Gen-Z Coders</p>
      </footer>
    </div>
  );
}

export default HomePage;

