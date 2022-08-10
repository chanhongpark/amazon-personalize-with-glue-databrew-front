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
import { Navigation, Pagination,Scrollbar, A11y } from "swiper";
import { useViewport } from '../hooks/useViewport'

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
            className={'movieShowcase__container--movie' }
           >
            <Link to={{ pathname: `/movies/${movie.id}`, state:  {pageViewOrigin}  }}>
              <MoviePoster id = {movie.id} />
            </Link>
          </SwiperSlide>)
        )
    };

    function CarouselSwipe ()  {
      const [windowDimensions] = useViewport()
      const { width } = windowDimensions
    

       return (
        <>
        {/* <h1 className='movieShowcase__heading'>Test</h1> */}
        <Swiper
          className='mySwiper'
          navigation={true}
          grabCursor={false}
          draggable={false}
          modules={[Pagination, Navigation]}
          loop={true}
          loopAdditionalSlides={
            width >= 1378 ? 4 : width >= 998 ? 3 : width >= 625 ? 2 : 2
          }
          breakpoints={{
            1378: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            998: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            625: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
          preventClicksPropagation={true}
          preventClicks={true}
          scrollbar={{ draggable: false, hide: true }}
          slideToClickedSlide={false}
          pagination={{ clickable: true }}
        >
          {MakeSwipeSlide()}
         
        </Swiper>
      </>
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