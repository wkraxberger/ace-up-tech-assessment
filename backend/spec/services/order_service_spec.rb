require 'rails_helper'

RSpec.describe OrderService do
  describe "create" do
    let(:product) { Product.create!(name: "Test prod", sku: "AB123", price: 20.00) }

    it "creates an order and enqueues a confirmation email" do
      params = {
        customer_name: "John Doe",
        customer_email: "john@doe.com",
        status: "pending",
        order_items_attributes: [{ product_id: product.id, quantity: 2 }]
      }

      expect {
        OrderService.create(params)
      }.to change(Order, :count).by(1)
       .and have_enqueued_mail(OrderMailer, :confirmation)
    end

    it "does not send an email when the order is invalid" do
      params = { customer_name: "", customer_email: "", status: "" }

      order = OrderService.create(params)

      expect(order.persisted?).to eq(false)
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end
  end
end
