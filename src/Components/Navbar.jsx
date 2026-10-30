import { useCartStore } from '../Store/useCartStore'
import { useUiStore } from '../Store/useUiStore'

export default function Navbar() {
  // 1. Obtenemos el total de items en el carrito usando un selector optimizado
  const totalItems = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.qty, 0)
  )

  // 2. Obtenemos el tema actual y la función para cambiarlo desde el useUiStore
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      background: theme === 'dark' ? '#1e293b' : '#0f766e', 
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'background 0.3s ease'
    }}>
      {/* Título o Logo de la Tienda SENA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>🛒 Tienda SENA</span>
      </div>

      {/* Sección derecha: Contador del carrito y Botón de Tema */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* Indicador de productos en el carrito */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '0.4rem 0.8rem', 
          borderRadius: '20px', 
          fontSize: '0.95rem',
          fontWeight: '600' 
        }}>
          🛍️ Carrito: {totalItems}
        </div>

        {/* Botón interactivo para cambiar el Tema (Claro / Oscuro) */}
        <button 
          onClick={toggleTheme}
          style={{ 
            background: '#fff', 
            color: '#0f766e', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
        >
          {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
      </div>
    </nav>
  )
}