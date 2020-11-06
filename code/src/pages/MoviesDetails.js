import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"

import { apiKey } from "key"
import "./moviesDetails.css"
import Arrow from "../assets/arrow.svg"
import { NotFound } from 'NotFound'

export const MoviesDetails = () => {
    const { movieId } = useParams();
    const [movies, setMovies] = useState([])
    const history = useHistory()
    const [status, setStatus] = useState(200);


    useEffect(() => {
        const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        fetch(movieDetailsURL)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log(json)
                setMovies(json)
            })
            .catch((error) => {
                console.error('Bad request', error)
            })
    }, [movieId])

    if (!movies.id) {
        return (
            <div>Movie not found</div>
        )
    }

    return (

        <div className="movie" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0) 100%), url(https://image.tmdb.org/t/p/w1280${movies.backdrop_path})` }}>
            <Link className="back-link" to="/" exact='true'>
                <img className="back-arrow" src={Arrow} alt="go back to movies" />Movies list
                </Link>
            <div className="movie-details">
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w780/${movies.poster_path}`} alt={movies.original_title} />

                <div className="details-container">
                    <h2>{movies.original_title}
                        <span className="movie-rating" >{`${movies.vote_average} / 10`}</span></h2>
                    <p className="movie-overview">{movies.overview}</p>
                </div>
            </div>
        </div>
    )
    // } else if (movies.id === false) {
    //     return (
    //         <NotFound />
    //     )

    // } else {
    //     history.push("/404")

}
