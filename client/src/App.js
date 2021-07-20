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
import Userinfo from './components/userinfo';
import ProtectedRoute from './components/common/protected-route';
import Favorites from './components/favorites';



function App() {

  /* It's important to be updated with the latest version
  of user data that stored at 'user' object and for this purpose
  these hooks works already in the main 'App.js' component */
  
  // creates state
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
        {/* For props use and rerender on url changes */}
        <Route path="/" component={Header}/>
        { user &&
          <main style={{ minHeight: "78vh" }}>
            <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/about" component={About}/>
            {/* All pages that need authentication are here */}
            <ProtectedRoute path="/userinfo" comp={Userinfo}/>
            <ProtectedRoute path="/favorites" comp={Favorites}/>
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