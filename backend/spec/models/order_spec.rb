require 'rails_helper'

RSpec.describe Order, type: :model do
  let(:product) { Product.create!(name: "Mouse", sku: "MS123", price: 25.00) }

  it "calculates total on creation" do
    order = Order.create!(
      customer_name: "John", customer_email: "john@test.com", status: "pending",
      order_items_attributes: [{ product_id: product.id, quantity: 3 }]
    )

    expect(order.total_price.to_f).to eq(75.00)
  end

  it "sets unit price on order items" do
    order = Order.create!(
      customer_name: "John", customer_email: "john@test.com", status: "pending",
      order_items_attributes: [{ product_id: product.id, quantity: 1 }]
    )

    expect(order.order_items.first.unit_price.to_f).to eq(25.00)
  end

  it "requires customer name" do
    order = Order.new(customer_name: "", customer_email: "john@test.com", status: "pending")
    expect(order.valid?).to eq(false)
  end

  it "requires a valid status" do
    order = Order.new(customer_name: "John", customer_email: "john@test.com", status: "adgadg")
    expect(order.valid?).to eq(false)
  end

  it "rejects duplicate products" do
    order = Order.new(
      customer_name: "John", customer_email: "john@test.com", status: "pending",
      order_items_attributes: [
        { product_id: product.id, quantity: 4 },
        { product_id: product.id, quantity: 2 }
      ]
    )

    expect(order.valid?).to eq(false)
  end
end
