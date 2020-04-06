import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Words from './components/Words';

const App = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [grid, setGrid] = useState({
		height: undefined,
		width: undefined,
		values: [],
	});
	const [words, setWords] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/grid/new?width=10&height=10')
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setGrid(result.grid);
					setWords(result.words);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	let content;
	if (error) {
		content = <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		content = <div>Loading...</div>;
	}

	return (
		<div>
			<Grid grid={grid}>{content || null}</Grid>
			<Words words={words}></Words>
		</div>
	);
};

export default App;
