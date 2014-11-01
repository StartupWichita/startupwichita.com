# == Schema Information
#
# Table name: events
#
#  id        :integer          not null, primary key
#  starts_at :datetime
#  ends_at   :datetime
#  address   :string(255)
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
