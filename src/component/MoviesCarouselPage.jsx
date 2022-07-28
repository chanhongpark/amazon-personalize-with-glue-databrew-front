import React from 'react';
// import { AuthContext } from '../context/Auth.context';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


import { useTracking } from 'react-tracking';
import { dispatchUserEvent } from '../util/Utils';

//import CarouselSwipe from './CarouselSwipe'

// Import Swiper React components & Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MoviePoster from './GetMovieImg'

import "../styles.css";
import { Navigation, Pagination } from "swiper";

function MoviesCarouselPage({ items, pageViewOrigin, cardStyle }) {
    // const { state: ContextState } = useContext(AuthContext);
    // const {userId} = ContextState;

    
    const { Track, trackEvent } = useTracking({page: 'MoviesCarouselPage'}, {
      dispatch: (data) => dispatchUserEvent(data)
    });

    function MakeSwipeSlide(){
        return (items.map((movie,idx) =>
          <SwiperSlide index={idx}
           key={movie.id}
          //  onClick={() => { trackEvent({ EVENT_TYPE: 'click', movieId: `${movie.id}` }); }}
           >
            <Link to={{ pathname: `/movies/${movie.id}`, state:  {pageViewOrigin}  }}>
              <MoviePoster id = {movie.id} />
            </Link>
          </SwiperSlide>)
        )
    };

    function CarouselSwipe ()  {
       return (
        <Swiper
          slidesPerView={5}
          spaceBetween={5}
          loop={true}
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {MakeSwipeSlide()}
         
        </Swiper>
      );
    };
    return (
      <Track>
            {items && CarouselSwipe()}
      </Track>
    );
  };
  
  MoviesCarouselPage.propTypes = {
    items: PropTypes.array,
    pageViewOrigin: PropTypes.string,
    cardStyle: PropTypes.object
  };

  export default MoviesCarouselPage;