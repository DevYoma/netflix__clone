import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/Row.css'

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([])

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

    console.log(movies);

    return ( 
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {/* several row poster */}

                {movies.map(movie => (
                    <div key={movie.id} className="row__movie">
                        <img 
                            className="row__poster"
                            src={`${base_url}${movie.poster_path}`} alt={movie.name}
                        />
                    </div>
                ))}
            </div>
            
            {/* container => posters */}

        </div>
     );
}
 
export default Row;