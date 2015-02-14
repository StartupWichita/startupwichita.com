class AddInterestsToPeople < ActiveRecord::Migration
  def change
    add_column :people, :interests, :string
  end
end
