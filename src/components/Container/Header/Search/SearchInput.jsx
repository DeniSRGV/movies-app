import React from 'react'
import PropTypes from 'prop-types'
import './SearchInput.css'

const SearchInput = function SearchInput({ inputSearch }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Type to search..."
        onChange={inputSearch}
      />
    </div>
  )
}

SearchInput.defaultProps = {
  inputSearch: () => {}
}

SearchInput.propTypes = {
  inputSearch: PropTypes.func
}
export default SearchInput
