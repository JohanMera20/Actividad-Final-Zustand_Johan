import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        
        // Agregar producto o incrementar cantidad si ya existe
        addItem: (product) =>
          set((state) => {
            const exists = state.items.find((i) => i.id === product.id)
            if (exists) {
              return {
                items: state.items.map((i) =>
                  i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                ),
              }
            }
            return { items: [...state.items, { ...product, qty: 1 }] }
          }, false, 'cart/addItem'),

        // Eliminar un producto específico del carrito
        removeItem: (id) =>
          set((state) => ({ 
            items: state.items.filter((i) => i.id !== id) 
          }), false, 'cart/removeItem'),

        // 🛠️ FUNCIÓN CORREGIDA/AGREGADA: Actualizar cantidad (+ o -) y auto-eliminar si llega a 0
        updateQty: (id, qty) =>
          set((state) => ({
            items: state.items
              .map((i) => (i.id === id ? { ...i, qty } : i))
              .filter((i) => i.qty > 0),
          }), false, 'cart/updateQty'),

        // Vaciar todo el carrito
        clearCart: () => set({ items: [] }, false, 'cart/clear'),

        // Valor derivado para el precio total
        totalPrice: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
      }),
      { name: 'tienda-sena-cart' } // Clave del persist en localStorage
    ),
    { name: 'CartStore' } // Nombre en la extensión Redux DevTools
  )
)