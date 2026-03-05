require 'rails_helper'

RSpec.describe "Products", type: :request do
  describe "GET /products" do
    it "returns all products" do
      Product.create!(name: "Mouse", sku: "MS123", price: 25.00)
      Product.create!(name: "Keyboard", sku: "KB123", price: 50.00)

      get "/products"

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
    end
  end

  describe "POST /products" do
    it "creates a product" do
      post "/products", params: {
        product: { name: "Webcam", sku: "WC001", price: 35.00 }
      }, as: :json

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Webcam")
      expect(json["price"].to_f).to eq(35.00)
    end
  end

  describe "DELETE /products/:id" do
    it "deletes a product" do
      product = Product.create!(name: "Mouse", sku: "MS123", price: 25.00)

      delete "/products/#{product.id}"

      expect(response).to have_http_status(:no_content)
      expect(Product.count).to eq(0)
    end
  end
end
