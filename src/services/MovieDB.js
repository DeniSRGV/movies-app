class MovieDB {
     _apiKey = '46bcbac1fd2d720b1834167c094b6a96';
     _apiBase = 'https://api.themoviedb.org/3/'
     _apiQuery = 'return'

	urlSearch = `search/movie/?api_key=${this._apiKey}&query=${this._apiQuery}`


	async getSearchMovie(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`)
		}
		return  res.json()
	};

	async getAllMovies() {
		const res = await this.getSearchMovie(this.urlSearch)
		return res.results
	}

}
export default MovieDB;