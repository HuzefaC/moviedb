import React from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../../config';

// Components
import HeroImage from '../../components/HeroImage/HeroImage.component';
import Grid from '../../components/Grid/Grid.component';
import Thumb from '../../components/Thumb/Thumb.component';
import SearchBar from '../../components/SearchBar/SearchBar.component';
import Spinner from '../../components/Spinner/Spinner.component';
import Button from '../../components/Button/Button.component';

// Hooks
import { useHomeFetch } from '../../hooks/useHomeFetch';

// Images
import NoImage from '../../images/no_image.jpg';

const Home = () => {
  const { state, loading, error, setSearchTerm, searchTerm, setisLoadingMore } =
    useHomeFetch();

  if (error) {
    return <div>Something went wrong!!</div>;
  }

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable={true}
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setisLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;
