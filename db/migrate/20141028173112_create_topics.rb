class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title
      t.string :content
      t.string :url
      t.boolean :spam
      t.belongs_to :user

      t.timestamps
      t.actable
    end
  end
end
