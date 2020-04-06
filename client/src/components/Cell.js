import React from 'react';

const Cell = (props) => {
	const style = {
		padding: '5px',
		margin: '5px',
		border: '1px solid black',
		width: '50px',
		height: '50px',
		textAlign: 'center',
	};

	return <td style={style}>{props.children}</td>;
};

export default Cell;
