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
      expect(json["total_price"].to_f).to eq(40.00)
    end

    it "returns errors when the name is invalid" do
      post "/orders", params: {
        order: { customer_name: "", customer_email: "john@doe.com", status: "pending" }
      }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to be_present
    end

    it "returns errors when the email is invalid" do
      post "/orders", params: {
        order: { customer_name: "John Doe", customer_email: "", status: "pending" }
      }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to be_present
    end

    it "returns errors when the status is invalid" do
      post "/orders", params: {
        order: { customer_name: "John Doe", customer_email: "john@doe.com", status: "" }
      }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to be_present
    end

    it "rejects order if there are duplicate products" do
      post "/orders", params: {
        order: {
          customer_name: "John Doe",
          customer_email: "john@doe.com",
          status: "pending",
          order_items_attributes: [
            { product_id: product.id, quantity: 1 },
            { product_id: product.id, quantity: 3 }
          ]
        }
      }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
