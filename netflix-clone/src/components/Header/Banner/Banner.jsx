import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios';
import requests from '../../../utils/requests';
import './Banner.css'
import play from '../../../assets/images/play_icon.png'



const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        // Using IIFE (Immediately Invoked Function Expression)
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request);
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]
                );
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        })();
    }, []);
        function truncate(str, n) {
            return str?.length > n ? str.substring(0, n - 1) + "...." : str;
        }
    return (
        <div
        className="banner"
        style={{
            // Uses optional chaining to avoid from the throwing an errors if movie is not yet loaded.
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`, 
            backgroundSize: `cover`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
            position: "relative",

        }}
        >
        <div className="banner_contents">
            <h1 className="banner_title">
            {movie?.name || movie?.name || movie?.original_name}
            </h1>
            <div className="banner_buttons">
            <button className="banner_button banner_play">
                <img src={play} alt="play" /> Play</button>
            <button className='banner_button '>My List</button>
            </div>
            <div className="banner_description">
                <p>{truncate(movie?.overview, 150)}</p>
            </div>
        </div>
        <div className="banner_fadeBottom" />
        </div>
    )
}

export default Banner