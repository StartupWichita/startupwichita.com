# == Schema Information
#
# Table name: events
#
#  id        :integer          not null, primary key
#  starts_at :datetime
#  ends_at   :datetime
#  address   :string(255)
#

require 'rails_helper'

describe Event, type: :model do
  let(:event) { FactoryGirl.create(:event) }

  it { expect validate_presence_of(:starts_at) }
  it { expect validate_presence_of(:ends_at) }
  it { expect validate_presence_of(:address) }

  describe '.coming_soon' do
    let(:event_one) { FactoryGirl.create(:event, starts_at: 24.hours.ago, ends_at: 1.hour.ago) }
    let(:event_two) { FactoryGirl.create(:event, starts_at: 24.hours.ago, ends_at: 1.hour.from_now) }

    it 'should only return current and future Events' do
      expect(Event.upcoming).to eq [ event_two ]
    end
  end
end
