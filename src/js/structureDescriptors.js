const clickerButton = {
    name: "ClickerButton",
    price: (owned) => {
      return 3 + parseInt(Math.pow(1.5 * owned, 1.25)); 
    },
    img: ":)",
    owned: 1
  }
  
const generator = {
    name: "Generator",
    price: (owned) => {
        return 10 + parseInt(Math.pow(2.5 * owned, 1.5));
    },
    img: "G",
    owned: 0
};

const buffer = {
    name: "Buffer",
    price: (owned) => {
        return 15 + parseInt(Math.pow(3.5 * owned, 1.75));
    },
    img: "B",
    owned: 0,
    buffFunc: (val) => {
        return val * 2;
    },
    buffRange: 1
}

const clickBuffer = {
    name: "ClickBuffer",
    price: (owned) => {
        return 25 + parseInt(Math.pow(3.5 * owned, 1.85));
    },
    img: "CB",
    owned: 0,
    buffFunc: (val, parent) => {
        return val * parent.buffVal;
    },
    buffRange: 1
}

const luckyClicker = {
    name: "LuckyClicker",
    price: (owned) => {
        return 45 + parseInt(Math.pow(4.5 * owned, 2));
    },
    img: "LC",
    owned: 0
}

const structureRepresentations = [
    clickerButton,
    generator,
    buffer,
    clickBuffer,
    luckyClicker
];

export default structureRepresentations;