import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from "prop-types";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { useMovieFetch } from "../hooks/useMovieFetch";
//components
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfoBar from "./MovieInfoBar";
//hook
//image
import NOIMAGE from "../images/no_image.jpg";
import MovieInfo from './MovieInfo';
import Actor from "./Actor";
const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, error, loading }
        = useMovieFetch(movieId);
    console.log(movie, 'Movie--')
    if (loading) return <Spinner />
    if (error) return <div>Something went wrong...</div>
    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.budget} />
            <Grid header='Actors'>
                {movie.actors.map(actor => (
                    <Actor
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path ?
                                `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NOIMAGE
                        } />

                ))}
            </Grid>

        </>
    )

}
export default Movie;