class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.map = this.generateMap(width, height);
    }

    generateMap(width, height) {
        let map = [];
        for (let w = 0; w < width; w++) {
            map[w] = [];
            for (let h = 0; h < height; h++) {
                map[w][h] = '';
            }
        }

        return map;
    }

    calcIndex(x, y) {
        return y + x * this.width;
    }

    calcXY(index) {
        return [Math.floor(index / this.width), index % this.width];
    }
}

module.exports = Map;
