class CreatePersonEmails < ActiveRecord::Migration
  def change
    create_table :person_emails do |t|
      t.belongs_to :person, index: true
      t.string :recipient_email

      t.string :sender_name
      t.string :sender_email
      t.string :sender_phone

      t.text :message

      t.timestamps
    end
  end
end
