/* React client-side code */

import './App.css';

/* Modules, Hooks and Functions */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import { SnackbarProvider } from 'notistack';
import { updateUserData } from './services/userdata';


/* Components */
import Header from './components/header';
import Main from './components/main';
import About from './components/about';
import Page404 from './components/404';
import Footer from './components/footer';
import Signup from './components/signup';
import Login from './components/login';
import ProtectedRoute from './components/common/protected-route';
import Favorites from './components/favorites';
import Profile from './components/profile';
import Business from './components/business/business';
import AddCard from './components/business/addcard';



function App() {

  /* It's important to be updated with the latest version
  of user data that stored at 'user' object and for this purpose
  these hooks works already in the main 'App.js' component */
  
  // creates state with null (not exists)
  let [user,setUser] = useState(null);

  useEffect(() => {
    // invokes the set function
    ifUserLogged();
  },[]);


  const ifUserLogged = async() => {
    // calls for the service function and updates the state with response data
    let userdata = await updateUserData();
    setUser(userdata);
  };

  
  return (
    <SnackbarProvider maxSnack={1} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }} TransitionComponent={Grow}>
      <Router>

        {/* Header gets 'Route' for re-render on url changes, 
            it's also waiting for the 'user' state
            for showing additional links if the user is business */}
        { user && <Route path="/" component={Header}/> }


        {/* This main section shows only when user state gets updated */}
        { user &&
          <main style={{ minHeight: "78vh" }}>
            <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/about" component={About}/>
            {/* All pages that need authentication are here */}
            <ProtectedRoute path="/profile" comp={Profile}/>
            <ProtectedRoute path="/favorites" comp={Favorites}/>
            <ProtectedRoute businessRoute={true} path="/business" comp={Business}/>
            <ProtectedRoute businessRoute={true} path="/addcard" comp={AddCard}/>
            {/* 404 comes last */}
            <Route path="/" component={Page404}/>
            </Switch>
          </main>
        }


        <Footer/>
      </Router>
    </SnackbarProvider>
  );
};

export default App;