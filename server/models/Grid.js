const GridBase = require('../../common/models/Grid');
const randWords = require('random-words');

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

class Grid extends GridBase {
	constructor(width, height, grid = null) {
		super(width, height, grid);

		const biggerSide = height > width ? height : width;
		this.words = randWords({
			min: biggerSide,
			max: biggerSide,
			maxLength: Math.floor(biggerSide / 2),
		});

		this.grid = this.placeWordsOnGrid([...this.words], [...this.grid]);
		if (!this.grid) throw new Error('Could not place words on the grid!');
	}

	placeWordsOnGrid(words, grid) {
		let word = words.pop();
		// no more words in the list therefore all have been placed
		if (!word) return grid;

		const indexes = shuffle([...Array(this.width * this.height).keys()]);
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

		// failed to place word so pushing it back and trying again
		words.push(word);
		return null;
	}

	tryPlacingWord(word, grid, index, direction) {
		const gridCopy = [...grid];
		let [row, col] = this.getPosition(index);
		const [rowDelta, colDelta] = GRID_DIRECTIONS[direction];
		const letters = word.split('');

		while (
			row >= 0 === row < this.height &&
			col >= 0 === col < this.width
		) {
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
