class AddDimensionsToEventImage < ActiveRecord::Migration
  def change
    add_column :events, :image_width, :integer
    add_column :events, :image_height, :integer
  end
end
