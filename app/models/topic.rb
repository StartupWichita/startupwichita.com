# == Schema Information
#
# Table name: topics
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  title        :string(255)
#  content      :string(255)
#  url          :string(255)
#  spam         :boolean
#  created_at   :datetime
#  updated_at   :datetime
#  actable_id   :integer
#  actable_type :string(255)
#

class Topic < ActiveRecord::Base
  actable

  validates :title, presence: true
  validates :content, presence: true

  belongs_to :user
end
