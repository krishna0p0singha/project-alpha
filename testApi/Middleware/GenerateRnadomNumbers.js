function getNumbers(size, min, max) {
    const range = max - min + 1;
    if (size > range) {
        throw new Error("Size exceeds the range of unique numbers");
    }
    return Array.from(new Set(
        Array.from({ length: size * 2 }, () => Math.floor(Math.random() * range) + min)
    )).slice(0, size);
}

module.exports = { getNumbers };
