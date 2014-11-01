# == Schema Information
#
# Table name: events
#
#  id        :integer          not null, primary key
#  starts_at :datetime
#  ends_at   :datetime
#  address   :string(255)
#

require 'spec_helper'

describe Event, type: :model do
  let(:event) { FactoryGirl.create(:event) }

  it { expect validate_presence_of(:starts_at) }
  it { expect validate_presence_of(:ends_at) }
  it { expect validate_presence_of(:address) }
end
