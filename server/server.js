const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const fs = require("fs");


app.use(cors());
app.use(express.json());

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));

let pizzaOfTheDay = null;
let currentDate = null;
const pizzas = [
  {
    id: "bbq_ckn",
    name: "The Barbecue Chicken Pizza",
    category: "Chicken",
    description:
      "Barbecued Chicken, Red Peppers, Green Peppers, Tomatoes, Red Onions, Barbecue Sauce",
    image: "/public/pizzas/bbq_ckn.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "cali_ckn",
    name: "The California Chicken Pizza",
    category: "Chicken",
    description:
      "Chicken, Artichoke, Spinach, Garlic, Jalapeno Peppers, Fontina Cheese, Gouda Cheese",
    image: "/public/pizzas/cali_ckn.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "ckn_alfredo",
    name: "The Chicken Alfredo Pizza",
    category: "Chicken",
    description:
      "Chicken, Red Onions, Red Peppers, Mushrooms, Asiago Cheese, Alfredo Sauce",
    image: "/public/pizzas/ckn_alfredo.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "ckn_pesto",
    name: "The Chicken Pesto Pizza",
    category: "Chicken",
    description: "Chicken, Tomatoes, Red Peppers, Spinach, Garlic, Pesto Sauce",
    image: "/public/pizzas/ckn_pesto.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "southw_ckn",
    name: "The Southwest Chicken Pizza",
    category: "Chicken",
    description:
      "Chicken, Tomatoes, Red Peppers, Red Onions, Jalapeno Peppers, Corn, Cilantro, Chipotle Sauce",
    image: "/public/pizzas/southw_ckn.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "thai_ckn",
    name: "The Thai Chicken Pizza",
    category: "Chicken",
    description:
      "Chicken, Pineapple, Tomatoes, Red Peppers, Thai Sweet Chilli Sauce",
    image: "/public/pizzas/thai_ckn.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 20.75,
    },
  },
  {
    id: "big_meat",
    name: "The Big Meat Pizza",
    category: "Classic",
    description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
    image: "/public/pizzas/big_meat.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.5,
    },
  },
  {
    id: "classic_dlx",
    name: "The Classic Deluxe Pizza",
    category: "Classic",
    description: "Pepperoni, Mushrooms, Red Onions, Red Peppers, Bacon",
    image: "/public/pizzas/classic_dlx.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.5,
    },
  },
  {
    id: "hawaiian",
    name: "The Hawaiian Pizza",
    category: "Classic",
    description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    image: "/public/pizzas/hawaiian.webp",
    sizes: {
      S: 10.5,
      M: 13.25,
      L: 16.5,
    },
  },
  {
    id: "ital_cpcllo",
    name: "The Italian Capocollo Pizza",
    category: "Classic",
    description:
      "Capocollo, Red Peppers, Tomatoes, Goat Cheese, Garlic, Oregano",
    image: "/public/pizzas/ital_cpcllo.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.5,
    },
  },
  {
    id: "napolitana",
    name: "The Napolitana Pizza",
    category: "Classic",
    description: "Tomatoes, Anchovies, Green Olives, Red Onions, Garlic",
    image: "/public/pizzas/napolitana.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.5,
    },
  },
  {
    id: "pep_msh_pep",
    name: "The Pepperoni, Mushroom, and Peppers Pizza",
    category: "Classic",
    description: "Pepperoni, Mushrooms, Green Peppers",
    image: "/public/pizzas/pep_msh_pep.webp",
    sizes: {
      S: 11,
      M: 14.5,
      L: 17.5,
    },
  },
  {
    id: "pepperoni",
    name: "The Pepperoni Pizza",
    category: "Classic",
    description: "Mozzarella Cheese, Pepperoni",
    image: "/public/pizzas/pepperoni.webp",
    sizes: {
      S: 9.75,
      M: 12.5,
      L: 15.25,
    },
  },
  {
    id: "the_greek",
    name: "The Greek Pizza",
    category: "Classic",
    description:
      "Kalamata Olives, Feta Cheese, Tomatoes, Garlic, Beef Chuck Roast, Red Onions",
    image: "/public/pizzas/the_greek.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.5,
    },
  },
  {
    id: "brie_carre",
    name: "The Brie Carre Pizza",
    category: "Supreme",
    description:
      "Brie Carre Cheese, Prosciutto, Caramelized Onions, Pears, Thyme, Garlic",
    image: "/public/pizzas/brie_carre.webp",
    sizes: {
      S: 23.65,
      M: 28.85,
      L: 34.4,
    },
  },
  {
    id: "calabrese",
    name: "The Calabrese Pizza",
    category: "Supreme",
    description:
      "Nduja Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
    image: "/public/pizzas/calabrese.webp",
    sizes: {
      S: 12.25,
      M: 16.25,
      L: 20.25,
    },
  },
  {
    id: "ital_supr",
    name: "The Italian Supreme Pizza",
    category: "Supreme",
    description:
      "Calabrese Salami, Capocollo, Tomatoes, Red Onions, Green Olives, Garlic",
    image: "/public/pizzas/ital_supr.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "peppr_salami",
    name: "The Pepper Salami Pizza",
    category: "Supreme",
    description:
      "Genoa Salami, Capocollo, Pepperoni, Tomatoes, Asiago Cheese, Garlic",
    image: "/public/pizzas/peppr_salami.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "prsc_argla",
    name: "The Prosciutto and Arugula Pizza",
    category: "Supreme",
    description: "Prosciutto di San Daniele, Arugula, Mozzarella Cheese",
    image: "/public/pizzas/prsc_argla.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "sicilian",
    name: "The Sicilian Pizza",
    category: "Supreme",
    description:
      "Coarse Sicilian Salami, Tomatoes, Green Olives, Luganega Sausage, Onions, Garlic",
    image: "/public/pizzas/sicilian.webp",
    sizes: {
      S: 12.25,
      M: 16.25,
      L: 20.25,
    },
  },
  {
    id: "soppressata",
    name: "The Soppressata Pizza",
    category: "Supreme",
    description:
      "Soppressata Salami, Fontina Cheese, Mozzarella Cheese, Mushrooms, Garlic",
    image: "/public/pizzas/soppressata.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "spicy_ital",
    name: "The Spicy Italian Pizza",
    category: "Supreme",
    description:
      "Capocollo, Tomatoes, Goat Cheese, Artichokes, Peperoncini verdi, Garlic",
    image: "/public/pizzas/spicy_ital.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "spinach_supr",
    name: "The Spinach Supreme Pizza",
    category: "Supreme",
    description:
      "Spinach, Red Onions, Pepperoni, Tomatoes, Artichokes, Kalamata Olives, Garlic, Asiago Cheese",
    image: "/public/pizzas/spinach_supr.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "five_cheese",
    name: "The Five Cheese Pizza",
    category: "Veggie",
    description:
      "Mozzarella Cheese, Provolone Cheese, Smoked Gouda Cheese, Romano Cheese, Blue Cheese, Garlic",
    image: "/public/pizzas/five_cheese.webp",
    sizes: {
      S: 12.5,
      M: 15.5,
      L: 18.5,
    },
  },
  {
    id: "four_cheese",
    name: "The Four Cheese Pizza",
    category: "Veggie",
    description:
      "Ricotta Cheese, Gorgonzola Piccante Cheese, Mozzarella Cheese, Parmigiano Reggiano Cheese, Garlic",
    image: "/public/pizzas/four_cheese.webp",
    sizes: {
      S: 11.75,
      M: 14.75,
      L: 17.95,
    },
  },
  {
    id: "green_garden",
    name: "The Green Garden Pizza",
    category: "Veggie",
    description: "Spinach, Mushrooms, Tomatoes, Green Olives, Feta Cheese",
    image: "/public/pizzas/green_garden.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.25,
    },
  },
  {
    id: "ital_veggie",
    name: "The Italian Vegetables Pizza",
    category: "Veggie",
    description:
      "Eggplant, Artichokes, Tomatoes, Zucchini, Red Peppers, Garlic, Pesto Sauce",
    image: "/public/pizzas/ital_veggie.webp",
    sizes: {
      S: 12.75,
      M: 16.75,
      L: 21,
    },
  },
  {
    id: "mediterraneo",
    name: "The Mediterranean Pizza",
    category: "Veggie",
    description:
      "Spinach, Artichokes, Kalamata Olives, Sun-dried Tomatoes, Feta Cheese, Plum Tomatoes, Red Onions",
    image: "/public/pizzas/mediterraneo.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.25,
    },
  },
  {
    id: "mexicana",
    name: "The Mexicana Pizza",
    category: "Veggie",
    description:
      "Tomatoes, Red Peppers, Jalapeno Peppers, Red Onions, Cilantro, Corn, Chipotle Sauce, Garlic",
    image: "/public/pizzas/mexicana.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.25,
    },
  },
  {
    id: "spin_pesto",
    name: "The Spinach Pesto Pizza",
    category: "Veggie",
    description:
      "Spinach, Artichokes, Tomatoes, Sun-dried Tomatoes, Garlic, Pesto Sauce",
    image: "/public/pizzas/spin_pesto.webp",
    sizes: {
      S: 12.5,
      M: 16.5,
      L: 20.75,
    },
  },
  {
    id: "spinach_fet",
    name: "The Spinach and Feta Pizza",
    category: "Veggie",
    description: "Spinach, Mushrooms, Red Onions, Feta Cheese, Garlic",
    image: "/public/pizzas/spinach_fet.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.25,
    },
  },
  {
    id: "veggie_veg",
    name: "The Vegetables + Vegetables Pizza",
    category: "Veggie",
    description:
      "Mushrooms, Tomatoes, Red Peppers, Green Peppers, Red Onions, Zucchini, Spinach, Garlic",
    image: "/public/pizzas/veggie_veg.webp",
    sizes: {
      S: 12,
      M: 16,
      L: 20.25,
    },
  },
];

const FORM_DATA_FILE = "formData.json";
const ORDER_DATA_FILE = "orders.json";

app.get("/pizzas", (req, res) => {
  res.json(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  const pizzaId = req.params.id;
  const pizza = pizzas.find((pizza) => pizza.id === pizzaId);

  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404).json({ message: "Pizza not found" });
  }
});

app.get("/pizza-of-the-day", (req, res) => {
  const today = new Date().toDateString();
  if (!pizzaOfTheDay || currentDate !== today) {
    const randomIndex = Math.floor(Math.random() * pizzas.length);
    pizzaOfTheDay = pizzas[randomIndex];
    currentDate = today;
  }
  res.json(pizzaOfTheDay);
});

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  if (!formData.name || !formData.email || !formData.message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // console.log("Form Data Received:", req.body);
  let storedData = [];
  if (fs.existsSync(FORM_DATA_FILE)) {
    const rawData = fs.readFileSync(FORM_DATA_FILE);
    storedData = JSON.parse(rawData);
  }
  storedData.push(formData);
  fs.writeFileSync(FORM_DATA_FILE, JSON.stringify(storedData, null, 2));
  res.status(200).json({ message: "Form submitted successfully" });
});

app.post("/submit-order", (req, res) => {
  const orderData = req.body;
  console.log("Received order data: ", orderData)
  
  if (!Array.isArray(orderData) || orderData.some(item => !item.pizzaId || !item.size)) {
    return res.status(400).json({ message: "Pizza type and size are required for each pizza." });
  }

  let storedOrders = [];
  if (fs.existsSync(ORDER_DATA_FILE)) {
    const rawData = fs.readFileSync(ORDER_DATA_FILE);
    storedOrders = JSON.parse(rawData);
  }

  const newOrder = {
    id: storedOrders.length + 1,
    date: new Date(),
    items: orderData.map(item => ({
      pizzaId: item.pizzaId,  
      size: item.size,
      price: item.price
    })),
    total: orderData.reduce((acc, item) => acc + item.price, 0)
  }

  storedOrders.push(newOrder);
  fs.writeFileSync(ORDER_DATA_FILE, JSON.stringify(storedOrders, null, 2));
  res
    .status(200)
    .json({ message: " Order placed successfully", order: newOrder });
});

app.get("/orders", (req, res) => {
  let storedOrders = [];
  if (fs.existsSync(ORDER_DATA_FILE)) {
    const rawData = fs.readFileSync(ORDER_DATA_FILE);
    storedOrders = JSON.parse(rawData);
  }

  if (Array.isArray(storedOrders)) {
    const fullOrdersDetails = storedOrders.map(order => {
      // Check if order.items exists and is an array
      if (Array.isArray(order.items)) {
        const fullItemsDetails = order.items.map(item => {
          const pizza = pizzas.find(pizza => pizza.id === item.pizzaId);
          return {
            ...item,
            pizzaName: pizza ? pizza.name : 'Unknown', // Fallback to 'Unknown' if pizza not found
            pizzaDescription: pizza ? pizza.description : 'No description available',
            pizzaImage: pizza ? pizza.image.replace('/public', '') : '/pizzas/default.webp', // Default image if pizza is not found
            pizzaSizePrice: pizza ? pizza.sizes[item.size] : 0 // Default to 0 if pizza or size is not found
          }
        });

        return {
          ...order,
          items: fullItemsDetails
        };
      } else {
        return order; // Return the order as-is if items are not an array
      }
    });

    res.json(fullOrdersDetails);
  } else {
    res.status(400).json({ message: "Invalid order data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
