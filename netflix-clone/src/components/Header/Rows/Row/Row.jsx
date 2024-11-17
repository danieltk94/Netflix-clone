import React, { useEffect, useState } from "react";
import './Row.css';
import axios from '../../../../utils/axios';
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { toast } from 'react-toastify';  // Import toast from react-toastify

const Row = ({ title, fetchUrl, isLargeRow, trailerUrl, activeRow, rowId, onSetTrailer }) => {
    const [movies, setMovies] = useState([]);
    const [movieTrailerUrl, setMovieTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(fetchUrl);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, [fetchUrl]);

    // Function to handle movie poster clicks
    const handleClick = (movie) => {
        // If a trailer is already playing and clicked again, close it
        if (
            movieTrailerUrl &&
            trailerUrl === movieTrailerUrl &&
            activeRow === rowId
        ) {
            onSetTrailer("", rowId); // Clear the trailer and reset the active row
        } else {
            // Fetch the YouTube trailer URL for the clicked movie
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    console.log(url);
                    if (url) {
                        // Extract the 'v' parameter (YouTube video ID) from the trailer URL
                        const urlParams = new URLSearchParams(new URL(url).search);
                        console.log(urlParams);
                        const trailer = urlParams.get("v");
                        setMovieTrailerUrl(trailer); // Update state with the trailer video ID
                        onSetTrailer(trailer, rowId); // Notify parent component of the new trailer URL
                    } else {
                        toast.error("No trailer found for this movie", { duration: 1000 });
                    }
                })
                .catch(() => {
                    toast.error("Error fetching the trailer. Please try again later.", { duration: 1000 });
                });
        }
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1, // Autoplay the video when loaded
        },
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies?.map((movie) => {
                    const imageSrc = isLargeRow ? movie.poster_path : movie.backdrop_path;
                    return imageSrc ? (
                        <img
                            onClick={() => handleClick(movie)}
                            key={movie.id}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src={`${base_url}${imageSrc}`}
                            alt={movie?.title || movie?.name || movie?.original_name}
                        />
                    ) : null;
                })}
            </div>
            {activeRow === rowId && trailerUrl && (
                <div style={{ padding: '20px' }}>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </div>
    );
};

export default Row;


// see also youtube-react on npmjs
// see also react toastify import it in app.jsx