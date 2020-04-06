const MIN_WIDTH = 6;
const MIN_HEIGTH = 6;

class Grid {
	constructor(width, height, grid = null) {
		if (!width || !height || width < MIN_WIDTH || height < MIN_HEIGTH)
			throw new Error(`Width/Height canno't be less than ${MAX_WIDTH}.`);

		this.width = width;
		this.height = height;
		this.size = width * height;
		this.grid = grid || new Array(width * height);
	}

	getGridIn2D() {
		const grid = [];
		for (let w = 0; w < this.width; w++) {
			grid[w] = [];
			for (let h = 0; h < this.height; h++) {
				grid[w].push(this.grid[this.getIndex(w, h)]);
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
