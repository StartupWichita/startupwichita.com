require 'spec_helper'

RSpec.describe Company, :type => :model do
  describe 'Validations' do
    it { is_expected.to validate_presence_of :name }
  end
end
