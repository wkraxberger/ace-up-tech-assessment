class AddUnitPriceToOrderItems < ActiveRecord::Migration[7.2]
  def change
    add_column :order_items, :unit_price, :decimal
  end
end
