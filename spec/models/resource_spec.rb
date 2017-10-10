# == Schema Information
#
# Table name: resources
#
#  id :integer          not null, primary key
#

require 'rails_helper'

describe Resource, type: :model do
  let(:resource) { FactoryGirl.create(:resource) }
end
