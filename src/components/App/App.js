import React, {Component} from 'react';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import './App.css';


class App extends Component {
  MovieService = new MovieDB();
  state = {
		moviesData: [],
	};

	componentMount() {
		this.updateMovie();
    
	}

	updateMovie() {
		this.MovieService.getMovies().then((item) => {
				this.setState({
					moviesData: [...item],
				})
        
		})
};
  render(){
    return (
      <div className="App">
        <Movies/>
      </div>
    );
  }
}

export default App;
