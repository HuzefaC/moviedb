import { useState, useEffect } from 'react';

// API
import apiSettings from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState(''); // For search term
  const [state, setState] = useState(initialState); // For the movie data
  const [loading, setLoading] = useState(false); // For Spinner
  const [error, setError] = useState(false); // For Errors
  const [isLoadingMore, setisLoadingMore] = useState(false); // For Loading more data

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await apiSettings.fetchMovies(searchTerm, page);
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render and Search
  useEffect(() => {
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setisLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return {
    state,
    loading,
    error,
    setSearchTerm,
    searchTerm,
    setisLoadingMore,
  };
};
