import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'
import CardView from './Card/CardView'
import NoContent from './Nocontent/NoContent'
import './Card/Card.css'
import './Movies.css'

import Spinner from './Spinner/Spinner'

function setProcess(process, elem, moviesData) {
  switch (process) {
    case 'loading':
      return <Spinner />
    case 'error':
      return (
        <Alert
          type="error"
          message="Sorry!"
          description="Error while downloading movies"
        />
      )
    case 'confirmed':
      return moviesData?.length === 0 ? <NoContent /> : elem
    default:
      return elem
  }
}

const Movies = function Movies({
  process,
  moviesData,
  genres,
  changeValueRate,
  tab,
  ratedMoviesData
}) {
  const createMovieCards = (movieArr) =>
    movieArr.map((item) => (
      <div className="card" key={item.id}>
        <CardView
          {...item}
          key={item.id}
          image={item.poster_path}
          title={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
          evaluation={item.vote_average}
          genres={genres}
          ids={item.genre_ids}
          changeValueRate={changeValueRate}
          idRate={item.rating}
        />
      </div>
    ))

  const moviesElems =
    tab === '1'
      ? createMovieCards(moviesData)
      : createMovieCards(ratedMoviesData)
  return (
    <div className="movies">{setProcess(process, moviesElems, moviesData)}</div>
  )
}

Movies.defaultProps = {
  moviesData: [],
  process: 'error',
  ratedMoviesData: [],
  genres: [],
  changeValueRate: () => {},
  tab: '1'
}

Movies.propTypes = {
  process: PropTypes.string,
  moviesData: PropTypes.arrayOf(PropTypes.object),
  ratedMoviesData: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.object),
  changeValueRate: PropTypes.func,
  tab: PropTypes.string
}

export default Movies
