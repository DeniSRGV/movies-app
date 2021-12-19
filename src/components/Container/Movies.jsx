import React  from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card";
import './Movies.css'

const Movies = function({ moviesData })  {
	
	Movies.defaultProps = {
		moviesData: [],
	}

	Movies.propTypes = {
		moviesData: PropTypes.arrayOf(PropTypes.object),
	}
	
	const moviesAllCard = moviesData.map(item => (
			<Card {...item}
				key={item.id}
				image={item.poster_path}
				title={item.original_title}
				releaseDate={item.release_date}
				overview={item.overview}
				
			/>
		)
	)

	return (
		<div className='movies' >
			{moviesAllCard}
		</div>
	)
	
}

export default Movies