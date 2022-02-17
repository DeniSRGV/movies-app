import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card/Card';
import './Movies.css';
import NoContent from './Nocontent/NoContent';

const Movies = function Movies({ moviesData, loading, error }) {
  const noContent = moviesData.length === 0 && !loading && !error ? <NoContent /> : null;

  const moviesAllCard = moviesData.map((item) => (
    <Card
      {...item}
      key={item.id}
      image={item.poster_path}
      title={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
      loading={loading}
      error={error}
    />
  ));

  return (
    <div className="movies">
      {moviesAllCard}
      {noContent}
    </div>
  );
};

Movies.defaultProps = {
  moviesData: [],
  loading: true,
  error: false,
};

Movies.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

export default Movies;
