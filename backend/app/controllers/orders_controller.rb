class OrdersController < ApplicationController
  def index
    orders = Order.includes(order_items: :product).order(created_at: :desc)
    render json: orders
  end

  def show
    order = Order.includes(order_items: :product).find(params[:id])
    render json: order
  end

  private

  def order_params
    params.require(:order).permit(
      :customer_name,
      :status,
      order_items_attributes: [:product_id, :quantity]
    )
  end
end
