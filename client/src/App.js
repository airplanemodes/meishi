import './App.css';

/* Modules */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import { SnackbarProvider } from 'notistack';


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
import { useEffect } from 'react';
import { checkUser } from './services/getinfo';



function App() {

  useEffect(() => {
    checkUser();
  },[]);
  
  return (
    <SnackbarProvider maxSnack={1} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }} TransitionComponent={Grow}>
      <Router>
        {/* For props use and rerender on url changes */}
        <Route path="/" component={Header}/>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/about" component={About}/>
            {/* All pages that need authentication are here */}
            <ProtectedRoute path="/userinfo" comp={Userinfo}/>
            {/* 404 comes last */}
            <Route path="/" component={Page404}/>  
          </Switch>
        <Footer/>
      </Router>
    </SnackbarProvider>
  );
};

export default App;