import { useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartPanel from './components/CartPanel'
import { useUiStore } from './Store/useUiStore'

// Productos de ejemplo con iconos interactivos
const productosEjemplo = [
  { id: 1, name: 'Camiseta SENA Oficial', price: 45000, image: '👕' },
  { id: 2, name: 'Gorra Institucional', price: 30000, image: '🧢' },
  { id: 3, name: 'Tenis Deportivos', price: 120000, image: '👟' },
  { id: 4, name: 'Morral Ejecutivo', price: 95000, image: '🎒' },
]

export default function App() {
  // 1. Leemos el tema global desde el store de UI
  const theme = useUiStore((s) => s.theme)

  // 2. Sincronizamos la clase del body al cambiar o recargar la página
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      background: isDark ? '#0f172a' : '#f5f5f4', 
      color: isDark ? '#f8fafc' : '#1c1917',
      minHeight: '100vh', 
      paddingBottom: '3rem',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Contenedor principal en cuadrícula */}
      <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2rem' }}>
        <section>
          <h2 style={{ margin: '0 0 1.5rem 0', color: isDark ? '#f8fafc' : '#1c1917', fontSize: '1.5rem' }}>
            📦 Catálogo de Productos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {productosEjemplo.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <aside>
          <h2 style={{ margin: '0 0 1.5rem 0', color: isDark ? '#f8fafc' : '#1c1917', fontSize: '1.5rem' }}>
            🛍️ Tu Compra
          </h2>
          <CartPanel />
        </aside>
      </main>
    </div>
  )
}