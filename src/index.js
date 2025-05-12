class Pizza {
  static types = {
    margarita: { price: 500, calories: 300 },
    peperoni: { price: 800, calories: 400 },
    bavarskaya: { price: 700, calories: 450 },
  };

  static sizes = {
    small: { price: 100, calories: 100 },
    big: { price: 200, calories: 200 },
  };

  static toppings = {
    mozarella: {
      small: { price: 50, calories: 20 },
      big: { price: 50, calories: 20 },
    },
    cheeseBoard: {
      small: { price: 150, calories: 50 },
      big: { price: 300, calories: 50 },
    },
    moreCheese: {
      small: { price: 150, calories: 50 },
      big: { price: 300, calories: 50 },
    },
  };

  constructor(type, size) {
    if (!Pizza.types[type]) throw new Error("Неверный тип пиццы");
    if (!Pizza.sizes[size]) throw new Error("Неверный размер пиццы");
    this.type = type;
    this.size = size;
    this.toppings = [];
  }

  // Добавить добавку
  addTopping(topping) {
    if (!Pizza.toppings[topping]) throw new Error("Неверная добавка");
    if (!this.toppings.includes(topping)) this.toppings.push(topping);
  }

  // Убрать добавку
  removeTopping(topping) {
    this.toppings = this.toppings.filter((t) => t !== topping);
  }

  // Получить список добавок
  getToppings() {
    return this.toppings;
  }

  // Узнать размер пиццы
  getSize() {
    return this.size;
  }

  // Узнать вид пиццы
  getStuffing() {
    return this.type;
  }

  // Узнать цену
  calculatePrice() {
    const basePrice =
      Pizza.types[this.type].price + Pizza.sizes[this.size].price;
    const toppingsPrice = this.toppings.reduce((total, topping) => {
      const top = Pizza.toppings[topping];
      return total + (top.small ? top[this.size].price : top.price);
    }, 0);
    return basePrice + toppingsPrice;
  }

  // Узнать калорийность
  calculateCalories() {
    const baseCal =
      Pizza.types[this.type].calories + Pizza.sizes[this.size].calories;
    const toppingsCal = this.toppings.reduce((total, topping) => {
      const top = Pizza.toppings[topping];
      return total + (top.small ? top[this.size].calories : top.calories);
    }, 0);
    return baseCal + toppingsCal;
  }
}

let currentPizza = null;

document.addEventListener("DOMContentLoaded", () => {
  const defaultStyle = document.querySelector(".pizza_option.selected-type")
    ?.dataset.value;
  const defaultSize = document.querySelector(".size_option.selected-size")
    ?.dataset.value;

  if (defaultStyle && defaultSize) {
    currentPizza = new Pizza(defaultStyle, defaultSize);
  }

  updateToppingPrices();
  calculate();

  document.querySelectorAll(".pizza_option").forEach((option) => {
    option.addEventListener("click", () => {
      document
        .querySelectorAll(".pizza_option")
        .forEach((el) => el.classList.remove("selected-type"));
      option.classList.add("selected-type");

      const type = option.dataset.value;
      const size = currentPizza?.getSize();

      if (type && size) {
        currentPizza = new Pizza(type, size);
        restoreToppings();
        calculate();
      }
    });
  });

  document.querySelectorAll(".size_option").forEach((option) => {
    option.addEventListener("click", () => {
      document
        .querySelectorAll(".size_option")
        .forEach((el) => el.classList.remove("selected-size"));
      option.classList.add("selected-size");

      const size = option.dataset.value;
      const type = currentPizza?.getStuffing();

      if (type && size) {
        currentPizza = new Pizza(type, size);
        restoreToppings();
        updateToppingPrices();
        calculate();
      }
    });
  });

  document.querySelectorAll(".topping_option").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      if (!currentPizza) return;

      if (currentPizza.getToppings().includes(value)) {
        currentPizza.removeTopping(value);
        option.classList.remove("selected-topping");
      } else {
        currentPizza.addTopping(value);
        option.classList.add("selected-topping");
      }

      calculate();
    });
  });
});

function calculate() {
  if (!currentPizza) {
    document.getElementById("result").textContent =
      "Выберите тип и размер пиццы";
    return;
  }

  const price = currentPizza.calculatePrice();
  const calories = currentPizza.calculateCalories();

  document.getElementById(
    "result"
  ).textContent = `Добавить в корзину за ${price}₽ (${calories} кКал)`;
}

function updateToppingPrices() {
  document.querySelectorAll(".topping_option").forEach((option) => {
    const value = option.dataset.value;
    const priceItem = option.querySelector(".topping_price");
    const topping = Pizza.toppings[value];

    const size = currentPizza?.getSize();

    if (!size) {
      priceItem.textContent = "";
      return;
    }

    const price = topping.small ? topping[size].price : topping.price;
    priceItem.textContent = `${price}₽`;
  });
}

function restoreToppings() {
  const selected = document.querySelectorAll(
    ".topping_option.selected-topping"
  );
  selected.forEach((el) => {
    const topping = el.dataset.value;
    currentPizza.addTopping(topping);
  });
}
