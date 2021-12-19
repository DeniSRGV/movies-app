

import React from "react";
import { Button, Descriptions} from "antd";
import PropTypes from "prop-types";
import noImage from './no-image.png'
import "./Card.css"

const posterUrl = "https://image.tmdb.org/t/p/w500";

const Card = function({ title, image, releaseDate, overview })  {

	

	return (
		
		<div className='card'>
			<div className='card-img'>
				<img src={image !== null ? posterUrl + image : noImage} alt='poster' width='100%' height='100%' />
			</div>
			<div className='card-body'>
				<div className="card-header"> 
					<span className='card__title' >{title}</span>
				</div>
				<div className="card-date">
					<Descriptions.Item label="Creation Time">{releaseDate}</Descriptions.Item>
				</div>
				<div>
					<Button className='movies__button' type='button' >Action</Button>
					<Button className='movies__button' type='button' >Ganre</Button>
				</div>
				<div className="card-text">
					<p>{`${overview.slice(0, 92)}...`}</p>
				</div>
				<div className='star'/>
			</div>
		</div>
		
	)
}
Card.defaultProps = {
    title: "absent title",
    overview: 'absent text',
    releaseDate: 'absent date',
    image: 'absent image',
    
}

Card.propTypes = {
    title: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    image: PropTypes.node,
}
export default Card