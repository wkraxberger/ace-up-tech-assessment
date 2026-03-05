class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  accepts_nested_attributes_for :order_items

  validates :customer_name, presence: true
  validates :customer_email, presence: true
  validates :status, presence: true
  validate :no_duplicate_products

  private

  def no_duplicate_products
    duplicates = order_items.group_by(&:product_id).select { |_, v| v.size > 1 }
    if duplicates.any?
      errors.add(:base, "Cannot add the same product twice")
    end
  end
end
