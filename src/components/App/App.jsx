import React, { Component } from 'react'
import { debounce } from 'lodash'
import Movies from '../Container/Movies'
import MovieDB from '../../services/MovieDB'
import Header from '../Container/Header/Header'
import SearchInput from '../Container/Header/Search/SearchInput'
import Paginations from '../Container/Footer/Paginations'

import './App.css'
import Spinner from '../Container/Spinner/Spinner'

class App extends Component {
  MovieService = new MovieDB()

  state = {
    moviesData: [],
    ratedMoviesData: [],
    loading: true,
    error: false,
    pages: 1,
    genres: [],
    sessionId: 1,
    rate: false,
    tab: '1',
    querySearch: 'return'
  }

  inputSearch = debounce((event) => {
    this.setState({
      querySearch: event.target.value
    })
    const { querySearch } = this.state

    this.MovieService.getMovies(querySearch)
      .then((elem) => {
        this.setState({
          moviesData: [...elem.results],
          loading: false,
          pages: 1,
          rate: false
        })
      })
      .catch(this.onError)
  }, 600)

  componentDidMount() {
    this.updateMovie()
    this.getGenres()
    this.getNewGuestSession()
  }

  componentDidCatch() {
    this.onError()
  }

  getNewGuestSession = () => {
    this.MovieService.getGuestSessionNew()
      .then((result) => {
        this.setState({
          sessionId: result,
          loading: false
        })
      })
      .catch(this.onError)
  }

  changeValueRate = (event, id) => {
    const { sessionId } = this.state
    this.MovieService.postRate(event, id, sessionId).catch(this.anError)
  }

  getGenres = () => {
    this.MovieService.getGenres()
      .then((elem) => {
        this.setState({
          genres: [...elem]
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  changePagination = (page) => {
    const { querySearch } = this.state

    this.MovieService.getPage(querySearch, page)
      .then((elem) => {
        this.setState({
          moviesData: [...elem.results],
          loading: false,
          pages: page
        })
      })
      .catch(this.onError)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  // 2

  updateRateCard = () => {
    const { sessionId } = this.state

    this.MovieService.getMoviesGuestSession(sessionId)
      .then((item) => {
        this.setState({
          ratedMoviesData: [...item],
          loading: false,
          rate: true
        })
      })
      .catch(this.onError)
  }

  handleTabs = (event) => {
    this.setState({ tab: event.key })
  }

  updateMovie = () => {
    const { querySearch } = this.state

    this.MovieService.getMovies(querySearch)
      .then((item) => {
        this.setState({
          moviesData: [...item.results],
          loading: false,
          rate: false
        })
      })
      .catch(this.onError)
  }

  render() {
    const {
      moviesData,
      loading,
      error,
      pages,
      genres,
      rate,
      tab,
      ratedMoviesData
    } = this.state
    const searchInput =
      tab === '1' ? <SearchInput inputSearch={this.inputSearch} /> : null

    return (
      <div className="App">
        <Header
          handleTabs={this.handleTabs}
          rate={rate}
          updateRateCard={this.updateRateCard}
          tab={tab}
        />
        {searchInput}

        {loading ? (
          <Spinner />
        ) : (
          <Movies
            moviesData={moviesData}
            loading={loading}
            error={error}
            genres={genres}
            changeValueRate={this.changeValueRate}
            tab={tab}
            ratedMoviesData={ratedMoviesData}
          />
        )}

        {tab === '1' && !error ? (
          <Paginations
            pages={pages}
            changePagination={this.changePagination}
            moviesData={moviesData}
          />
        ) : null}
      </div>
    )
  }
}

export default App
