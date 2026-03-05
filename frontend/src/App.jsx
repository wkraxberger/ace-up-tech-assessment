import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import OrdersTable from './components/OrdersTable'
import NewOrderDialog from './components/NewOrderDialog'
import EditOrderDialog from './components/EditOrderDialog'
import ProductsTable from './components/ProductsTable'
import './App.css'

function App() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)

  const fetchOrders = () => {
    fetch('http://localhost:3000/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }

  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(() => {
    fetchOrders()
    fetchProducts()
  }, [])

  return (
    <div className="app">
      <h1>Order Management</h1>
      <Dashboard orders={orders} />

      <div className="tabs">
        <button
          className={tab === 'orders' ? 'tab active' : 'tab'}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
        <button
          className={tab === 'products' ? 'tab active' : 'tab'}
          onClick={() => setTab('products')}
        >
          Products
        </button>
      </div>

      {tab === 'orders' && (
        <div className="orders-section">
          <div className="orders-header">
            <h2>Orders</h2>
            <button onClick={() => setShowDialog(true)}>New Order</button>
          </div>
          <OrdersTable orders={orders} onEdit={setEditingOrder} />
        </div>
      )}

      {tab === 'products' && (
        <div className="products-section">
          <ProductsTable products={products} onProductChanged={fetchProducts} />
        </div>
      )}

      <NewOrderDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onOrderCreated={fetchOrders}
      />

      <EditOrderDialog
        open={editingOrder !== null}
        order={editingOrder}
        onClose={() => setEditingOrder(null)}
        onOrderUpdated={fetchOrders}
      />
    </div>
  )
}

export default App
