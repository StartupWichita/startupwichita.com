# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#

require 'rails_helper'

describe User, type: :model do
  let(:user) { FactoryGirl.create(:user) }

  describe 'User.name' do
    context 'when person is nil' do
      it 'should give "Unknown User"' do
        user = FactoryGirl.create(:user, person: nil)
        expect(user.name).to eq('Unknown Person')
      end
    end
    context 'when person is not nil' do
      it 'should give name' do
        user = FactoryGirl.create(:user)
        user.person = FactoryGirl.create(:person)
        expect(user.name).to eq(user.person.full_name)
      end
    end
  end
end
