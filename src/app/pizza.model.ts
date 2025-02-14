export interface Pizza {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  sizes: {
    S: number;
    M: number;
    L: number;
  };
}

export interface CartPizza extends Pizza {
  size: 'S' | 'M' | 'L';
  price: number;
  pizzaName?: string;
  pizzaImage?: string;
}
