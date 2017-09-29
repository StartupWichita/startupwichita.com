class AddIndexesForSpeedingUpPeopleLoad < ActiveRecord::Migration
  def change
    add_index :people, :featured
    add_index :taggings, :context
  end
end
