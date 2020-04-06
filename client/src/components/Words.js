import React from 'react';

const Words = (props) => {
	const style = {
		float: 'left',
		width: '100px',
		marginTop: '50px',
	};

	return (
		<div style={style}>
			<h3>Words:</h3>
			{props.words.map((word, i) => (
				<div key={i}>{word}</div>
			))}
		</div>
	);
};

export default Words;
