class AddImageToNews < ActiveRecord::Migration
  def change
    add_column :news, :image, :string
  end
end
