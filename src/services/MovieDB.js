class MovieDB {

	apiBase = `http://api.themoviedb.org/3/`;

     _apiKey = '46bcbac1fd2d720b1834167c094b6a96';

	value = '';
	 
     

	urlSearch = `search/movie/?api_key=${this._apiKey}&query=`


	async getSearchMovie(url) {
		const res = await fetch(`${this.apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`)
		}
		return  res.json()
	};

	async getMovies(inputValue, page =1) {
		this.value = inputValue;
		const res = await this.getSearchMovie(`${this.urlSearch}${!inputValue ? "return" : inputValue}&page=${page}`)
		return res
	}

	

	async getPage(page) {
		const firstPage = await this.getMoviesRes(this.value, page);
		return firstPage;
	}

	async getGenres() {
		const genres = await this.getSearchMovie(`genre/movie/list?api_key=${this._apiKey}&language=en-US`);
		return genres.genres;
	}

	async getGuestSessionNew() {
		const guestSession = await this.getSearchMovie(`authentication/guest_session/new?api_key=${this._apiKey}`);
		return guestSession.guest_session_id;
	};

	async getMoviesGuestSession (id){
		const res = await this.getSearchMovie(`guest_session/${id}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc`)
		return res.results;
	}

	async postRate(event, id, sessionId) {
		const data = {
			"value": event
		};
		const rate =
			await fetch(`${this.apiBase}movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
				{ 
				method: "POST", 
				body: JSON.stringify(data), 
				headers: { 'Content-Type': 'application/json' } });
		
		return rate;
	};

}
export default MovieDB;