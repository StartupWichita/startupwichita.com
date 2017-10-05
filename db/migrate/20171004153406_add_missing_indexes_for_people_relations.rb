class AddMissingIndexesForPeopleRelations < ActiveRecord::Migration
  def change
    add_index :news_people, :person_id
    add_index :events_people, :person_id
  end
end
