import React from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  username: "",
  userId: ""
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});
  const setUserName = (username) => setState({username});
  const setUserId = (userId) => setState({userId});

  const login = (email, password, id) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);
    setUserName("");
    setUserId("");

    fetchLogin( email, password, id, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
        setUserName(email);
        // (email === "admin")? setUserId("1") : setUserId("4");
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setUserName("");
    setUserId("");
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
// };

// login
async function fetchLogin (email, password, id, callback) {
  const ReqAuthUrl = `https://hu63hd8u19.execute-api.ap-northeast-2.amazonaws.com/prod/user/${email}`
  const response = await axios.get(ReqAuthUrl,);
  console.log('🎄🎄🎄',(response))
  console.log('✔✔✔✔✔✔',(response.data[0].password))

  console.log('Request email',email)
  const getpwd = response.data[0].password;
      // const username = result.find( ({ name }) => name === 'admin' );
  console.log("getpwd: ", getpwd)

    if (password === getpwd) {
      setUserId(response.data[0].userId);
      console.log("👌👌👌setUserId: ", response.data[0].userId);
      return callback(null);
    }
    else {
      return callback(new Error('Invalid email and password'));
    }
}
}