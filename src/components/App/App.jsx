import React, { Component } from 'react';
import { debounce } from 'lodash';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import Spinner from '../Container/Spinner/Spinner';
import Header from '../Container/Header/Header';
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
  };

  inputSearch = debounce((event) => {
    const target = event.target.value;
    this.MovieService.getMoviesRes(target)
      .then((elem) => {
        this.setState({
          moviesData: [...elem],
          loading: false,
          pages: 1,
        });
      })
      .catch(this.onError);
  }, 600);

  componentDidMount() {
    this.updateMovie();
    this.getGenres();
  }

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

  updateMovie() {
    this.onCharLoading();
    this.MovieService.getMoviesRes()
      .then((item) => {
        this.setState({
          moviesData: [...item],
          loading: false,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { moviesData, loading, error, pages, genres } = this.state;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className="App">
        <Header inputSearch={this.inputSearch} />
        {spinner}
        <Movies moviesData={moviesData} loading={loading} error={error} genres={genres} />
        <Paginations pages={pages} changePagination={this.changePagination} />
      </div>
    );
  }
}

export default App;
