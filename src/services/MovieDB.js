class MovieDB {

     _apiKey = '46bcbac1fd2d720b1834167c094b6a96';

     _apiBase = 'https://api.themoviedb.org/3/';

	value = '';
	 
     

	urlSearch = `search/movie/?api_key=${this._apiKey}&query=`


	async getSearchMovie(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`)
		}
		return  res.json()
	};

	async getMovies(inputValue, page) {
		const res = await this.getSearchMovie(`${this.urlSearch}${!inputValue ? "return" : inputValue}&page=${page}`)
		return res
	}

	async getMoviesRes(inputValue, page) {
		const res = await this.getMovies(inputValue, page)
		return res.results
	}

	async getPage(page) {
		const firstPage = await this.getMoviesRes(this.value, page);
		return firstPage;
	}

	

}
export default MovieDB;