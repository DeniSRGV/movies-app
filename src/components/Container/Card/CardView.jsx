import React from 'react';

import PropTypes from 'prop-types';

import { Button, Descriptions, Rate } from 'antd';

import noImage from './no-image.png';

const EvaluationCard = function EvaluationCard({ evaluation }) {
  let clazzColor = 'card__evaluation';
  if (evaluation <= 3) {
    clazzColor += '	card__evaluation_red';
  } else if (evaluation > 3 && evaluation < 7) {
    clazzColor += ' card__evaluation_orange';
  } else {
    clazzColor += ' card__evaluation_green';
  }

  return <span className={clazzColor}>{evaluation}</span>;
};

const CardView = function CardView({ title, image, releaseDate, overview, evaluation, genres, ids }) {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const evaluationCard =
    evaluation === 0 || evaluation.length === 0 ? null : <EvaluationCard evaluation={evaluation} />;
  const filterG = genres.reduce((acc, el) => {
    if (ids.some((elemID) => elemID === el.id)) acc.push(el);
    return acc;
  }, []);

  const btnGenre = filterG.map((elem) => (
    <Button className="movies__button" type="button" key={elem.id}>
      {elem.name}
    </Button>
  ));
  return (
    <>
      <div className="card__img">
        <img src={image !== null ? imgUrl + image : noImage} alt="poster-img" width="100%" height="100%" />
      </div>
      <div className="card__body">
        <div className="card__header">
          <span className="card__title">{title}</span>
          {evaluationCard}
        </div>
        <div className="card__date">
          <Descriptions.Item label="Creation Time">{releaseDate}</Descriptions.Item>
        </div>
        <div className="card__genre">{genres !== 0 ? btnGenre : null}</div>
        <div className="card__text">
          <p>{overview.length === 0 ? 'there is no description' : `${overview.slice(0, 104)}...`}</p>
        </div>
        <div className="star">
          <Rate allowHalf count={10} />
        </div>
      </div>
    </>
  );
};

CardView.defaultProps = {
  title: 'absent title',
  overview: 'absent text',
  releaseDate: 'absent date',
  image: 'absent image',
  evaluation: '?',
  genres: '?',
  ids: '?',
};

CardView.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  image: PropTypes.node,
  evaluation: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.object),
  ids: PropTypes.arrayOf(PropTypes.number),
};

EvaluationCard.defaultProps = {
  evaluation: '?',
};
EvaluationCard.propTypes = {
  evaluation: PropTypes.number,
};
export default CardView;
