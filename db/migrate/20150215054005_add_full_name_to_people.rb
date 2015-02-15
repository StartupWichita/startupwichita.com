class AddFullNameToPeople < ActiveRecord::Migration
  def change
    add_column :people, :full_name, :string
  end
end
