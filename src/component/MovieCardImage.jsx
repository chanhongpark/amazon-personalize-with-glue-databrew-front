import React from 'react';
import PropTypes from 'prop-types';

import { Image, Segment } from 'semantic-ui-react'

import { LazyLoadImage } from 'react-lazy-load-image-component';

function MovieCardImage({movieName, minHeight, size, imageUrl}) {
  
  // console.log('❤❤❤❤',movieName,minHeight, imageUrl);
    return (
      // <Segment style={{minHeight, display: 'flex'}}>
        // <Image fluid Size={size} src={ imageUrl }  />
        <LazyLoadImage
        //  alt={image.alt}
         height={'50%'}
         src={imageUrl} // use normal <img> attributes as props
         width={'100%'} />
      // </Segment>
    );
  }
  
  MovieCardImage.propTypes = {
    dealName: PropTypes.string,
    minHeight: PropTypes.number,
    fontSize: PropTypes.number,
    imageUrl: PropTypes.string
  };

  export default MovieCardImage;