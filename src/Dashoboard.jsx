import React, { useContext } from 'react'

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { Menu, Container, Icon } from 'semantic-ui-react'
import MoviesList from './component/MoviesList'
import MovieDetails from './component/MovieDetails'
import { AuthContext } from './context/Auth.context';
import MoviesCarousel from './component/MoviesCarousel'
import ScrollToTop from "./ScrollToTop";

function Dashboard() {

    const { logout } = useContext(AuthContext)
    const onLogout = (e) => {
        e.preventDefault();
        logout();
    }
  
    return (
        <>
            <Router>
            <ScrollToTop />
            <Menu fixed='top' color='black' inverted>
                <Menu.Menu>
                <Menu.Item header href='/'><Icon name='tv'/>LG Movie</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                <Menu.Item link>Generate</Menu.Item>
                <Menu.Item link onClick={onLogout}>Log out</Menu.Item>
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