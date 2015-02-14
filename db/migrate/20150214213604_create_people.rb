class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.belongs_to :user, index: true
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :website
      t.string :company_name
      t.string :title
      t.string :twitter_username
      t.text :bio
      t.attachment :avatar

      t.timestamps
    end
  end
end
