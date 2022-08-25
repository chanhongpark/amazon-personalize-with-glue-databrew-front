import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../config.json';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/Auth.context.jsx';


import { Container, Divider, Card, Placeholder, Button, Icon, Rating, Image } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'
import RecommendedMovieList from './RecommendationMovieList';

import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';
import MoviePlayer from './MoviePlayer';


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
    // const [recommendedMovies, setRecommendedMovies] = React.useState([]);
    // const [recommendedMovies2, setRecommendedMovies2] = React.useState([]);
    // const { state } = useContext(AuthContext);

    const [youtubeInfo, setYoutubeInfo] = React.useState([]);  // response.data.results
    const [youtubeLoading, setYoutubeLoading] = React.useState(true);
    const [officialYoutube, setOfficialYoutube] = React.useState({}); 
    // config.ApiUrl need to be updated during Frontend set up lab.
    const config_api_url = config.ApiUrl;
  
    // Fetch a movie data for specific movie id from Movie Table in DynamoDB (GET)
    const get_a_movie_url = `${config_api_url}/movie`
    const a_movie_api = `${get_a_movie_url}/${id}`

    const ApiKey ='07f9ef25b539558ed23c3b6752d61713'
    const Lang = 'en-US'
    // const Lang = 'ko-KR'
    const Tmdb_api = `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=${Lang}`;
    const Tmdb_api_getVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}`;
    // const Tmdb_api_getVideo = `https://api.themoviedb.org/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc`;

    React.useEffect(() => {
      
      async function loadDealInfo() {
        console.log('[MovieDetails] (loadDealInfo).........');
        const response = await axios.get(
          Tmdb_api,
        );
        console.log('[MovieDetails] (loadDealInfo) response : ',(response));
        console.log('[MovieDetails] (loadDealInfo) response : ',(response.data.genres.length));
        setMovie((response.data))
        setLoading(false);

        document.title = `${response.data.title} - Pebble World`;
      };
      

      async function loadYoutubeInfo() {
        console.log('[MovieDetails] (loadYoutubeInfo).........');
        const response = await axios.get(
          Tmdb_api_getVideo,
        );

        console.log('[MovieDetails] (loadYoutubeInfo) response : ',(response));
        console.log('[MovieDetails] (loadYoutubeInfo) response.data.results : ',response.data.results);

        setYoutubeInfo((response.data.results));
        

        // find official 
        let officialVideo = {};
        if (response.data.results.length !== 0) {
          officialVideo = response.data.results[0]; // set first
          console.log('[MovieDetails] (find official) temp : ',officialVideo.name, officialVideo.key);
          for (let i = 0 ; i < response.data.results.length ; i++){
            if (response.data.results[i].official === 'true'){
              officialVideo = response.data.results[i]; // assign first offical and break.
              console.log('[MovieDetails] (find official) true : ',officialVideo.name, officialVideo.key,officialVideo.size);
              break;
            }
          }  
        }
        setOfficialYoutube(officialVideo);
        setYoutubeLoading(false);
      };
      loadDealInfo();
      loadYoutubeInfo();
  
      return () => {
        setMovie({});
        setLoading(true);
        setYoutubeInfo([]);
        setYoutubeLoading(true);
        setOfficialYoutube({});
      };
    }, [id, locationState]);

    const UserId = ContextState.userId;

    const { Track, trackEvent } = useTracking({page: 'MoviesCarouselPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });
    const [rating, setRating] = React.useState(0);
    function handleChangeOnRate(e, { rating }) {
      e.preventDefault();
      console.log('🎂🎂🎂rating',rating)
      setRating(rating);
    }

    // id: "6229af3663aad2006d22026c"
    // key: "qoEyZoOTtss"
    // name: "The Final Cut Trailer"
    // site: "YouTube"
    // size: 2160
    // type: "Trailer"

    const onClickWatchButton = () => {
      // console.log(`[MovieDetails] (onClickWatchButton) EVENT_TYPE: 'click', movieId: ${movie.id}, UserId:${UserId}`);
      // trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}` }); 
      
      console.log(`[MovieDetails]  (onClickWatchButton) key: ${officialYoutube.key}`);
      console.log(`[MovieDetails]  (onClickWatchButton) name: ${officialYoutube.name}`);
      console.log(`[MovieDetails]  (onClickWatchButton) size: ${officialYoutube.size}`);
      console.log(`[MovieDetails]  (onClickWatchButton) type: ${officialYoutube.type}`);

      setModalOpen(true);
    }

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
      <Container style={{ marginTop: 100 }}>
        {/* <Card key={movie.id} style={{ width: '50%', minHeight: 100, margin: 'auto' }}> */}
        <Card style = {{width: '100%'}}>
          {/* {loading ? (
            <Placeholder fluid style={{minHeight: 320}}>
              <Placeholder.Image/>
            </Placeholder>
          ) : 
          (
            <Image floated='left' Size='large' src={ 'https://image.tmdb.org/t/p/w500/'+movie.poster_path} />
          )} */}
          {loading || youtubeLoading? (
            <Placeholder>
              <Placeholder.Line/>
              <Placeholder.Line/>          
            </Placeholder>
          ) : (
            <Card.Content  >
              <Image size='medium' floated='left' src={ 'https://image.tmdb.org/t/p/w500/'+movie.poster_path} />
              <Card.Header style={{fontSize:35}}>{movie.title}</Card.Header>
              {/*<Card.Meta><Icon name='tag'/> {movie.genres[0].name}</Card.Meta>*/}
	            {movie.genres.length !== 0 && 
                (<Card.Meta><Icon name='tag'/> 
                  {movie.genres.map((genre)=>{
                    return <span key={genre.name}>{`#${genre.name} `}</span>
                  })}
                </Card.Meta>)}
	            {movie.release_date.length !== 0 && 
                (<Card.Meta><Icon name='time'/>{movie.release_date}</Card.Meta>)}
              {movie.tagline.length !== 0 && 
                (<Card.Meta><Icon name='map outline'/>{movie.tagline}</Card.Meta>)}
              
              <Card.Meta><Rating icon='star' defaultRating={Math.round(Math.round(movie.vote_average)/2) } maxRating={5} disabled />({Math.round(movie.vote_average*10)/10}/10)</Card.Meta>
              <Card.Header as="h1"> </Card.Header>
              <Card.Header as="h1"> </Card.Header>
              <Card.Meta>{movie.overview}</Card.Meta>
              <Card.Header as="h1"> </Card.Header>
              
              {(youtubeInfo.length !== 0) &&
                <Button onClick={onClickWatchButton} primary>Watch Trailer&nbsp;&nbsp;<Icon name='play circle outline'/></Button>}
	              <MoviePlayer officialYoutube={officialYoutube} open={modalOpen} close={closeModal} />
                      {/* 팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
                </MoviePlayer> */}
              <Card.Header as="h1"> </Card.Header>
              <Card.Header as="h1"> </Card.Header>
              <Rating icon='heart' defaultRating={0} maxRating={5} onRate={handleChangeOnRate} />
                <Button onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}`, UserId:`${UserId}`, Rating: `${rating}`}); }}>
                  Rating
                </Button>
            </Card.Content>
          )}
	  
          </Card>
          <Button floated='right' inverted secondary size='medium' as={Link} to='/'> 
            Back to Movie list
          <Icon name='left arrow' />
          </Button>
      </Container>
    );
  };
  
  MovieDetails.propTypes = {
    id: PropTypes.string,
    locationState: PropTypes.object
  };

  export default MovieDetails;