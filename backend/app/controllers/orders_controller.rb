class OrdersController < ApplicationController
  def index
    orders = Order.includes(order_items: :product).order(created_at: :desc)
    render json: orders, include: { order_items: { include: :product } }
  end

  def show
    order = Order.includes(order_items: :product).find(params[:id])
    render json: order, include: { order_items: { include: :product } }
  end

  def create
    order = Order.new(order_params)

    if order.save
      render json: order, status: :created
    else
      render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(
      :customer_name,
      :customer_email,
      :status,
      order_items_attributes: [:product_id, :quantity]
    )
  end
end
