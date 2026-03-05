function OrdersTable({ orders, onEdit }) {
  if (orders.length === 0) {
    return <p>No orders yet.</p>
  }

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Items</th>
          <th>Status</th>
          <th>Total</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer_name}</td>
            <td>{order.customer_email}</td>
            <td>
              {order.order_items?.map((item, i) => (
                <span key={i}>
                  {item.product?.name} x{item.quantity}
                  {i < order.order_items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </td>
            <td>{order.status}</td>
            <td>${Number(order.total_price).toFixed(2)}</td>
            <td>{new Date(order.created_at).toLocaleDateString()}</td>
            <td><button onClick={() => onEdit(order)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrdersTable
