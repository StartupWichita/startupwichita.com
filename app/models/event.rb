class Event < ActiveRecord::Base
  acts_as :topic

  validates :starts_at, presence: true
  validates :ends_at, presence: true
  validates :address, presence: true

end
