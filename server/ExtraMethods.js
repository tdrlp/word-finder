class ExtraMethods {
    static shuffle(array) {
        const arrayCopy = [...array];
        for (i = arrayCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = arrayCopy[i];
            arrayCopy[i] = arrayCopy[j];
            arrayCopy[j] = temp;
        }
        return arrayCopy;
    }
}

module.exports = ExtraMethods;
