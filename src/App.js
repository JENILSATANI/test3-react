import './App.css';
import './Userlist.css'
import './List.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Reg from './Reg'
import Fp from './Fp'
import Profile from './Profile';
import Mlist from './Mlist'
import Am from './Am'
import Userlist from './Userlist';
import Editmedision from './Editmedision';
import Logout from './Logout';
import Log from './Log';
import Otp from './Otp';
import Notp from './Notp'
// import Cart from './Cart'
import Dd from './Dd';
const currentUserSubject = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/"
          }}
          noThrow
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject === null ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/Food"
          }}
          noThrow
        />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      {/* <Cart/> */}
      <Router>
        <Switch>

          <PublicRoute exact path='/' component={Log} />
          <PublicRoute path='/reg' component={Reg} />
          <PublicRoute path='/Fp' component={Fp} />
          <PublicRoute path='/Otp' component={Otp} />
          <PrivateRoute path='/Profile' component={Profile} />
          <PrivateRoute path='/Food' component={Mlist} />
          <PrivateRoute path='/addmedicine' component={Am} />
          <PrivateRoute path='/Userlist' component={Userlist} />
          <PrivateRoute path='/Foodedit' component={Editmedision} />
          <PrivateRoute path='/Logout' component={Logout} />
          <PublicRoute path='/Notp' component={Notp} />
          <PrivateRoute path='/Dd' component={Dd} />




        </Switch>

      </Router>

    </div>
  );
}

export default App;
