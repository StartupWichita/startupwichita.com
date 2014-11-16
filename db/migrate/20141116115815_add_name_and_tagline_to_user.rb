class AddNameAndTaglineToUser < ActiveRecord::Migration
  def change
    add_column :users, :tagline, :string
    add_column :users, :bio, :text
    add_column :users, :name, :string
  end
end
