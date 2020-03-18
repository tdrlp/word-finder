const _ = require('./ExtraMethods');

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.stack = [];
        this.moves = [
            'UP',
            'DOWN',
            'LEFT',
            'RIGHT',
            'UP-LEFT',
            'UP-RIGHT',
            'DOWN-LEFT',
            'DOWN-RIGHT'
        ];
        this.map = this.generateMap(width, height);
    }

    generateEmptyMap(width, height) {
        let map = [];
        for (let w = 0; w < width; w++) {
            map[w] = [];
            for (let h = 0; h < height; h++) {
                map[w][h] = '';
            }
        }

        return map;
    }

    fillMap(words) {
        if (words.length === 0) {
            return this.state.pop().map || generateEmptyMap(); // change to return the latest map in stack
        }

        const word = words.pop();
        const randMoves = _.shuffle(this.moves);
        const randIndexes = _.shuffle([
            ...Array(this.width * this.height).keys()
        ]);

        const stateLength = this.state.length;
        for (const move in randMoves) {
            for (const index in randIndexes) {
                const newMap = this.fitWord(index, word, this.map, move);
                // check if blank map was returned
                if (newMap.length !== 0) {
                    this.state.push({ map: newMap });
                    fillMap(words);
                    break;
                }
            }
        }
    }

    fitWord(index, word, map, direction) {
        const [x, y] = this.calcXY(index);
        const [xChange, yChange] = calcDirectionChange(direction);
        const mapCopy = [...this.map];
        const chars = [...word];
        for (const char in chars) {
            if (mapCopy[x][y] === '' || mapCopy[x][y] === char) {
                mapCopy[x][y] = char;
                x += xChange;
                y += yChange;
            } else {
                return [];
            }
        }

        return mapCopy;
    }

    calcIndex(x, y) {
        return y + x * this.width;
    }

    calcXY(index) {
        return [Math.floor(index / this.width), index % this.width];
    }

    calcDirectionChange(direction) {
        const getArrayDirection = direction => {
            switch (direction) {
                case 'UP':
                    return [-1, 0];
                case 'DOWN':
                    return [1, 0];
                case 'LEFT':
                    return [0, -1];
                case 'RIGHT':
                    return [0, 1];
                default:
                    return [0, 0];
            }
        };

        const [xChange, yChange] = [0, 0];
        move.split('-').forEach(direction => {
            const [x, y] = getArrayDirection(direction);
            xChange += x;
            yChange += y;
        });
        return [xChange, yChange];
    }
}

module.exports = Map;
