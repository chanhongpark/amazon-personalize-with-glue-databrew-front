import React, { useContext } from 'react';
import axios from 'axios';
import config from '../config.json';


import { Icon, Header, Button, Container  } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';

import MoviesCarouselPage from './MoviesCarouselPage'

import { AuthContext } from '../context/Auth.context';
import ReactPlayer from 'react-player'

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
      // const get_pop_movie_url = `${config_api_url}/movie`
      // const get_per_movie_url = `${config_api_url}/movie`

      
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
    
  
    document.title = 'Pebble Moive';
    return (
      <>
      {/* 
      <div className='headermovie' >
        <ReactPlayer
                      playing={true}
                      loop={true}
                      width='100%'
                      height='100%'
                      muted={true}
                      controls={false}
                      light={false}
                      className='headermovie__video'
                      // url='https://www.youtube.com/watch?v=giXco2jaZ_4'
                      url='https://www.youtube.com/watch?v=ODZMo8HXqwA'
                      config={{ youtube: { playerVars: { loop : 1, cc_load_policy : 0, disablekb: 1, } } }}
        />
        <h1 className='headermovie__container-heading'>Top Gun: Maverick</h1>
        <p className='headermovie__container-overview'>
        After more than thirty years of service as one of the Navy’s top aviators, 
        Pete “Maverick” Mitchell (Tom Cruise) is where he belongs, 
        pushing the envelope as a courageous test pilot and dodging the advancement in rank that would 
        ground him. When he finds himself training a detachment of Top Gun graduates for 
        a specialized mission the likes of which no living pilot has ever seen, Maverick encounters Lt. 
        </p>
        <div className='header__container--fadeBottom'></div>
      </div> 
      */}
      <Container fluid style={{ marginTop: 0, }}>
        
        <Header size='medium' inverted>
          <Icon name='heart' />
          <Header.Content>Recommended movies for <span style={{color:'red', fontSize:24}}>{userId===0?'admin':`admin${userId}`}</span>
          {/* <Header.Subheader>personalized movie recommendation</Header.Subheader> */}
          </Header.Content>
        </Header>
        <MoviesCarouselPage items={permovies} pageViewOrigin='Browse'/>

        <Header size='medium' inverted>
          <Icon name='star' />
          <Header.Content>Popular movies
          {/* <Header.Subheader>10 MOST POPULAR MOVIES RIGHT NOW</Header.Subheader> */}
          </Header.Content>
        </Header>
        <MoviesCarouselPage items={popmovies} pageViewOrigin='Browse'/>

        <Button floated='right' inverted primary size='medium' as={Link} to='/allmovie'> 
          All Movie List 
          <Icon name='right arrow' />
        </Button>
      </Container>
      </>
    );
  };

  export default MoviesCarousel;