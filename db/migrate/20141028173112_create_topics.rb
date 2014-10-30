class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics, :as_relation_superclass => true do |t|
      t.string :title
      t.string :content
      t.string :url
      t.boolean :spam
      t.belongs_to :user

      t.timestamps
    end
  end
end
