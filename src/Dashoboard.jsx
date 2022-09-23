import React, { useContext, useEffect, useRef } from 'react'

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { Menu, Container, Icon, Button } from 'semantic-ui-react'
import MoviesList from './component/MoviesList'
import MovieDetails from './component/MovieDetails'
import { AuthContext } from './context/Auth.context';
import MoviesCarousel from './component/MoviesCarousel'
// import MoviePopFirst from './component/MoviePopFirst';
// import MoviePerFirst from './component/MoviePerFirst';
import ScrollToTop from "./ScrollToTop";
import { useViewport } from './hooks/useViewport'

function Dashboard() {
    const { changeAdmin } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const { state } = useContext(AuthContext);

    console.log("[Dashboard] state.username: ",state)
    console.log("[Dashboard] state.username: ",state.username)
    console.log("[Dashboard] state.userId: ",state.userId)
    console.log("[Dashboard] state.maxAdmin: ",state.maxAdmin)

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    }
    // data fetch. make admin ID, except current
    let temp = [];
    for(let i = 0; i < state.maxAdmin; i++) {
        let tempuser = `admin${i==0?'':i}`;
        if(tempuser !== state.username){
            temp.push(tempuser);
        }        
    }
    
    // Hook... useRef
    const newAdminRef = useRef(null); // <select ref={dayRef}/>
    
    const selecedNewAdmin = ()=>{
        // logout();
        const newAdmin = newAdminRef.current.value;
        changeAdmin(newAdmin,newAdmin.length===5?0:newAdmin[newAdmin.length-1]);
      
        console.log("[Dashborad]selecedNewAdmin   newAdmin : ", newAdmin);
        console.log("[Dashborad]selecedNewAdmin   state : ", state);

    }

    const [windowDimensions] = useViewport()
    const { width, height } = windowDimensions
  
    console.log("[Dashboard]  windowDimensions", windowDimensions);
    console.log("[Dashboard]  width, height", width, height);


    // export type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
    // export type IconCorner = 'bottom right' | 'top right' | 'top left' | 'bottom left'
    const iconSize = "large";
    
    return (
        <>
            <Router>
            <ScrollToTop />
            <Menu  color='black' inverted
            style={{height: "30px", 
            paddingTop: 0,
            paddingBottom: 0,
            }}>
            {/* <Menu fixed='top' color='black' inverted> */}
                {/* 
                <Menu.Menu>
                <Menu.Item header href='/'><Icon name='tv'/>LG Movie</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                <Menu.Item link>Generate</Menu.Item>
                <Menu.Item link onClick={onLogout}>Log out</Menu.Item>
                </Menu.Menu> 
                */}

                <Menu.Menu>
                    <Menu.Item header as={Link} to="/" ><Icon name='home' size={iconSize} />Home </Menu.Item>
                </Menu.Menu>
                <Menu.Menu >
                    {/* <Menu.Item header as={Link} to="/per"><Icon name='heart' size='big'/>Recommend Top 10</Menu.Item>
                    <Menu.Item header as={Link} to="/pop"><Icon name='star' size='big'/>Popularity Top 10</Menu.Item> */}
                    <Menu.Item header as={Link} to='/allmovie'><Icon name='film' size={iconSize}/>All movie</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item ><Icon color='brown' name='user' size={iconSize}/><span style={{color:'brown'}}>{state.username}</span>
                    </Menu.Item>
                    {/* <Menu.Item ><b>Change<br/>User</b> */}
                    <Menu.Item>
                        {/* <select ref={newAdminRef} style={{background: "grey"}}> */}
                        <select ref={newAdminRef} 
                            style={{height: "auto", 
                                    width:"auto",
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingRight: 0,
                                    paddingLeft: 0,
                                    }}>
                            {temp.map((t)=>{
                                return(<option key={t}>{t}</option>)                            
                            })}
                        </select>
                        </Menu.Item>
                        <Menu.Item >
                        <Button as={Link} to="/" inverted primary onClick={selecedNewAdmin} 
                        style={{height: "25px", 
                        // width:"80px",
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 5,
                        paddingLeft: 15,
                        }}><Icon name='exchange'/><Icon name='user'/></Button>
                    </Menu.Item>
                    <Menu.Item ><Button onClick={onLogout} inverted secondary
                    style={{height: "25px", 
                    paddingTop: 0,
                    paddingBottom: 0,                    
                    paddingRight: 10,
                    paddingLeft: 15,
                    }}><Icon name='sign-out'/>logout</Button></Menu.Item>
                    
                </Menu.Menu>
            </Menu>
            <Route path='/' exact component={() => 
                <MoviesCarousel/>
            }/>
            <Route path='/allmovie' exact component={() => 
                <MoviesList/>
            }/>
            <Route path='/movies/:movieId' render={props => 
                <MovieDetails id={props.match.params.movieId} locationState={props.location.state}/>
            }/>
            {/* <Route path='/login' exact component={() => <Login />} /> */}
            </Router>
        </>
    );
  }

  export default Dashboard;