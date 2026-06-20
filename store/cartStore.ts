import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const exist = state.cart.find(
        (p) => p.id === item.id
      );

      if (exist) {
        return {
          cart: state.cart.map((p) =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }

      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));