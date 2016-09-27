class AddTimestampsToNews < ActiveRecord::Migration
  def change
    add_timestamps(:news)
  end
end
