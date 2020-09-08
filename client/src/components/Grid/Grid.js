import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Row from './Row';
import SelectionLines from '../SelectionLines/SelectionLines';
import './Grid.css';

const CELL_SIZE = 50;

const getCell = (x, y, offset) => {
	return {
		row: Math.floor((y - offset.top) / CELL_SIZE),
		col: Math.floor((x - offset.left) / CELL_SIZE),
	};
};

const getCellCentre = ({ row, col }, offset) => {
	return {
		x: col * CELL_SIZE + CELL_SIZE / 2 + offset.left,
		y: row * CELL_SIZE + CELL_SIZE / 2 + offset.top,
	};
};

const Grid = ({ grid, setGrid, words, setWords }) => {
	const [mouseDown, setMouseDown] = useState(false);
	const [fromCell, setFromCell] = useState({ from: null, to: null });
	const [toCell, setToCell] = useState({ from: null, to: null });
	const [selectionLines, setSelectionLines] = useState([]);
	const [gridOffset, setGridOffset] = useState(null);
	const gridRef = useRef(null);

	useLayoutEffect(() => {
		setGridOffset(gridRef.current.getBoundingClientRect());
	}, []);

	useEffect(() => {
		axios
			.get(`${process.env.API_HOST || ''}/api/grid/new?width=15`)
			.then((res) => {
				setGrid(res.data.grid);
				setWords(res.data.words);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const lines = _(words)
			.filter((word) => word.isSelected)
			.map((word) => {
				return {
					from: getCellCentre(word.fromCell, gridOffset),
					to: getCellCentre(word.toCell, gridOffset),
				};
			})
			.valueOf();
		setSelectionLines(lines);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [words]);

	const mouseDownHandler = (e) => {
		if (e.button === 2 || (e.nativeEvent && e.nativeEvent.which === 2)) {
			return;
		}

		const cell = getCell(e.pageX, e.pageY, gridOffset);

		setMouseDown(true);
		setFromCell(cell);
		setToCell(cell);
	};

	const mouseMoveHandler = (e) => {
		if (!mouseDown) {
			return;
		}

		setToCell(getCell(e.pageX, e.pageY, gridOffset));
	};

	const mouseUpHandler = (e) => {
		if (!mouseDown) {
			return;
		}

		axios
			.post(`${process.env.API_HOST || ''}/api/grid/select`, {
				words,
				grid,
				selection: {
					fromCell,
					toCell,
				},
			})
			.then((res) => {
				if (res.data.isValidWord) {
					setWords(res.data.words);
				}

				setMouseDown(false);
				setFromCell({ from: null, to: null });
				setToCell({ from: null, to: null });
			});
	};

	return (
		<div ref={gridRef} className='grid-wrapper'>
			{gridOffset && (
				<SelectionLines
					lines={selectionLines}
					activeLine={{
						from: getCellCentre(fromCell, gridOffset),
						to: getCellCentre(toCell, gridOffset),
					}}
				/>
			)}
			<table
				onMouseDown={(e) => mouseDownHandler(e)}
				onMouseMove={(e) => mouseMoveHandler(e)}
				onMouseUp={(e) => mouseUpHandler(e)}
			>
				<tbody>
					{grid.gridIn2D.map((row, i) => (
						<Row key={i} row={row} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Grid;
