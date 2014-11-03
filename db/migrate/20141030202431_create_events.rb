class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.datetime :starts_at
      t.datetime :ends_at
      t.string :address
    end
  end
end
