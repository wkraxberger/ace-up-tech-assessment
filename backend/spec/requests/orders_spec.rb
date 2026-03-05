require 'rails_helper'

RSpec.describe "Orders", type: :request do
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
