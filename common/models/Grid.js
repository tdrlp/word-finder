const MAX_WIDTH = 5;
const MAX_HEIGTH = 5;

class Grid {
	constructor(width, height, grid = null) {
		console.log(width);
		console.log(height);
		console.log('\n');
		if (!width || !height || width < MAX_WIDTH || height < MAX_HEIGTH)
			throw new Error(`Width/Height canno't be less than ${MAX_WIDTH}.`);

		this.width = width;
		this.height = height;
		this.size = width * height;
		this.grid = grid || new Array(width * height);
	}

	createEmptyGrid(width, height) {
		let grid = [];
		for (let w = 0; w < width; w++) {
			grid[w] = [];
			for (let h = 0; h < height; h++) {
				grid[w][h] = null;
			}
		}
		return grid;
	}

	get2Dgrid() {
		const grid = [];
		for (let w = 0; w < this.width; w++) {
			grid[w] = [];
			for (let h = 0; h < this.height; h++) {
				row.push(
					this.grid[this.getIndex(w, h)]
						? this.grid[this.getIndex(w, h)]
						: ' '
				);
			}
		}
		return grid;
	}

	getIndex(row, col) {
		return col + row * this.width;
	}

	getPosition(index) {
		return [Math.floor(index / this.width), index % this.width];
	}

	isEmpty() {
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i]) return false;
		}
		return true;
	}
}

module.exports = Grid;
