/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { debounce } from 'lodash';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import Spinner from '../Container/Spinner/Spinner';
import Header from '../Container/Header/Header';
import RatedPages from '../pages/RatedPages';
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
    rateCard: [],
  };

  inputSearch = debounce((event) => {
    const target = event.target.value;
    this.MovieService.getMoviesRes(target)
      .then((elem) => {
        this.setState({
          moviesData: [...elem],
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
    this.setNewGuestSession();
  }

  setNewGuestSession = () => {
    this.MovieService.getGuestSessionNew()
      .then((result) => {
        this.setState({
          sessionId: result,
          loading: false,
        });
      })
      .catch(this.onError);
  };
  // 2

  updateCardGuest = () => {
    const { sessionId } = this.state;
    this.MovieService.getMoviesGuestSession(sessionId)
      .then((res) => {
        this.setState({
          loading: false,
          moviesData: [...res],
          pages: 1,
          rate: true,
        });
      })
      .catch(this.onError);
  };

  setCardRated = (obj, id) => {
    this.setState(({ rateCard }) => ({
      rateCard: [...rateCard.filter((el) => el.id !== id), obj],
    }));
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

  onCharLoading = () => {
    this.setState({
      loading: true,
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

  updateMainCard() {
    this.MovieService.getMoviesRes()
      .then((item) => {
        this.setState({
          moviesData: [...item],
          loading: false,
          rate: false,
        });
      })
      .catch(this.onError);
  }

  updateMovie() {
    this.onCharLoading();
    this.MovieService.getMoviesRes()
      .then((item) => {
        this.setState({
          moviesData: [...item],
          loading: false,
          rate: false,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { moviesData, loading, error, pages, genres, rate, rateCard } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const searchInput = !rate ? <SearchInput inputSearch={this.inputSearch} /> : null;

    return (
      <Router>
        <div className="App">
          <Header updateCard={this.updateCardGuest} rate={rate} mainCard={this.updateMainCard} />
          {searchInput}
          {spinner}
          <Routes>
            <Route
              path="/"
              element={
                <Movies
                  moviesData={moviesData}
                  loading={loading}
                  error={error}
                  genres={genres}
                  setCardRated={this.setCardRated}
                  changeValueRate={this.changeValueRate}
                />
              }
            />
            <Route
              path="/rated"
              element={
                <RatedPages
                  rateCard={rateCard}
                  loading={loading}
                  error={error}
                  genres={genres}
                  setCardRated={this.setCardRated}
                  changeValueRate={this.changeValueRate}
                />
              }
            />
          </Routes>
          <Paginations pages={pages} changePagination={this.changePagination} />
        </div>
      </Router>
    );
  }
}

export default App;
