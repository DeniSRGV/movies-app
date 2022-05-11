import React from 'react'
import PropTypes from 'prop-types'
import './SearchInput.css'

const SearchInput = function SearchInput({ inputSearch, querySearch }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        defaultValue={querySearch === 'return' ? null : querySearch}
        placeholder="Type to search..."
        onChange={inputSearch}
      />
    </div>
  )
}

SearchInput.defaultProps = {
  inputSearch: () => {},
  querySearch: ''
}

SearchInput.propTypes = {
  inputSearch: PropTypes.func,
  querySearch: PropTypes.string
}
export default SearchInput
