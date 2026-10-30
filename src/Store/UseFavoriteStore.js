import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Creación del store global para la gestión de productos favoritos
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // Estado inicial: lista de productos favoritos vacía
      favorites: [],

      // Acción para alternar (agregar o quitar) un producto de favoritos
      toggleFavorite: (product) => {
        const { favorites } = get()
        // Verificamos si el producto ya se encuentra en la lista de favoritos
        const exists = favorites.some((item) => item.id === product.id)

        if (exists) {
          // Si ya existe, lo filtramos para removerlo del array
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          })
        } else {
          // Si no existe, lo agregamos conservando los anteriores (inmutabilidad)
          set({
            favorites: [...favorites, product],
          })
        }
      },

      // Función auxiliar (selector/verificador) para saber si un producto específico es favorito
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id)
      },
    }),
    {
      name: 'tienda-sena-favorites', // Nombre de la clave en el localStorage del navegador
    }
  )
)