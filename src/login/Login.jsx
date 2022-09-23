import React, {useContext, useRef} from 'react';
import { useSetState } from 'react-use';
// import axios from 'axios';

import { AuthContext } from '../context/Auth.context';

import { Image, Container, Form, Button, Grid } from 'semantic-ui-react'
import '../styles.css';
import { useViewport } from '../hooks/useViewport'

const initialState = {
  email: '',
  password: '',
  id: ''
}

const LoginForm = () => {
  const { state: ContextState, login } = useContext(AuthContext);
  console.log("[LoginForm] useContext(AuthContext)", ContextState,login );

  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId,
    maxAdmin
  } = ContextState;
  const [state, setState] = useSetState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    const newAdmin = adminRef.current.value;
    console.log('[onSubmit adminRef] ',newAdmin);

    const { email, password, id } = state;
    
    // console.log("[onSubmit]",email, password, id);
    // login(email, password, id);
    login(newAdmin, newAdmin, id);
    setState({
      email: '',
      password: '',
      id: ''
    });
  }

  // React.useEffect(() => {
  //   async function fetchData () {
  //     const response = await axios.get(
  //       'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/user',);
  //    console.log((response.data).Items);
  //   //  console.log((response.data).Items[0]);
  //    return (response.data).Items;
  //     //  setMovies((response.data)['Item'])
      
      
  //   }
  //   fetchData();
  // }, []);

  // select admin ..use option
  let temp = [];
  console.log("[onSubmit] maxAdmin", maxAdmin);
  for(let i = 0; i < maxAdmin; i++) {
    let tempuser = `admin${i===0?'':i}`;
        if(tempuser !== state.username){
            temp.push(tempuser);
        }  
  }
  
  // Hook... useRef
  const adminRef = useRef(null); // <select ref={dayRef}/>

  const [windowDimensions] = useViewport()
  const { width, height } = windowDimensions

  console.log("[login]  windowDimensions", windowDimensions);
  console.log("[login]  width, height", width, height);

  return (
    <>
    <Grid verticalAlign='middle' columns={(width > 700)? 2:1} centered >
    <Grid.Column>

    <Container style={{ marginTop: 30 }} textAlign='center' >
      <h1> Welecom to Pebble Movie Recommendation</h1>
    </Container>
    <Container style={{ marginTop: 30 }} fluid>
      <Image src="/image/pngwing.com.png" centered size={(height>500)?'medium':'small' }/>
    </Container>

    </Grid.Column>

    <Grid.Column>
    
    <Container style={{ width:'80%' }} >
      <Form className='login-form' name="loginForm" onSubmit={onSubmit}>
      <Form.Field >
          <label >Selcet Admin</label>
          <select ref={adminRef}>
            {temp.map((t)=>{
                return(<option key={t}>{t}</option>)
            })}
          </select>
        </Form.Field>
        {/*
        <Form.Field >
          <label >User Name</label>
          <input 
            type="text" 
            name="email" 
            onChange={e => setState({email: e.target.value})} 
            value={state.email} 
            placeholder="admin" 
        />
        </Form.Field>
         <Form.Field className='login-form-field'>
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            onChange={e => setState({password: e.target.value})} 
            value={state.password} 
            placeholder="admin" 
          />
        </Form.Field> 
        */}
        <Button type='submit' value="Login" >Login</Button>
      </Form >
      { isLoginPending && <div>Please wait...</div> }
      { isLoggedIn && <div>Success.</div> }
      { loginError && <div>{loginError.message}</div> }
    </Container>
    </Grid.Column>
    </Grid>
    

    </>
  )
}


export default LoginForm;