require 'spec_helper'

describe Topic, type: :model do
  let(:topic) { FactoryGirl.create(:topic) }

  it { expect validate_presence_of(:title) }
  it { expect validate_presence_of(:content) }
end