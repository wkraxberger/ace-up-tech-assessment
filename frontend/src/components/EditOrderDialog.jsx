import { useState, useEffect } from 'react'

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

function EditOrderDialog({ open, order, onClose, onOrderUpdated }) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (order) {
      setCustomerName(order.customer_name)
      setCustomerEmail(order.customer_email)
      setStatus(order.status)
    }
  }, [order])

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/orders/${order.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order: {
          customer_name: customerName,
          customer_email: customerEmail,
          status: status
        }
      })
    })
      .then(res => res.json())
      .then(() => {
        onOrderUpdated()
        onClose()
      })
  }

  if (!open || !order) return null

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Edit Order #{order.id}</h2>
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
          <label>
            Customer Email
            <input
              type="email"
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Status
            <select value={status} onChange={e => setStatus(e.target.value)} required>
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="dialog-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditOrderDialog
