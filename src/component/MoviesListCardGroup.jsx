import React from 'react';
// import { AuthContext } from '../context/Auth.context';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

import { Card, Rating } from 'semantic-ui-react'

import MovieCardImage from './MovieCardImage'

import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';

// Heads up!
// Don't forget to setyp required CSS!
import "pure-react-carousel/dist/react-carousel.es.css";

import "../styles.css";
import { useViewport } from '../hooks/useViewport'

function MoviesListCardGroup({ items, pageViewOrigin, cardStyle }) {
    // const { state: ContextState } = useContext(AuthContext);
    // const {userId} = ContextState;
    const [windowDimensions] = useViewport()
    const { width, height } = windowDimensions
  
    console.log("[MoviesListCardGroup]  windowDimensions", windowDimensions);
    console.log("[MoviesListCardGroup]  width, height", width, height);
    
    const { Track, trackEvent } = useTracking({page: 'MovieListCardPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });
  
    const cardFontSize = (height<500)?14:((height<800)?18:20)
    const itemsPerRow = (height<500)?5:((height<800)?4:3)
    function movieCards() {
      return items
        .map(movie =>
          <Card
            key={movie.id}
            as={Link} to={{ pathname: `/movies/${movie.id}`, state:  {pageViewOrigin}  }}
            // style={cardStyle}
            // onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}` }); }}
            >
  
            <MovieCardImage movieName={movie.name} size = "small" minHeight={140} fontSize={24} imageUrl={movie.imageUrl}
            />
            <Card.Content>
              {movie.score? 
                <Card.Meta as="h1"
                >{movie.name}</Card.Meta> 
                : <Card.Header
                  style={{fontSize:cardFontSize}}
                    // fontSize={(height<500)?10:((height<800)?10:10)}
                >{movie.name}</Card.Header> }
              <Card.Description><Rating icon='star' defaultRating={movie.rating} maxRating={5} disabled /></Card.Description>
              {/* <Card.Description><Icon name='tag'/> {movie.category}</Card.Description> */}
                {movie.category}            
            </Card.Content>
            {/* <Card.Content extra>
                {movie.score? <>Score: <strong>{movie.score}</strong></> : <Card.Meta >{movie.score}</Card.Meta>}
            </Card.Content> */}
          </Card>
        );
    };

  return (
      <Track>
       <Card.Group 
        itemsPerRow={itemsPerRow} 
        centered
        style={{ display: 'flex', alignItems: 'flex-start'}}
        >
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