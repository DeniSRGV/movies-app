import React from 'react';
import PropTypes from 'prop-types';
import CardView from './CardView';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMesage';
import './Card.css';

const Card = function Card({
  title,
  image,
  releaseDate,
  overview,
  loading,
  error,
  evaluation,
  genres,
  ids,
  changeValueRate,
  idRate,
  id,
}) {
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <CardView
      title={title}
      image={image}
      releaseDate={releaseDate}
      overview={overview}
      evaluation={evaluation}
      genres={genres}
      ids={ids}
      changeValueRate={changeValueRate}
      idRate={idRate}
      id={id}
    />
  ) : null;

  return (
    <div className="card">
      {spinner}
      {content}
      {errorMessage}
    </div>
  );
};

Card.defaultProps = {
  title: 'absent title',
  overview: 'absent text',
  releaseDate: 'absent date',
  image: 'absent image',
  evaluation: 'absent evaluation',
  loading: true,
  error: false,
  genres: [],
  ids: [],
  changeValueRate: () => {},
  idRate: 0,
  id: 0,
};

Card.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  image: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  evaluation: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.object),
  ids: PropTypes.arrayOf(PropTypes.number),
  changeValueRate: PropTypes.func,
  idRate: PropTypes.number,
  id: PropTypes.number,
};
export default Card;
