import React,{useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login.js";
import {useStateValue} from "./StateProvider"

function App() 
{
  const[{user},dispatch]=useStateValue();


  return (
    //BEM Naming convention
    <div className="app">
      {!user ? (
        <Login/>
      ):(
        <div className="app__body">
          {/* Sidebar */}
          <Router>
            <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route path="/">
                <Chat />
              </Route>
            </Switch>


          </Router>
        </div>
      )}
    </div>

  );
}

export default App;
