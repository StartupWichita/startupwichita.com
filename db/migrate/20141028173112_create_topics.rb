class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.belongs_to :user

      t.string :title
      t.string :content
      t.string :url
      t.boolean :spam

      t.timestamps
      t.actable
    end
  end
end
