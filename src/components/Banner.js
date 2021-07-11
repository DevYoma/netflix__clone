import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';
import axios from '../api/axios';
import requests from '../api/requests';
import { base_url } from './Row';

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            // console.log(request.data.result[Math.floor(Math.random() * request.data.results.length -1)]);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length -1)]
            )
            
            //  console.log(movie);
            return request;  
        }

        fetchData()
    }, [])

    console.log(movie);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return ( 
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    ${base_url}${movie?.backdrop_path}
                )`, 
                backgroundPosition: "center center"
            }}
        >
            <div className="banner__contents">
                {/* title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                {/* description */}

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom">

            </div>
        </header>
     );
}
 
export default Banner;