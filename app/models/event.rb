# == Schema Information
#
# Table name: events
#
#  id        :integer          not null, primary key
#  starts_at :datetime
#  ends_at   :datetime
#  address   :string(255)
#

class Event < ActiveRecord::Base
  acts_as :topic

  validates :starts_at, presence: true
  validates :ends_at, presence: true
  validates :address, presence: true
end
