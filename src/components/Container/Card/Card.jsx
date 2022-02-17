import React from 'react';
import PropTypes from 'prop-types';
import CardView from './CardView';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMesage';
import './Card.css';

const Card = function Card({ title, image, releaseDate, overview, loading, error }) {
  const errorMesage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <CardView title={title} image={image} releaseDate={releaseDate} overview={overview} />
  ) : null;

  return (
    <div className="card">
      {spinner}
      {content}
      {errorMesage}
    </div>
  );
};

Card.defaultProps = {
  title: 'absent title',
  overview: 'absent text',
  releaseDate: 'absent date',
  image: 'absent image',
  loading: true,
  error: false,
};

Card.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  image: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};
export default Card;
