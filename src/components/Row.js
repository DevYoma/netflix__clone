import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/Row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

export const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // trying to write an asynchronus function in the useEffect hook
        async function fetchData() {
            // fetchUrl = "https://api.themoviedb.org/3"
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            // console.table(request.data.results)
            setMovies(request.data.results)
            return request;
        }

        fetchData()
    }, [fetchUrl])
    // variables in your useEffect becomes the dependencies for the useEffect

    // console.log(movies);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        // checks to see if the trailer is open already then closes it
        if (trailerUrl){
            setTrailerUrl('');
        }
        else{
            // an npm package that looks for a youtube trailer for movies
            movieTrailer(movie?.name ||  "")
            .then(url => {
                // https://www.youtube.com/watch?v=xtMThy8QKgl
                const urlParams = new URLSearchParams(new URL(url).search);
                // getting the parameters using this package
                setTrailerUrl(urlParams.get('v')); 
            }).catch(error => alert(error))
        }
    }

    return ( 
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {/* several row poster */}

                {movies.map(movie => (
                    <div key={movie.id} className="row__movie">
                        <img 
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                        />
                    </div>
                ))}
            </div>
            
            {/* container => posters */}
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>
}
        </div>
     );
}
 
export default Row;