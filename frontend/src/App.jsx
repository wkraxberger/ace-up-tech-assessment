import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import OrdersTable from './components/OrdersTable'
import NewOrderDialog from './components/NewOrderDialog'
import './App.css'

function App() {
  const [orders, setOrders] = useState([])
  const [showDialog, setShowDialog] = useState(false)

  const fetchOrders = () => {
    fetch('http://localhost:3000/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="app">
      <h1>Order Management</h1>
      <Dashboard orders={orders} />
      <div className="orders-section">
        <div className="orders-header">
          <h2>Orders</h2>
          <button onClick={() => setShowDialog(true)}>New Order</button>
        </div>
        <OrdersTable orders={orders} />
      </div>
      <NewOrderDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onOrderCreated={fetchOrders}
      />
    </div>
  )
}

export default App
