class CreateEventsPeople < ActiveRecord::Migration
  def change
    create_table :events_people do |t|
      t.integer :event_id
      t.integer :person_id
    end
  end
end
