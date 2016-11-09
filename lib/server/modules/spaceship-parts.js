var spaceshipParts = [
  {
    id: 6374,
    name: "Engine",
    needed: getRandomInt(3, 9),
    inStock: getRandomInt(8, 99)
  },
  {
    id: 6377,
    name: "Landing Leg",
    needed: getRandomInt(3, 10),
    inStock: getRandomInt(8, 97)
  },
  {
    id: 6984,
    name: "First Stage",
    needed: 1,
    inStock: getRandomInt(3, 9)
  },
  {
    id: 8374,
    name: "Second Stage",
    needed: 1,
    inStock: getRandomInt(1, 90)
  },
  {
    id: 9394,
    name: "Guide Fins",
    needed: 4,
    inStock: getRandomInt(1, 60)
  }
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = spaceshipParts;
