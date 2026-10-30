import { useState } from 'react'
import { useCartStore } from '../Store/useCartStore'
import { useUiStore } from '../Store/useUiStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const theme = useUiStore((s) => s.theme)
  const [animando, setAnimando] = useState(false)

  const isDark = theme === 'dark'

  const handleAgregar = () => {
    addItem(product)
    setAnimando(true)
    setTimeout(() => setAnimando(false), 300)
  }

  return (
    <div style={{ 
      background: isDark ? '#1e293b' : '#fff',
      border: '1px solid',
      borderColor: isDark ? '#334155' : '#e7e5e4', 
      borderRadius: '12px', 
      padding: '1.5rem', 
      textAlign: 'center',
      boxShadow: animando ? '0 0 15px rgba(15, 118, 110, 0.5)' : '0 2px 4px rgba(0,0,0,0.05)',
      transform: animando ? 'scale(1.03)' : 'scale(1)',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{product.image}</div>
        <h3 style={{ margin: '0.5rem 0', color: isDark ? '#f8fafc' : '#1c1917', fontSize: '1.1rem' }}>
          {product.name}
        </h3>
        <p style={{ color: '#2dd4bf', fontWeight: 'bold', fontSize: '1.2rem', margin: '0.5rem 0' }}>
          $ {product.price.toLocaleString('es-CO')}
        </p>
      </div>

      <button 
        onClick={handleAgregar}
        style={{ 
          background: '#0f766e', 
          color: '#fff', 
          border: 'none', 
          padding: '0.75rem 1rem', 
          borderRadius: '8px', 
          cursor: 'pointer',
          fontWeight: '600',
          marginTop: '1rem',
          transition: 'background 0.2s'
        }}
      >
        {animando ? '¡Agregado! ✓' : 'Agregar al carrito'}
      </button>
    </div>
  )
}