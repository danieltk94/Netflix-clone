import React, { useState } from "react";
import Row from '../Row/Row'
import requests from "../../../../utils/requests"

const RowList = () => {
    const [trailerUrl, setTrailerUrl] = useState(""); // stores the URL of a movie trailer, allowing a trailer to play when a row is clicked
    const [activeRow, setActiveRow] = useState(null); // keeps track of which row is currently active

    //it is function that controls what happens when a row is clicked
    const handleSetTrailer = (url, rowId) => {
        if (activeRow === rowId && trailerUrl === url) {
        // Close the trailer if the same row is clicked again
        setTrailerUrl("");
        setActiveRow(null);
        } else {
        // Open the new trailer
        setTrailerUrl(url);
        setActiveRow(rowId);
        }
    };
  return (
   <>
    <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={1} // Row-specific ID
        onSetTrailer={handleSetTrailer}
    />
    <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={2} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRatedMovies}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={3} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={4} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={5} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={6} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={7} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
      <Row
        title="Documentaries Movies"
        fetchUrl={requests.fetchDocumentaries}
        isLargeRow={false}
        trailerUrl={trailerUrl}
        activeRow={activeRow}
        rowId={8} // Row-specific ID
        onSetTrailer={handleSetTrailer}
      />
   </>
  )
}

export default RowList