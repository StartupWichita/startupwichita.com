class AddDimensionsToNewsImage < ActiveRecord::Migration
  def change
    add_column :news, :image_width, :integer
    add_column :news, :image_height, :integer
  end
end
