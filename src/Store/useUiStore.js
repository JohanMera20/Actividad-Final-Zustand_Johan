import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Creación del store global para gestionar la interfaz de usuario (Tema Claro / Oscuro)
export const useUiStore = create(
  persist(
    (set, get) => ({
      // Estado inicial: por defecto la aplicación inicia en modo claro ('light')
      theme: 'light',

      // Acción para alternar dinámicamente entre el tema claro y oscuro
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        
        // Actualizamos el estado en el store global
        set({ theme: newTheme })
        
        // Aplicamos la clase correspondiente directamente al body del documento HTML
        document.body.className = newTheme
      },

      // Acción opcional para definir un tema específico de forma directa
      setTheme: (theme) => {
        set({ theme })
        document.body.className = theme
      },
    }),
    {
      name: 'tienda-sena-ui-theme', // Clave única para guardar el tema en el localStorage del navegador
    }
  )
)