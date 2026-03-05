require 'rails_helper'

RSpec.describe "Orders", type: :request do
  describe "GET /orders" do
    it "returns the orders" do
      product = Product.create!(name: "Test prod", sku: "AB123", price: 20.00)
      order = Order.create!(customer_name: "John Doe", customer_email: "john@doe.com", status: "pending")
      order.order_items.create!(product: product, quantity: 1)

      get "/orders"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]["customer_name"]).to eq("John Doe")
    end
  end

  describe "POST /orders" do
    let(:product) { Product.create!(name: "Test prod", sku: "AB123", price: 20.00) }

    it "creates an order with an item" do
      post "/orders", params: {
        order: {
          customer_name: "John Doe",
          customer_email: "john@doe.com",
          status: "pending",
          order_items_attributes: [
            { product_id: product.id, quantity: 2 }
          ]
        }
      }, as: :json

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["customer_name"]).to eq("John Doe")
      expect(json["status"]).to eq("pending")
    end
  end
end
