class OrderService
  def self.create(params)
    order = Order.new(params)

    if order.save
      # This would send the email but it is set to test as we don't have an email client nor domain
      OrderMailer.confirmation(order).deliver_later
    end

    order
  end
end
