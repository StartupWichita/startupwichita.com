class CreateNewsPersonsTable < ActiveRecord::Migration
  def change
    create_table :news_people do |t|
      t.integer :news_id
      t.integer :person_id
    end
  end
end
