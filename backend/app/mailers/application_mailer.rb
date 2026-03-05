class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_FROM", "orders@aceup.com")
  layout "mailer"
end
