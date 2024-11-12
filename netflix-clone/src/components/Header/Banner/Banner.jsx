import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios';
import requests from '../../../utils/requests';
import './Banner.css'
import play from '../../../assets/images/play_icon.png'
import info from '../../../assets/images/info_icon.png'

const Banner = () => {
    const [movie, setMovie] = useState({})
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            console.log(request);
            setMovie(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length + 1)
            ]
            );
            // console.log(Math.floor(Math.random()*request.data.results.length + 1))
            return request;
        }
        fetchData();
        }, []);
        function truncate(str, n) {
            return str?.length > n ? str.substr(0, n - 1) + "...." : str;
        }
    return (
        <div
        className="banner"
        style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundSize: `cover`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
        }}
        >
        <div className="banner__contents">
            <h1 className="banner__title">
            {movie.name || movie.name || movie.original_name}
            </h1>
            <div className="banner__buttons">
            <button className="banner__button banner__play">
                <img src={play} alt="Play" />
                <p>Play</p>
            </button>
            <button className='banner__button '>My List</button>
            </div>
            <div className="banner__description">
                {/* <p>{String(movie?.overview).substring(0, 150) + "..."}</p> */}
            </div>
        </div>
        <div className="banner__fadeBottom" />
        </div>
    )
}

export default Banner