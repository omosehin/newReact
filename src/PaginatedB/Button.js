import React from 'react'
function Button ({onClick,className="",children,disabled}) {
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

    export default Button