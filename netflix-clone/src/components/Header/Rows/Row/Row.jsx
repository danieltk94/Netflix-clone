import React, { useEffect, useState } from "react";
import './Row.css'
import axios from '../../../../utils/axios'
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";


const Row = ({title, fetchUrl, isLargeRow, trailerUrl, activeRow, rowId, onSetTrailer }) => {
    const [movies, setMovies] = useState([]);
    const [movieTrailerUrl, setMovieTrailerUrl] = useState("");

const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
    (async () => {
    try {
        // console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
    } catch (error) {
        console.log("error", error);
    }
    })();
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
                setMovieTrailerUrl(trailer);// Update state with the trailer video ID
                onSetTrailer(trailer, rowId); // Notify parent component of the new trailer URL
            } else {
                console.error("No trailer found for this movie");
            }
            })
            .catch((error) => console.error("Trailer fetching error:", error));
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
        {/* Iterate through movies and display each poster */}
        {movies?.map((movie, index) => {
            // Determine image source based on isLargeRow prop
            const imageSrc = isLargeRow ? movie.poster_path : movie.backdrop_path;
            return imageSrc ? (
            <img
                onClick={() => handleClick(movie)} // Click event handler for each poster
                key={movie.id} // Unique key for each movie
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${imageSrc}`} // Full image URL
                alt={movie?.title || movie?.name || movie?.original_name}
            />
            ) : null;
        })}
        </div>
        {/* Only show trailer if this row is active */}
        <div style={{ padding: "20px" }}>
        {activeRow === rowId && trailerUrl && (
            <YouTube videoId={trailerUrl} opts={opts} />
        )}
        </div>
    </div>
  )
}

export default Row

// Props Usage:

// title: The row title (e.g., "Trending Now").
// fetchUrl: The API endpoint to fetch movie data.
// isLargeRow: Determines if the row uses larger posters.
// trailerUrl: The YouTube video ID of the trailer.
// activeRow: The ID of the currently active row.
// rowId: The unique identifier for this row.
// onSetTrailer: Callback function to update the trailer URL in the parent component.