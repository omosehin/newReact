import React from 'react'
const Search =({ value, onChange,onSubmit,children,disabled})=> 
        <form onSubmit = {onSubmit}>
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
        export default Search