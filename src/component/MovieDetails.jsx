import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config.json';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth.context.jsx';


import { Container, Divider, Card, Placeholder, Button, Icon, Rating } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'
import RecommendedMovieList from './RecommendationMovieList';

import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';


// 영화 상세 페이지
function MovieDetails({ id, locationState }) {
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId
  } = ContextState;
    const [movie, setMovie] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [recommendedMovies, setRecommendedMovies] = React.useState([]);
    const [recommendedMovies2, setRecommendedMovies2] = React.useState([]);
    // const { state } = useContext(AuthContext);

    // config.ApiUrl need to be updated during Frontend set up lab.
    const config_api_url = config.ApiUrl;
  
    // Fetch a movie data for specific movie id from Movie Table in DynamoDB (GET)
    const get_a_movie_url = `${config_api_url}/movie`
    const a_movie_api = `${get_a_movie_url}/${id}`

    const ApiKey ='07f9ef25b539558ed23c3b6752d61713'
    const Lang = 'en-US'
    const Tmdb_api = `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=${Lang}`;
   
    React.useEffect(() => {
      
      async function loadDealInfo() {

        const response = await axios.get(
          Tmdb_api,
      );
       console.log((response.data));
       setMovie((response.data))
       setLoading(false);

        document.title = `${response.data.name} - DemoGo Prime`;
  
      };
      loadDealInfo();
  
      return () => {
        setMovie({});
        setLoading(true);
      };
    }, [id, locationState]);

    const UserId = ContextState.userId;

    const { Track, trackEvent } = useTracking({page: 'MoviesCarouselPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });
   
    return (
      <Container>
        <NavLink to='/'><Icon name='arrow left'/>Back to Movie list</NavLink>
        <Divider hidden/>
        <Card key={movie.id} style={{ width: '100%', maxWidth: 720, minHeight: 100, margin: 'auto' }}>
          {loading ? (
            <Placeholder fluid style={{minHeight: 320}}>
              <Placeholder.Image/>
            </Placeholder>
          ) : 
          (
            <MovieCardImage movieName={movie.title} size = "medium" minHeight={100} fontSize={48} imageUrl={'https://image.tmdb.org/t/p/w500/'+movie.poster_path}/>
          )}
          {loading ? (
            <Placeholder>
              <Placeholder.Line/>
              <Placeholder.Line/>          
            </Placeholder>
          ) : (
            <Card.Content>
              <Card.Header>{movie.title}</Card.Header>
              <Card.Meta><Icon name='tag'/> {movie.genres[0].name}</Card.Meta>
              <Card.Description><Rating icon='star' defaultRating={movie.vote_average} maxRating={10} /></Card.Description>
              <Card.Header as="h1"> </Card.Header>
              <Card.Description>{movie.overview}</Card.Description>
                <Button onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}` }); }}>
                  Watch
                </Button>
            </Card.Content>
          )}
  
        </Card>
        <Divider hidden/>
        {/* <RecommendedMovieList recommendedMovies={recommendedMovies} title = "실시간 추천 리스트"/>
        <RecommendedMovieList recommendedMovies={recommendedMovies2} title = "배치(Daily) 추천 리스트"/> */}
      </Container>
    );
  };
  
  MovieDetails.propTypes = {
    id: PropTypes.string,
    locationState: PropTypes.object
  };

  export default MovieDetails;