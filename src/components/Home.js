import React from 'react'
//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'
import HeroImage from './HeroImage';

//Hooks
import { useHomeFetch } from '../hooks/useHomeFetch'
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from "./Spinner";
import Button from './Button';
//Image
import NoImage from '../images/no_image.jpg';
import SearchBar from './SearchBar';

const Home = () => {
    const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } = useHomeFetch();
    console.log(state, 'State')
    if (error) return <div>Something went wrong...</div>
    return (
        <>
            {!searchTerm && state.results[0] ?
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                /> : null
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {state.results.map(movie => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button
                    callback={() => setIsLoadingMore(true)}
                    text="Load More" />
            )}
        </>
    )
}
export default Home
