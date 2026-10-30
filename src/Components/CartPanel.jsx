import { useCartStore } from '../Store/useCartStore'
import { useUiStore } from '../Store/useUiStore'

export default function CartPanel() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty = useCartStore((s) => s.updateQty)
  const clearCart = useCartStore((s) => s.clearCart)
  const totalPrice = useCartStore((s) => s.totalPrice())

  const theme = useUiStore((s) => s.theme)
  const isDark = theme === 'dark'

  const panelBg = isDark ? '#1e293b' : '#fff'
  const textColor = isDark ? '#f8fafc' : '#1c1917'
  const mutedColor = isDark ? '#94a3b8' : '#78716c'
  const borderColor = isDark ? '#334155' : '#f5f5f4'

  if (items.length === 0) {
    return (
      <div style={{ 
        background: panelBg, 
        borderRadius: '12px', 
        padding: '2rem', 
        border: '1px solid',
        borderColor: isDark ? '#334155' : '#e7e5e4',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: textColor }}>Tu Carrito</h3>
        <p style={{ color: mutedColor, margin: 0 }}>El carrito está vacío. ¡Agrega productos!</p>
      </div>
    )
  }

  return (
    <div style={{ 
      background: panelBg, 
      borderRadius: '12px', 
      padding: '1.5rem', 
      border: '1px solid',
      borderColor: isDark ? '#334155' : '#e7e5e4',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 1.0rem 0', color: textColor, borderBottom: `2px solid ${borderColor}`, paddingBottom: '0.5rem' }}>
        🛒 Carrito de Compras
      </h3>

      <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '0.2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem', 
            borderBottom: `1px solid ${borderColor}`, 
            paddingBottom: '0.75rem' 
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: '600', color: textColor }}>{item.name}</p>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: mutedColor }}>
                ${item.price.toLocaleString('es-CO')} c/u
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button 
                onClick={() => updateQty(item.id, item.qty - 1)} 
                style={{ background: isDark ? '#334155' : '#f5f5f4', color: textColor, border: '1px solid', borderColor: isDark ? '#475569' : '#e7e5e4', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold' }}
              >-</button>
              
              {/* Número de la cantidad corregido con color legible */}
              <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600', color: textColor }}>
                {item.qty}
              </span>
              
              <button 
                onClick={() => updateQty(item.id, item.qty + 1)} 
                style={{ background: isDark ? '#334155' : '#f5f5f4', color: textColor, border: '1px solid', borderColor: isDark ? '#475569' : '#e7e5e4', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold' }}
              >+</button>
              
              <button 
                onClick={() => removeItem(item.id)} 
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '0.4rem', fontSize: '1rem' }}
                title="Eliminar producto"
              >🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', borderTop: `2px solid ${textColor}`, paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: textColor }}>
        <strong>Total a pagar:</strong>
        <strong style={{ color: '#2dd4bf' }}>$ {totalPrice.toLocaleString('es-CO')}</strong>
      </div>

      <button 
        onClick={clearCart} 
        style={{ 
          background: '#ef4444', 
          color: '#fff', 
          border: 'none', 
          padding: '0.75rem', 
          cursor: 'pointer', 
          width: '100%', 
          marginTop: '1rem', 
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        Vaciar Carrito
      </button>
    </div>
  )
}