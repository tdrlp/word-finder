const randWords = require('random-words');

const MIN_WIDTH = 6;
const MAX_WIDTH = 50;
const GRID_DIRECTIONS = {
	UP: [-1, 0],
	DOWN: [1, 0],
	LEFT: [0, -1],
	RIGHT: [0, 1],
	'UP-LEFT': [-1, -1],
	'UP-RIGHT': [-1, 1],
	'DOWN-LEFT': [1, -1],
	'DOWN-RIGHT': [1, 1],
};

class Grid {
	/**
	 * @param {Number} width - width of the grid
	 * @param {Array} grid - 1D array of the grid (used if the grid has been generated before)
	 * @param {Object[]} words - array of all the words on the grid
	 */
	constructor(width, grid = null) {
		if (!width) throw new Error(`Width can't be missing.`);

		if (isNaN(width)) throw new Error('Width must be a number.');

		if (width < MIN_WIDTH)
			throw new Error(`Width can't be less than ${MIN_WIDTH}.`);

		if (width > MAX_WIDTH)
			throw new Error(`Width can't be more than ${MAX_WIDTH}`);

		this.width = width;
		this.size = Math.pow(width, 2);

		if (grid) {
			this.grid = [].concat(...grid); // ensures the grid is in 1D
			this.words = grid.words;
		} else {
			this.words = randWords({
				exactly: Math.floor(width + width / 2),
				maxLength: width,
			});
			this.grid = this.placeWordsOnGrid(
				[...this.words],
				[...new Array(this.size)]
			);
			if (!this.grid)
				throw new Error('Could not place words on the grid!');
			// the grid was successfuly filled with the words therefore now we need
			// to fill the empty cells with random characters
			else this.grid = this.fillEmptyGridCells();
		}
	}

	/**
	 * Converts a 1D grid to its 2D version based on the height and width of the grid.
	 */
	getGridIn2D() {
		const grid = [];
		for (let w = 0; w < this.width; w++) {
			grid[w] = [];
			for (let h = 0; h < this.width; h++) {
				grid[w].push(this.grid[this.getIndex(w, h)]);
			}
		}
		return grid;
	}

	/**
	 * Converts the row(y) and col(x) values on a 2D array to the index on a 1D array.
	 * @param {Number} row - the Y value on the 2D array
	 * @param {Number} col - the X value on the 2D array
	 */
	getIndex(row, col) {
		return col + row * this.width;
	}

	/**
	 * Converts an index on a 1D array to the (x, y) values on a 2D array.
	 * @param {Number} index - index on the 1D array version of the grid
	 */
	getPosition(index) {
		return [Math.floor(index / this.width), index % this.width];
	}

	/**
	 * Returns the direction in which the selection was made based on the start and end points
	 * @param {Object} from - the cell where the selection started
	 * @param {Object} to - the cell where the selection ended
	 */
	getSelectionDirection(from, to) {
		if (this.isVerticallyAligned(from, to)) {
			return from.row > to.row
				? GRID_DIRECTIONS.UP
				: GRID_DIRECTIONS.DOWN;
		} else if (this.isHorizontallyAligned(from, to)) {
			return from.col > to.col
				? GRID_DIRECTIONS.LEFT
				: GRID_DIRECTIONS.RIGHT;
		} else if (this.isDiagonallyAligned(from, to)) {
			if (from.col > to.col) {
				return from.row > to.row
					? GRID_DIRECTIONS['UP-LEFT']
					: GRID_DIRECTIONS['DOWN-LEFT'];
			}

			return from.row > to.row
				? GRID_DIRECTIONS['UP-RIGHT']
				: GRID_DIRECTIONS['DOWN-RIGHT'];
		}
	}

	/**
	 * Returns the word that was selected from where the selection started to where it ended
	 * @param {Object} from - the cell where the selection started
	 * @param {Object} to - the cell where the selection ended
	 */
	getWordBetweenIndexes(from, to) {
		const word = [];
		const [rowDelta, colDelta] = this.getSelectionDirection(from, to);
		const curr = { ...from };
		const last = { row: to.row + rowDelta, col: to.col + colDelta };
		while (curr.row !== last.row || curr.col !== last.col) {
			const index = this.getIndex(curr.row, curr.col);
			if (index > this.grid.length || index < 0) {
				break;
			}

			word.push(this.grid[index]);
			curr.row += rowDelta;
			curr.col += colDelta;
		}

		return word;
	}

	/**
	 * Checks if the grid is empty (there are no values in any of the cells).
	 */
	isEmpty() {
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i]) return false;
		}
		return true;
	}

	/**
	 * Checks if the position passed in is within the grid.
	 * @param {Number} row - the row (Y) position on the grid
	 * @param {Number} col - the column (X) position on the grid
	 */
	isValidIndex(row, col) {
		if (row < 0 || row >= this.width) return false;
		if (col < 0 || col >= this.width) return false;

		return true;
	}

	/**
	 * Check if the start and end indexes are vertically aligned.
	 * @param {Object} from - index of where the selection started
	 * @param {Object} to - index of where the selection ended
	 */
	isVerticallyAligned(from, to) {
		if (from.col === to.col) return true;

		return false;
	}

	/**
	 * Check if the start and end indexes are horizontally aligned.
	 * @param {Object} from - index of where the selection started
	 * @param {Object} to - index of where the selection ended
	 */
	isHorizontallyAligned(from, to) {
		if (from.row === to.row) return true;

		return false;
	}

	/**
	 * Check if the start and end indexes are diagonally aligned.
	 * @param {Object} from - index of where the selection started
	 * @param {Object} to - index of where the selection ended
	 */
	isDiagonallyAligned(from, to) {
		// we must take the absolute value in case the `to` > `col`
		if (Math.abs(from.row - to.row) === Math.abs(from.col - to.col))
			return true;

		return false;
	}

	/**
	 * Returns whether the selection made (from where it started and where it ended)
	 * is a valid selection
	 * @param {Object} from - the cell where the selection started
	 * @param {Object} to - the cell where the selection ended
	 */
	isValidSelection(from, to) {
		if (
			!this.isValidIndex(from.row, from.col) ||
			!this.isValidIndex(to.row, to.col)
		)
			return false;

		// vertically aligned if col is the same, horizontally aligned if row is the same
		if (
			this.isVerticallyAligned(from, to) ||
			this.isHorizontallyAligned(from, to)
		)
			return true;

		// diagonally aligned if diff is the same
		if (this.isDiagonallyAligned(from, to)) return true;

		return false;
	}

	/**
	 * With the list of words and the grid, we attempt to recursively place the words on the
	 * grid until we either successfully placed all words or we are out of positions to try
	 * @param {String[]} words - array of the words to be placed on the grid
	 * @param {Array} grid - the current grid where the next word should be attempted to be placed
	 */
	placeWordsOnGrid(words, grid) {
		let word = words.pop();
		// no more words in the list therefore all have been placed
		if (!word) return grid;

		const indexes = shuffle([...Array(this.size).keys()]);
		// loop through all the possible indexes in the grid
		while (indexes.length > 0) {
			const index = indexes.pop();

			const directions = shuffle(Object.keys(GRID_DIRECTIONS));
			// loop through all the possible directions
			while (directions.length > 0) {
				const direction = directions.pop();
				const gridWithWord = this.tryPlacingWord(
					word,
					grid,
					index,
					direction
				);

				// placing the word was not successful therefore attempt the next direction
				if (!gridWithWord) continue;

				const newGrid = this.placeWordsOnGrid(words, gridWithWord);

				// check if the grid was successfuly filled
				if (newGrid) return newGrid;
			}
		}

		// failed to place word so pushing it back before returning
		words.push(word);
		return null;
	}

	/**
	 * Fill the empty cells on the grid with random characters
	 */
	fillEmptyGridCells() {
		return this.grid.map(
			(cell) =>
				cell || String.fromCharCode(Math.floor(Math.random() * 25 + 97))
		);
	}

	/**
	 * Attempts to place a word on the grid, at the position given and in the direction given
	 * @param {String} word - the word that should be attempted to be placed
	 * @param {Array} grid - the grid on which the word should be attempted to be placed on
	 * @param {Number} index - the position at which the word should start
	 * @param {String} direction - the direction in which the word should go
	 */
	tryPlacingWord(word, grid, index, direction) {
		const gridCopy = [...grid];
		let [row, col] = this.getPosition(index);
		const [rowDelta, colDelta] = GRID_DIRECTIONS[direction];
		const letters = word.split('');

		while (row >= 0 === row < this.width && col >= 0 === col < this.width) {
			// get the next letter in the word. exit loop if no more letters
			const letter = letters.shift();
			if (!letter) break;

			// if the current index has no value or the value is the same letter as
			// the current letter that needs to be placed, place letter and move
			if (!gridCopy[index] || gridCopy[index] === letter) {
				gridCopy[index] = letter;
				row += rowDelta;
				col += colDelta;
				index = this.getIndex(row, col);
			}
			// letter cannot be placed therefore return
			else return null;
		}

		// return the new grid if all letters have been placed
		return letters.length === 0 ? gridCopy : null;
	}
}

/**
 * Shuffle an array. Places elements in random order
 * @param {Array} array - the array to be shuffled
 */
const shuffle = (array) => {
	const arrayCopy = [...array];
	for (i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = arrayCopy[i];
		arrayCopy[i] = arrayCopy[j];
		arrayCopy[j] = temp;
	}
	return arrayCopy;
};

module.exports = Grid;
