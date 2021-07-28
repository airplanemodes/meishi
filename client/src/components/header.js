import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { returnUserData, updateUserData } from '../services/userdata';



function Header(props) {
  
  let [showMobileNav,setShowMobileNav] = useState(false);
  let [user,setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setUser(returnUserData());
  },[props.location]);


  // makes dropdown menu dissapear on mobiles
  const hideNavMobile = () => { 
    setShowMobileNav(false);
  };


  const logOut = async() => {
    enqueueSnackbar('You logged out from the system', {variant: 'info'});
    localStorage.removeItem('localToken');
    await updateUserData();
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
              {/* if statement for navigation bar links */}
              { !localStorage['localToken'] ?
              <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign-Up</Link>
              </React.Fragment>
              :
              <React.Fragment>
              <Link to="/profile">Profile</Link>
              <Link to="/favorites">Favorites</Link>
              { user?.business && <Link to="/business">Business</Link> }
              <Link onClick={logOut} to="/login">Logout</Link>
              </React.Fragment>
              }
              {/* end of if statement */}
            </nav>
          </div>
        </div>
      </header>
    );
};


export default Header;