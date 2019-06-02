import React from 'react'
import PropTypes from 'prop-types'

const Search =({ value, onChange,onSubmit,children,disabled})=><form onSubmit = {onSubmit}>
          {children}
          <input
            type="text"
            value={value}
            onChange={onChange} 
            disabled ={disabled}          
          />
          <button type ="submit">
            {children}
          </button>
        </form>

        Search.propTypes = {
          value:PropTypes.string,
          onChange:PropTypes.func,
          onSubmit:PropTypes.func,
          children:PropTypes.node,
          disabled:PropTypes.string
        }
        export default Search