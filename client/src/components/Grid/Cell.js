import React from 'react';
import './Cell.css';

const Cell = ({ children }) => {
	return <td className='cell noselect'>{children}</td>;
};

export default Cell;
