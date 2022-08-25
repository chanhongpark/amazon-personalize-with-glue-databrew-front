import React, {useContext} from 'react';
import './App.css';

// React 라우터, UI 라이브러리

import Dashboard from './Dashoboard'

// To store login userid info, app uses Context Provide
import { AuthContext } from './context/Auth.context.jsx';

import Login from './login/Login';


function App() {  
  const { state } = useContext(AuthContext);    
  console.log("[App] state.isLoggedIn: ",state.isLoggedIn)
  console.log("[App] state.username: ",state.username)
  console.log("[App] state.userId: ",state.userId)

  document.title = 'Pebble Moive';
  if (!state.isLoggedIn){
    console.log("🤢🤢🤢🤢🤢 login failed")
    return(
      <Login />
    )
  } 
  else{
    console.log("❤🤣🤣😂❤❤❤❤❤ login success")
    return  (
      <div className='App'>
       <Dashboard />
      </div>
    ); 
  }
};

export default App;
