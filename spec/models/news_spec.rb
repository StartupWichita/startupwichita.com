# == Schema Information
#
# Table name: news
#
#  id :integer          not null, primary key
#

require 'spec_helper'

describe News, type: :model do
  let(:news) { FactoryGirl.create(:news) }
end
