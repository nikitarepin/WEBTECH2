class Pizza {
  static types = {
    margarita: { price: 500, calories: 300 },
    peperoni: { price: 800, calories: 400 },
    bavarskaya: { price: 700, calories: 450 },
  };

  static sizes = {
    big: { price: 200, calories: 200 },
    small: { price: 100, calories: 100 },
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
    if (!Pizza.types[type]) {
      throw new Error("Неверный тип пиццы");
    }
    if (!Pizza.sizes[size]) {
      throw new Error("Неверный размер пиццы");
    }

    this.type = type;
    this.size = size;
    this.toppings = [];
  }

  addTopping(topping) {
    if (!Pizza.toppings[topping]) {
      throw new Error("Неверная добавка");
    }
    if (!this.toppings.includes(topping)) {
      this.toppings.push(topping);
    }
  }

  removeTopping(topping) {
    this.toppings = this.toppings.filter((t) => t !== topping);
  }

  getToppings() {
    return this.toppings;
  }

  getSize() {
    return this.size;
  }

  getType() {
    return this.type;
  }

  calculatePrice() {
    let price = Pizza.types[this.type].price + Pizza.sizes[this.size].price;

    this.toppings.forEach((topping) => {
      const toppingSet = Pizza.toppings[topping]?.[this.size];
      if (toppingSet) price += toppingSet.price;
    });

    return price;
  }

  calculateCalories() {
    let calories =
      Pizza.types[this.type].calories + Pizza.sizes[this.size].calories;

    this.toppings.forEach((topping) => {
      const toppingSet = Pizza.toppings[topping]?.[this.size];
      if (toppingSet) calories += toppingSet.calories;
    });

    return calories;
  }
}

function calculate() {
  try {
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;
    const toppings = document.querySelectorAll(".topping");

    const pizza = new Pizza(type, size);

    toppings.forEach((checkbox) => {
      if (checkbox.checked) {
        pizza.addTopping(checkbox.value);
      }
    });

    document.getElementById("price").textContent =
      "Цена: " + pizza.calculatePrice() + " ₽";
    document.getElementById("calories").textContent =
      "Калорийность: " + pizza.calculateCalories() + " Ккал";
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}
