import { useState, useEffect } from 'react';

// Helpers
import { isPersistedState } from '../helpers';

// API
import apiSettings from '../API';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await apiSettings.fetchMovie(movieId);
        const credit = await apiSettings.fetchCredits(movieId);
        // Get directors only
        const directors = credit.crew.filter(
          (member) => member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credit.cast,
          directors,
        });
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();
  }, [movieId]);

  // Write to session storage

  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
