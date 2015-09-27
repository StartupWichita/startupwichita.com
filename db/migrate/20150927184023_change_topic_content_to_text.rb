class ChangeTopicContentToText < ActiveRecord::Migration
  def change
    change_column :topics, :content, :text
  end
end
