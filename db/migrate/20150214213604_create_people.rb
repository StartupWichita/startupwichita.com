class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.belongs_to :user, index: true
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :website
      t.string :company_name
      t.string :title
      t.string :twitter_username
      t.text :bio
      t.boolean :featured, default: false
      t.attachment :avatar
      t.string :slug
      t.boolean :allow_contact, :default => true

      t.timestamps
    end

    add_index :people, :slug, unique: true
  end
end
