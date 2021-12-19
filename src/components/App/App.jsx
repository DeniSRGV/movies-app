import React, {Component} from 'react';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import './App.css';


class App extends Component {
  MovieService = new MovieDB();

  state = {
		moviesData: [],
	};

	componentDidMount() {

		this.updateMovie();
    
	}

	updateMovie() {
		this.MovieService.getAllMovies().then((item) => {
				this.setState({
					moviesData: [...item],
				})
        
		})
};

  render(){
	  const {moviesData} = this.state
    return (
      <div className="App">
        <Movies moviesData={moviesData}/>
      </div>
    );
  }
}

export default App;
