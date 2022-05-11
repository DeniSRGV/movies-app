import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'

import './Paginations.css'

const Paginations = function Paginations({
  pages,
  changePagination,
  moviesData
}) {
  const pagination = moviesData?.length !== 0 && (
    <Pagination
      defaultCurrent={pages}
      size="small"
      current={pages}
      total={50}
      onChange={changePagination}
    />
  )
  return <div className="pagination">{pagination}</div>
}

Paginations.defaultProps = {
  pages: 1,
  changePagination: () => {},
  moviesData: []
}

Paginations.propTypes = {
  pages: PropTypes.number,
  changePagination: PropTypes.func,
  moviesData: PropTypes.arrayOf(PropTypes.object)
}
export default Paginations
