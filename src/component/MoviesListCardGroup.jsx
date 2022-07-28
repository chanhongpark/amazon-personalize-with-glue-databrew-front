import React, {useContext, useRef, useState} from 'react';
// import { AuthContext } from '../context/Auth.context';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { Header, Card, Rating, Icon, Button } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'

import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';

// Heads up!
// Don't forget to setyp required CSS!
import "pure-react-carousel/dist/react-carousel.es.css";

import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import CustomDotGroup from "./CustomDotGroup";
import { Divider } from "semantic-ui-react";
//import CarouselSwipe from './CarouselSwipe'

// Import Swiper React components & Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MoviePoster from './GetMovieImg'

//import "./styles.css";
import { Navigation, Pagination } from "swiper";

function MoviesListCardGroup({ items, pageViewOrigin, cardStyle }) {
    // const { state: ContextState } = useContext(AuthContext);
    // const {userId} = ContextState;

    
    const { Track, trackEvent } = useTracking({page: 'MovieListCardPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });
  

    function movieCards() {
      return items
        .map(movie =>
          <Card
            key={movie.id}
            as={Link} to={{ pathname: `/movies/${movie.id}`, state:  {pageViewOrigin}  }}
            style={cardStyle}
            // onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}` }); }}
            >
  
            <MovieCardImage movieName={movie.name} size = "small" minHeight={140} fontSize={24} imageUrl={movie.imageUrl}
            />
            <Card.Content>
              {movie.score? <Card.Meta as="h1">{movie.name}</Card.Meta> : <Card.Header>{movie.name}</Card.Header> }
              <Card.Description><Rating icon='star' defaultRating={4} maxRating={5} /></Card.Description>
              {/* <Card.Description><Icon name='tag'/> {movie.category}</Card.Description> */}
              
                  {movie.category}
            
            </Card.Content>
            <Card.Content extra>
                {movie.score? <>Score: <strong>{movie.score}</strong></> : <Card.Meta >{movie.score}</Card.Meta>}
            </Card.Content>
          </Card>
        );
    };
  
  return (
      <Track>
       <Card.Group centered>
        {movieCards()}
       </Card.Group> 
      </Track>
    );
  };
  
  MoviesListCardGroup.propTypes = {
    items: PropTypes.array,
    pageViewOrigin: PropTypes.string,
    cardStyle: PropTypes.object
  };

  export default MoviesListCardGroup;