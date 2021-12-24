import React, {Component} from 'react';
import Movies from '../Container/Movies';
import MovieDB from '../../services/MovieDB';
import Spinner from '../Container/Spinner/Spinner';

import './App.css';


class App extends Component {
  MovieService = new MovieDB();

  state = {
		moviesData: [],
		loading: true,
		error: false,
	};

	componentDidMount() {

		this.updateMovie();
    
	}

	onCharLoading = ()=>  {
        this.setState({
            loading: true
        })
		
    }

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		})
	}

	

	updateMovie() {
		this.onCharLoading()
		this.MovieService.getAllMovies().then((item) => {
				this.setState({
					moviesData: [...item],
					loading: false,
				})
        
		}).catch(this.onError)
};

  render(){
	  const {moviesData, loading, error} = this.state
	  if(loading){
		  return <Spinner/>
	  }
	   
    return (
      <div className="App">
        <Movies 
		moviesData={moviesData}
		loading={loading}
		error={error}
		/>
      </div>
    );
  }
}

export default App;
