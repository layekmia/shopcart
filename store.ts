import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  hasHydrated: boolean;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartItem: (productId: string) => void;
  resetCart: () => void;

  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getTotalDiscount: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];

  // Favorite products
  favoriteProducts: Product[];
  addFavoriteProduct: (product: Product) => void;
  removeFavoriteProduct: (productId: string) => void;
  resetFavoriteProducts: () => void;
}

// Normal Regular way good for learning
// const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       // -------------------- CART --------------------
//       items: [],

//       addItem: (product) =>
//         set((state) => {
//           const existingItem = state.items.find(
//             (item) => item.product._id === product._id
//           );

//           if (existingItem) {
//             return {
//               items: state.items.map((item) =>
//                 item.product._id === product._id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           }

//           return {
//             items: [...state.items, { product, quantity: 1 }],
//           };
//         }),

//       removeItem: (productId) =>
//         set((state) => ({
//           items: state.items
//             .map((item) =>
//               item.product._id === productId
//                 ? { ...item, quantity: item.quantity - 1 }
//                 : item
//             )
//             .filter((item) => item.quantity > 0),
//         })),

//       deleteCartItem: (productId) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.product._id !== productId),
//         })),

//       resetCart: () => set({ items: [] }),

//       getTotalPrice: () =>
//         get().items.reduce(
//           (sum, item) => sum + item.quantity * (item.product?.price || 0),
//           0
//         ),

//       getSubTotalPrice: () =>
//         get().items.reduce(
//           (sum, item) => sum + item.quantity * (item.product?.price || 0),
//           0
//         ),

//       getItemCount: () =>
//         get().items.reduce((count, item) => count + item.quantity, 0),

//       getGroupedItems: () => get().items,

//       // -------------------- FAVORITES --------------------
//       favoriteProducts: [],

//       addFavoriteProduct: (product) =>
//         set((state) => {
//           const exists = state.favoriteProducts.find(
//             (p) => p._id === product._id
//           );
//           if (exists) return state; // avoid duplicates

//           return {
//             favoriteProducts: [...state.favoriteProducts, product],
//           };
//         }),

//       removeFavoriteProduct: (productId) =>
//         set((state) => ({
//           favoriteProducts: state.favoriteProducts.filter(
//             (p) => p._id !== productId
//           ),
//         })),

//       resetFavoriteProducts: () => set({ favoriteProducts: [] }),
//     }),
//     { name: "cart-store" }
//   )
// );

//* Smart and short version with immer for performance and esy

const useStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      items: [],
      hasHydrated: false,

      addItem: (product) =>
        set((state) => {
          const item = state.items.find((i) => i.product._id === product._id);
          if (item) item.quantity += 1;
          else state.items.push({ product, quantity: 1 });
        }),

      removeItem: (productId) =>
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.product._id === productId
          );
          if (index > -1) {
            state.items[index].quantity -= 1;
            if (state.items[index].quantity <= 0) state.items.splice(index, 1);
          }
        }),

      deleteCartItem: (productId) =>
        set((state) => {
          state.items = state.items.filter((i) => i.product._id !== productId);
        }),

      resetCart: () =>
        set((state) => {
          state.items = [];
        }),
      // Subtotal = full price of items, ignoring discount
      getSubTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          return total + price * item.quantity;
        }, 0),

      // Total = actual total after applying discount
      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const finalPrice = price - discount; // discounted price
          return total + finalPrice * item.quantity;
        }, 0),

      // Optional: total discount for frontend display
      getTotalDiscount: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          return total + discount * item.quantity;
        }, 0),

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      // ---------------- FAVORITES ----------------
      favoriteProducts: [],

      addFavoriteProduct: (product) =>
        set((state) => {
          const exists = state.favoriteProducts.find(
            (p) => p._id === product._id
          );
          if (!exists) state.favoriteProducts.push(product);
        }),

      removeFavoriteProduct: (productId) =>
        set((state) => {
          state.favoriteProducts = state.favoriteProducts.filter(
            (p) => p._id !== productId
          );
        }),

      resetFavoriteProducts: () =>
        set((state) => {
          state.favoriteProducts = [];
        }),
    })),
    {
      name: "cart-store",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);

export default useStore;
