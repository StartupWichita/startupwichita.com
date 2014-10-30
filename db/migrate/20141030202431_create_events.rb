class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.date :startTime
      t.date :endTime
      t.string :address
    end
  end
end
