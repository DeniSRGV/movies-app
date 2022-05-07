/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import CardView from './CardView'
import './Card.css'

const Card = function Card(props) {
  return (
    <div className="card">
      <CardView {...props} />
    </div>
  )
}

export default Card
