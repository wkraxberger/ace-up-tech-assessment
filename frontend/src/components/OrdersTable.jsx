function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <p>No orders yet.</p>
  }

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Total</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer_name}</td>
            <td>{order.status}</td>
            <td>${Number(order.total_price).toFixed(2)}</td>
            <td>{new Date(order.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrdersTable
