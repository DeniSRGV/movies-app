import React, { Component } from 'react';
import { debounce } from 'lodash';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import Spinner from '../Container/Spinner/Spinner';
import Header from '../Container/Header/Header';
import SearchInput from '../Container/Header/Search/SearchInput';
import './App.css';
import Paginations from '../Container/Footer/Paginations';

class App extends Component {
  MovieService = new MovieDB();

  state = {
    moviesData: [],
    loading: true,
    error: false,
    pages: 1,
    genres: [],
    sessionId: '',
    rate: false,
  };

  inputSearch = debounce((event) => {
    const target = event.target.value;
    this.MovieService.getMovies(target)
      .then((elem) => {
        this.setState({
          moviesData: [...elem.results],
          loading: false,
          pages: 1,
          rate: false,
        });
      })
      .catch(this.onError);
  }, 600);

  componentDidMount() {
    this.updateMovie();
    this.getGenres();
    this.getNewGuestSession();
  }

  getNewGuestSession = () => {
    this.MovieService.getGuestSessionNew()
      .then((result) => {
        this.setState({
          sessionId: result,
          loading: false,
        });
      })
      .catch(this.onError);
  };

  changeValueRate = (event, id) => {
    const { sessionId } = this.state;
    this.MovieService.postRate(event, id, sessionId).catch(this.anError);
  };

  getGenres = () => {
    this.MovieService.getGenres()
      .then((elem) => {
        this.setState({
          genres: [...elem],
        });
      })
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  changePagination = (page) => {
    this.MovieService.getPage(page)
      .then((elem) => {
        this.setState({
          moviesData: [...elem],
          loading: false,
          pages: page,
        });
      })
      .catch(this.onError);
  };
  // 2

  updateRateCard = () => {
    const { sessionId } = this.state;

    this.MovieService.getMoviesGuestSession(sessionId)
      .then((item) => {
        this.setState({
          moviesData: [...item],
          loading: false,
          rate: true,
        });
      })
      .catch(this.onError);
  };
  // 1

  updateMainCard = () => {
    this.MovieService.getMovies()
      .then((item) => {
        this.setState({
          moviesData: [...item.results],
          loading: false,
          rate: false,
        });
      })
      .catch(this.onError);
  };

  updateMovie() {
    this.MovieService.getMovies()
      .then((item) => {
        this.setState({
          moviesData: [...item.results],
          loading: false,
          rate: false,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { moviesData, loading, error, pages, genres, rate } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const searchInput = !rate ? <SearchInput inputSearch={this.inputSearch} /> : null;

    return (
      <div className="App">
        <Header updateMainCard={this.updateMainCard} rate={rate} updateRateCard={this.updateRateCard} />
        {searchInput}
        {spinner}

        <Movies
          moviesData={moviesData}
          loading={loading}
          error={error}
          genres={genres}
          changeValueRate={this.changeValueRate}
        />

        <Paginations pages={pages} changePagination={this.changePagination} />
      </div>
    );
  }
}

export default App;
