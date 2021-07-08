import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

function Header(props) {
  
  let [showMobileNav,setShowMobileNav] = useState(false);

  // makes dropdown menu dissapear on mobiles
  const hideNavMobile = () => { 
    setShowMobileNav(false);
  };

    return (
      <header className="container-fluid ubuntu p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 d-flex justify-content-between align-items-center">
              <h1 className="mt-2"><span className="me-4">名刺</span>Meishi</h1>
              <div className="burger" onClick={() => { setShowMobileNav(!showMobileNav); }}>
                <span className="iconify" data-icon="heroicons-solid:menu" data-inline="false"></span>
              </div>
            </div>
            {/* React style attribute with condition */}
            <nav onClick={hideNavMobile} className="col-lg-9 text-end" style={{ display: showMobileNav && "block" }}>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign-Up</Link>
            </nav>
          </div>
        </div>
      </header>
    );
};

export default Header;