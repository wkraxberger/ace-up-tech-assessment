function Dashboard({ orders }) {
  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p className="stat-number">{orders.length}</p>
      </div>
    </div>
  )
}

export default Dashboard
