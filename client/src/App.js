import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';
import About from './components/about';
import Page404 from './components/404';
import Footer from './components/footer';
import Signup from './components/signup';
import Login from './components/login';


function App() {
  return (
    <Router>
      <Header/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/about" component={About}/>
          <Route path="/" component={Page404}/>  
        </Switch>
      <Footer/>
    </Router>
  );
};

export default App;