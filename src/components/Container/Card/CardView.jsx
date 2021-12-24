import React from "react";

import PropTypes from "prop-types";

import { Button, Descriptions} from "antd";

import noImage from './no-image.png'


const CardView = function CardView({title, image, releaseDate, overview })  {
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <>
        <div className='card__img'>
				<img src={image !== null ? imgUrl + image : noImage} alt='poster-img' width='100%' height='100%' />
			</div>
			<div className='card__body'>
				<div className="card__header"> 
					<span className='card__title' >{title}</span>
				</div>
				<div className="card__date">
					<Descriptions.Item label="Creation Time">{releaseDate}</Descriptions.Item>
				</div>
				<div>
					<Button className='movies__button' type='button' >Action</Button>
					<Button className='movies__button' type='button' >Ganre</Button>
				</div>
				<div className="card__text">
					<p>{`${overview.slice(0, 104)}...`}</p>
				</div>
				<div className='star'/>
			</div>
            </>
    )
}
CardView.defaultProps = {
    title: "absent title",
    overview: 'absent text',
    releaseDate: 'absent date',
    image: 'absent image',
    
}

CardView.propTypes = {
    title: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    image: PropTypes.node,
}
export default CardView;