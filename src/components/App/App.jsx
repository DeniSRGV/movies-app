import React, { Component } from 'react'
import { debounce } from 'lodash'
import Movies from '../Movies'
import MovieDB from '../../services/MovieDB'
import Header from '../Header/Header'
import SearchInput from '../Header/Search/SearchInput'
import Paginations from '../Footer/Paginations'

import './App.css'

class App extends Component {
  MovieService = new MovieDB()

  state = {
    moviesData: [],
    ratedMoviesData: [],
    pages: 1,
    genres: [],
    sessionId: 1,
    rate: false,
    tab: '1',
    querySearch: 'return',
    process: 'loading'
  }

  inputSearch = debounce((event) => {
    this.setState({
      querySearch: event.target.value
    })
    this.handleProcess('loading')
    const { querySearch } = this.state
    this.MovieService.getMovies(querySearch)
      .then((elem) => {
        this.setState({
          moviesData: [...elem.results],
          pages: 1,
          rate: false
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))
  }, 600)

  componentDidMount() {
    this.updateMovie()
    this.getGenres()
    this.getNewGuestSession()
  }

  getNewGuestSession = () => {
    this.MovieService.getGuestSessionNew()
      .then((result) => {
        this.setState({
          sessionId: result
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))
  }

  changeValueRate = (event, id) => {
    const { sessionId } = this.state
    this.MovieService.postRate(event, id, sessionId).catch(() =>
      this.handleProcess('error')
    )
  }

  getGenres = () => {
    this.MovieService.getGenres()
      .then((elem) => {
        this.setState({
          genres: [...elem]
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))
  }

  changePagination = (page) => {
    const { querySearch } = this.state

    this.MovieService.getPage(querySearch, page)
      .then((elem) => {
        this.setState({
          moviesData: [...elem.results],
          pages: page
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  updateRateCard = () => {
    const { sessionId } = this.state

    this.MovieService.getMoviesGuestSession(sessionId)
      .then((item) => {
        this.setState({
          ratedMoviesData: [...item],
          rate: true
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))
  }

  handleProcess = (process) => {
    this.setState({
      process
    })
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
          rate: false
        })
      })
      .then(() => this.handleProcess('confirmed'))
      .catch(() => this.handleProcess('error'))
  }

  render() {
    const {
      moviesData,
      error,
      pages,
      genres,
      querySearch,
      rate,
      tab,
      ratedMoviesData,
      process
    } = this.state
    const searchInput =
      tab === '1' ? (
        <SearchInput inputSearch={this.inputSearch} querySearch={querySearch} />
      ) : null

    return (
      <div className="App">
        <Header
          handleTabs={this.handleTabs}
          rate={rate}
          updateRateCard={this.updateRateCard}
          tab={tab}
        />
        {searchInput}

        <Movies
          process={process}
          moviesData={moviesData}
          error={error}
          genres={genres}
          changeValueRate={this.changeValueRate}
          tab={tab}
          ratedMoviesData={ratedMoviesData}
        />

        {tab === '1' && process === 'confirmed' ? (
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
