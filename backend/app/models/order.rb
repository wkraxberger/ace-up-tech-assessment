class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  accepts_nested_attributes_for :order_items

  validates :customer_name, presence: true
  validates :customer_email, presence: true
  validates :status, presence: true
end
