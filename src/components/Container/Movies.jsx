import React from 'react'
import { Alert } from 'antd'

import PropTypes from 'prop-types'
import Card from './Card/Card'
import './Movies.css'
import NoContent from './Nocontent/NoContent'
import Spinner from './Spinner/Spinner'

const Movies = function Movies({
  moviesData,
  loading,
  error,
  genres,
  changeValueRate,
  tab,
  ratedMoviesData
}) {
  const createMovieCards = (movieArr) =>
    movieArr.map((item) => (
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
        changeValueRate={changeValueRate}
        idRate={item.rating}
      />
    ))

  const moviesElems =
    tab === '1' && !error
      ? createMovieCards(moviesData)
      : createMovieCards(ratedMoviesData)
  let noContent
  if (!loading && !error) {
    if (moviesData.length === 0) noContent = <NoContent />
  }
  const errorMessage = error ? (
    <Alert
      type="error"
      message="Sorry!"
      description="Error while downloading movies"
    />
  ) : null
  const spinner = loading ? <Spinner /> : null

  return (
    <div className="movies">
      {errorMessage}
      {moviesElems}
      {noContent}
      {spinner}
    </div>
  )
}

Movies.defaultProps = {
  moviesData: [],
  ratedMoviesData: [],
  loading: true,
  error: false,
  genres: [],
  changeValueRate: () => {},
  tab: '1'
}

Movies.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.object),
  ratedMoviesData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  genres: PropTypes.arrayOf(PropTypes.object),
  changeValueRate: PropTypes.func,
  tab: PropTypes.string
}

export default Movies
