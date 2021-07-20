import { useEffect, useState } from "react";
import API from '../API';
import { isPersistedState } from '../helpers'
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}


export const useHomeFetch = () => {
    const [state, setstate] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    //console.log(searchTerm, 'searchTerm')
    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);

            setstate(prev => ({
                ...movies,
                results:
                    page > 1 ? [prev.results, ...movies.results] : [...movies.results]
            }))

        } catch (error) {
            console.log(error.message);
            setError(true);
        }
        setLoading(false);
    };
    //Initial Render & search
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
            if (sessionState) {
                console.log('Grabbing from session Storage')
                setstate(sessionState);
                return
            }
        }
        console.log('Grabbing from API')
        setstate(initialState);
        fetchMovies(1, searchTerm)
    }, [searchTerm]);
    //load more
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])

    //write to sessionStorage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));

    }, [searchTerm, state])

    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}