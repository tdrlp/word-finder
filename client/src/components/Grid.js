import React from 'react';
import Row from './Row';
// const GridBase = require('../common/models/Grid.js');

const Grid = (props) => {
	const style = {
		float: 'left',
		border: '3px solid black',
		margin: '50px',
	};

	return (
		<div style={style}>
			<table>
				<tbody>
					{props.grid.values.map((row, i) => (
						<Row key={i} row={row} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Grid;
