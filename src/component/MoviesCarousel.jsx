import React, { useContext } from 'react';
import axios from 'axios';
import config from '../config.json';


import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';

import MoviesCarouselPage from './MoviesCarouselPage'

import { AuthContext } from '../context/Auth.context';

function MoviesCarousel() {
    const [popmovies, setpopMovies] = React.useState([]);
    const [permovies, setperMovies] = React.useState([]);
    // const [movies, setMovies] = React.useState([]);
    const ContextState = useContext(AuthContext);
    const userId = ContextState.state.userId;

    // Fetch all movie data from Movie Table in DynamoDB (GET)
    // config.ApiUrl need to be updated during Frontend set up lab.
  
    React.useEffect(() => {
      const config_api_url = config.ApiUrl;
      const get_pop_movie_url = `${config_api_url}/recommendation/popularity`
      const get_per_movie_url = `${config_api_url}/recommendation/personalized/${userId}`
  
      async function fetchData () {
        const response = await axios.get(
          get_pop_movie_url,);
        //  console.log((response.data)['movies']);
        //  setMovies((response.data)['movies'])
        //  console.log(config.ApiUrl)
         console.log((response.data));
         setpopMovies((response.data))
        
        
      }
      async function fetchData2 () {
        const response = await axios.get(
          get_per_movie_url,);
        //  console.log((response.data)['movies']);
        //  setMovies((response.data)['movies'])
        //  console.log(config.ApiUrl)
         console.log((response.data));
         setperMovies((response.data))
      }

      fetchData();
      fetchData2();
    }, []);
    
  
    document.title = 'DemoGo Prime';
    return (
      <div >
      <Container fluid style={{ marginTop: 20 }}>
        <Header as='h3'>
          <Icon name='star' />
          <Header.Content>Popular movies
          <Header.Subheader>10 MOST POPULAR MOVIES RIGHT NOW</Header.Subheader>
          </Header.Content>
        </Header>
        <MoviesCarouselPage items={popmovies} pageViewOrigin='Browse'/>
        <div class="ui divider"></div>
        <Header as='h3'>
          <Icon name='heart' />
          <Header.Content>Recommended movies
          <Header.Subheader>personalized movie recommendation</Header.Subheader>
          </Header.Content>
        </Header>
        <MoviesCarouselPage items={permovies} pageViewOrigin='Browse'/>
        {/* <NavLink to='/allmovie'><Icon name='caret square right outline'/>All Movie List</NavLink> */}
        <Button primary size='medium' as={Link} to='/allmovie'> 
          All Movie List 
          <Icon name='right arrow' />
        </Button>
      </Container>
      </div>
    );
  };

  export default MoviesCarousel;