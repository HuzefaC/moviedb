import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// Component
import Grid from './Grid/Grid.component';
import { Spinner } from './Spinner/Spinner.styles';
import BreadCrumb from './BreadCrumb/BreadCrumb.component';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;

  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
    </>
  );
};

export default Movie;
