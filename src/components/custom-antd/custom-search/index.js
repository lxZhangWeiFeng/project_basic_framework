import React from 'react'
import Search from './search'
import SearchOption from './search-option'

const SearchComponent = ({ showOption = false, ...props }) => {
    return showOption ? <SearchOption {...props} /> : <Search {...props} />
}

export default SearchComponent
