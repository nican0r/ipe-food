import { FoodItem } from "@/types/food";

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables and special sauce",
    price: {
      medium: 8.99,
      large: 12.99
    },
    weight: {
      medium: "200g",
      large: "300g"
    },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    available: {
      medium: 10,
      large: 8
    }
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil on our signature crust",
    price: {
      medium: 10.99,
      large: 15.99
    },
    weight: {
      medium: "400g",
      large: "600g"
    },
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop",
    available: {
      medium: 15,
      large: 12
    }
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: {
      medium: 7.99,
      large: 11.99
    },
    weight: {
      medium: "250g",
      large: "400g"
    },
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000&auto=format&fit=crop",
    available: {
      medium: 20,
      large: 15
    }
  }
]; 