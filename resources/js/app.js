
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Portal from './components/Portal';
import Register from './components/Register';


import {BrowserRouter, Route, Switch} from 'react-router-dom';

const App = (props) => {

  return (
    <div>
      <BrowserRouter>
        <div>

          <Switch>
            <Route exact path="/register" render={() => (
    <Register {...props} />
  )}/>
            <Route exact path="/portal" render={() => (
    <Portal {...props} />
  )}/>
            <Route exact path='/login' render={() => (
    <Login {...props} />
  )}/>
            <Route exact path='/chat' render = {() => (
              <Chat {...props}/>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

if (document.getElementById("login")){
  const data = document.getElementById("login")
  const props = Object.assign({}, data.dataset)
  
  ReactDOM.render(<App {...props}/>, data);
}
