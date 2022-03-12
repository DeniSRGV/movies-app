import React from 'react';
import PropTypes from 'prop-types';

import NoContent from '../Container/Nocontent/NoContent';
import Card from '../Container/Card/Card';
import '../Container/Movies.css';

const RatedPages = function RatedPages({ rateCard, loading, error, genres, setCardRated, changeValueRate }) {
  const noContent = rateCard.length === 0 && !loading && !error ? <NoContent /> : null;

  const RatedPagesAllCard = rateCard.map((item) => (
    <Card
      {...item}
      key={item.id}
      image={item.poster_path}
      title={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
      loading={loading}
      error={error}
      evaluation={item.vote_average}
      genres={genres}
      ids={item.genre_ids}
      setCardRated={() => setCardRated(item, item.id)}
      changeValueRate={changeValueRate}
      idRate={item.rating}
    />
  ));

  return (
    <div className="movies">
      {RatedPagesAllCard}
      {noContent}
    </div>
  );
};

RatedPages.defaultProps = {
  rateCard: [],
  loading: true,
  error: false,
  genres: [],
  setCardRated: () => {},
  changeValueRate: () => {},
};

RatedPages.propTypes = {
  rateCard: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  genres: PropTypes.arrayOf(PropTypes.object),
  setCardRated: PropTypes.func,
  changeValueRate: PropTypes.func,
};

export default RatedPages;
