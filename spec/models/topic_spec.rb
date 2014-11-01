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

require 'spec_helper'

describe Topic, type: :model do
  let(:topic) { FactoryGirl.create(:topic) }

  it { expect validate_presence_of(:title) }
  it { expect validate_presence_of(:content) }
end
