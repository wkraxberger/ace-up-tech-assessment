class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.string :customer_name
      t.string :customer_email
      t.integer :quantity
      t.decimal :total_price
      t.string :status

      t.timestamps
    end
  end
end
