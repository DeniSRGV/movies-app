import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import './Footer.css';

const Paginations = function Paginations({ pages, changePagination }) {
  return (
    <div className="pagination">
      <Pagination defaultCurrent={pages} size="small" current={pages} total={50} onChange={changePagination} />
    </div>
  );
};

Paginations.defaultProps = {
  pages: 1,
  changePagination: () => {},
};

Paginations.propTypes = {
  pages: PropTypes.number,
  changePagination: PropTypes.func,
};
export default Paginations;
