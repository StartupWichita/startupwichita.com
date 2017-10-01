class UserMailer < ActionMailer::Base
  default from: "pleasereply@startupwichita.com"

  def contact_user(user, name, message)
    @user = user
    @name = name
    @message = message
    mail(to: @user.email, subject: "StartupWichita: Contact Request from " + name)
  end

  def password_reset(user, password)
    @user = user
    @password = password
    mail(:to => user.email,
         :subject => 'Password Reset Notification')
  end

  def indicate(indication, user)
    @indication = indication
    @user       = user

    mail(to: user.email, subject: "#{indication.questionable_type} ##{indication.questionable_id} flagged as spam (notice #{indication.questionable.indications.count})")
  end
end
