import React, { useState } from 'react';
import Grid from '../Grid/Grid';
import Words from '../Words/Words';
import './Game.css';

const Game = () => {
	const [words, setWords] = useState([]);
	const [grid, setGrid] = useState({
		width: 0,
		size: 0,
		gridIn2D: [],
	});

	return (
		<div className='game-wrapper'>
			<Grid
				grid={grid}
				setGrid={setGrid}
				words={words}
				setWords={setWords}
			/>
			<Words words={words} />
		</div>
	);
};

export default Game;
