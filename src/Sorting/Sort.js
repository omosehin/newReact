import React from 'react'
import Button from './Button'
export const Sort = ({ sortKey, onSort, children }) =>
<Button onClick={() => onSort(sortKey)}>
{children}
</Button>