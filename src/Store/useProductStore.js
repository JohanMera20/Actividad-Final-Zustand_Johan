import { create } from 'zustand'

// Definimos la URL de la API (puedes usar la de prueba de la guía o tu backend)
const API = 'https://fakestoreapi.com/products'

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  
  // Estados para los filtros solicitados en el ejercicio 5
  searchTerm: '',
  selectedCategory: 'all',

  // Acción asíncrona para cargar los productos desde la API
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error('No fue posible cargar los productos')
      const data = await res.json()
      set({ products: data, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  // Acciones para actualizar los filtros
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Selector / Propiedad derivada para obtener los productos ya filtrados
  filteredProducts: () => {
    const { products, searchTerm, selectedCategory } = get()
    
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  },
}))