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

end
