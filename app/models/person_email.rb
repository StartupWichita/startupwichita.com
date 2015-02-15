class PersonEmail < ActiveRecord::Base
  belongs_to :person

  after_create :send_email

  validate_presence_of :sender_name, :sender_email, :message

  def send_email
    PersonMailer.public_contact(self).deliver
  end
end
