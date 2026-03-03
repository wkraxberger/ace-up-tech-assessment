import { useState, useEffect } from 'react'

function NewOrderDialog({ open, onClose, onOrderCreated }) {
  const [products, setProducts] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState([{ product_id: '', quantity: 1 }])

  useEffect(() => {
    if (open) {
      fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }
  }, [open])

  const addItem = () => {
    setItems([...items, { product_id: '', quantity: 1 }])
  }

  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order: {
          customer_name: customerName,
          status: 'pending',
          order_items_attributes: items
        }
      })
    })
      .then(res => res.json())
      .then(() => {
        setCustomerName('')
        setItems([{ product_id: '', quantity: 1 }])
        onOrderCreated()
        onClose()
      })
  }

  if (!open) return null

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>New Order</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Customer Name
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              required
            />
          </label>

          <h3>Items</h3>
          {items.map((item, index) => (
            <div key={index} className="order-item-row">
              <select
                value={item.product_id}
                onChange={e => updateItem(index, 'product_id', e.target.value)}
                required
              >
                <option value="">Select product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ${Number(p.price).toFixed(2)}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => updateItem(index, 'quantity', parseInt(e.target.value))}
              />
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addItem}>Add Item</button>

          <div className="dialog-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create Order</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewOrderDialog
