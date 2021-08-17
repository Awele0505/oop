class OptionsMenu {
    constructor(options) {
        this.name = options.name
        this.itemCalories = options.calories
        this.itemPrice = options.price
        this.itemCount = 1
    }

    set count(value) {
      this.itemCount = value
    }

    get count() {
      return this.itemCount
    }

    get price() {
      return this.itemPrice
    }

    get calories() {
      return this.itemCalories
    }
}

class Topping extends OptionsMenu {
    constructor(props) {
        super(props)
    }
}

class Burger extends OptionsMenu {
    constructor({ size, toppings = [] }) {
      const price = size ==='small' ? 50 : 100
      const calories = size === 'small' ? 20 : 40
      super({ price, calories, name: 'burger' })
  
      this.size = size
      this.toppings = toppings
    }

    get toppingsPrice() {
        return this.toppings.reduce((total, current) => total + current.price, 0) || 0
    }

    get toppingsCalories() {
      return this.toppings.reduce((total, current) => total + current.calories, 0) || 0
    }

    get price() {
        return this.itemPrice + this.toppingsPrice
    }

    get calories() {
        return this.itemCalories + this.toppingsCalories
    }
}

class Salad extends OptionsMenu{
    constructor({ saladName,toppings = []  }) {
    const price = saladName ==='cesar' ? 100 : 50
    const calories = saladName === 'cesar' ? 20 : 80
        super({ price, calories, name: saladName})
        this.toppings = toppings
        
     
    }
}

class Drink extends OptionsMenu{
    constructor({ drinkName,toppings = [] }) {
    const price = drinkName ==='cola' ? 50 : 80
    const calories = drinkName === 'cola' ? 40 : 20
      super({ price, calories, name: drinkName })   
      this.toppings = toppings 
    }
}

class Order {
    constructor(...items) {
        this.menu = []

        if (items.length > 0) {
            items.forEach(item => this.add(item))
        }
    }

    findItem(item) {
      return this.menu.find(menuItem => {
        return menuItem.name === item.name && item.toppings.toString() === menuItem.toppings.toString()
      })
    }
 
    add(item) {
        const existingItem = this.findItem(item.name)

        if (!existingItem) {
            this.menu.push(item)
        } else {
            existingItem.count++
        }
    }

    delete(item) {
      const existingItem = this.findItem(item)

      if (!existingItem) {
        return
      }

      if (existingItem.count === 1) {
        this.menu = this.menu.filter(menuItem => {
          if (menuItem.name === existingItem.name) {
            if (menuItem.toppings.toString() === existingItem.toppings.toString()) {
              return false
            }
          }
          return true
        })
      } else {
        existingItem.count--
      }
    }

    get price() {
      return this.menu.reduce((total, current) => total + (current.price * current.count), 0)
    }

    get calories() {
        return this.menu.reduce((total, current) => total + (current.calories * current.count), 0)
    }
}

const cheese = new Topping({
  name: 'cheese',
  calories: 20,
  price: 10
})
const salad = new Topping({
    name: 'salad',
    calories: 5,
    price: 20
  })
  const potato = new Topping({
    name: 'potato',
    calories: 10,
    price: 15
  })

const order = new Order(
  new Burger({
    size: 'small',
  }),
  new Burger({
    size: 'big',
  }),
  new Burger({
    size: 'small',
    toppings: [cheese]
  }),
  new Burger({
    size: 'small',
    toppings: [potato,salad]
  }),
  new Drink({
    drinkName: 'cola',
  }),
  new Drink({
    drinkName: 'coffee',
  }),
  new Salad({
    saladName: 'cesar',
  }),
  new Salad({
    saladName: 'olivier',
  })
)

order.delete(new Burger({
  size: 'small',
  toppings: [cheese]
}))
order.delete(new Drink({
    drinkName: 'coffee',
  }))
  order.delete(new Salad({
    saladName: 'olivier',
  }))

console.log(order.menu)
console.log('Общая цена: '+ order.price)
console.log('Общая каллорийность: '+ order.calories)
