class AddContactOptInToUsers < ActiveRecord::Migration
  def change
    add_column :users, :allow_contact, :boolean, :default => true
  end
end
