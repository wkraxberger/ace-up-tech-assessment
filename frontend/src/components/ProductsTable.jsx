import { useState } from 'react'

function ProductsTable({ products, onProductChanged }) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState(null)

  const resetForm = () => {
    setName('')
    setSku('')
    setPrice('')
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId
      ? `http://localhost:3000/products/${editingId}`
      : 'http://localhost:3000/products'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: { name, sku, price: parseFloat(price) } })
    })
      .then(res => res.json())
      .then(() => {
        resetForm()
        onProductChanged()
      })
  }

  const handleEdit = (product) => {
    setName(product.name)
    setSku(product.sku)
    setPrice(product.price)
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' })
      .then(() => onProductChanged())
  }

  return (
    <div>
      <div className="orders-header">
        <h2>Products</h2>
        <button onClick={() => setShowForm(true)}>New Product</button>
      </div>

      {showForm && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>{editingId ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                SKU
                <input
                  type="text"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  required
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </label>
              <div className="dialog-actions">
                <button type="button" onClick={resetForm}>Cancel</button>
                <button type="submit">{editingId ? 'Update' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>${Number(p.price).toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsTable
