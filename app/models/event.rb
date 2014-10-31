class Event < ActiveRecord::Base
  acts_as :topic

  validates :startTime, presence: true
  validates :endTime, presence: true
  validates :address, presence: true

end
