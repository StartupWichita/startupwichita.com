class Topic < ActiveRecord::Base
  actable

  validates :title, presence: true
  validates :content, presence: true

  belongs_to :user
end
