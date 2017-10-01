class CreateIndications < ActiveRecord::Migration
  def change
    create_table :indications do |t|
      t.integer :questionable_id
      t.string :questionable_type
      t.integer :user_id

      t.timestamps
    end
  end
end
