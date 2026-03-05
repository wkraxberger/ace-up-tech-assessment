class OrderMailer < ApplicationMailer

  def confirmation(order)
    @order = order
    mail(to: order.customer_email, subject: "Confirmation for order ##{order.id}")
  end
end
