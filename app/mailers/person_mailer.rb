require 'mail'
include ApplicationHelper

class PersonMailer < ActionMailer::Base
    def public_contact(person_email)      
      # Fields
      #   person_email.person
      #   person_email.recipient_email
      #   person_email.sender_name
      #   person_email.sender_email
      #   person_email.sender_phone
      #   person_email.message
      @person_email = person_email


      mail(from: "\"#{person_email.sender_name} (via. StartupWichita)\" <no-reply@startupwichita.com>", to: person_email.recipient_email, subject: "Message from #{person_email.sender_name}")
    end
end
