import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import "../styles.css";

function MoviePoster(id) {
    const ApiKey ='07f9ef25b539558ed23c3b6752d61713'
    const Lang = 'en-US'
    // const Lang = 'ko-KR'
    let MovieId = id
    const ImgSize ='w500'
    const [Movie,setMovie] = useState([])

    useEffect(()=>{
        const Req_Url = `https://api.themoviedb.org/3/movie/${MovieId.id}?api_key=${ApiKey}&language=${Lang}`;

        fetch(Req_Url)
        .then(res => res.json())
        .then(res => {
        setMovie(res)
        } )
    },[])

    return (
        <img src = {'https://image.tmdb.org/t/p/'+ImgSize+'/'+Movie.poster_path}
            // className='movieShowcase__container--movie-image'
        />
    );
}

MoviePoster.propTypes = {
    id: PropTypes.string,
  };
    
export default MoviePoster;
    