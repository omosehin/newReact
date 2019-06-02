import React from 'react'
import PropTypes from 'prop-types'
function Button ({onClick,className,children,disabled}) {
    return (
          <button
            onClick={onClick}
            className={className}
            type="button"
            disabled ={disabled}
            >
            {children}
            </button>
        );
      
    }
    Button.propTypes = {
        onClick : PropTypes.func,
        disabled : PropTypes.bool,
        children:PropTypes.node,
    };

    Button.defaultProps = {
        className:''
    }

    export default Button