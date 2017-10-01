RSpec.describe Person do
  let(:existing_person) { create(:person) }

  describe '#update_profile_score' do
    it 'updates the score after create' do
      new_person = Person.create(first_name: 'FirstName', last_name: 'LastName')

      expect(new_person.profile_score).to eq(15)
    end

    it 'updates the score after an update' do
      old_score = existing_person.profile_score
      existing_person.update_attributes(avatar_file_name: nil)

      expect(existing_person.profile_score).to eq(
        old_score - described_class::SCORING_GUIDE[:avatar_file_name]
      )
    end
  end

  describe '#default_scope' do
    let!(:missing_email_phone) { create(:person, email: nil, phone: nil) }
    let!(:first_featured_person) { create(:person, featured: true) }
    let!(:second_featured_person) { create(:person, featured: true) }

    it 'orders by profile score followed by updated_at' do
      expect(Person.first).to eq(second_featured_person)
      expect(Person.last).to eq(missing_email_phone)

      # Emulate an 'update'
      first_featured_person.touch
      expect(Person.first).to eq(first_featured_person)
    end
  end

  describe '#completed_profile?' do

    it 'has incomplete profile' do
      expect(existing_person.completed_profile?).to eql(false)
    end

    it 'has incomplete profile with one topic' do
      FactoryGirl.create(:news, user: existing_person.user)

      expect(existing_person.completed_profile?).to eql(false)
    end

    it 'has incomplete profile with no avatar' do
      existing_person.update_attributes(avatar_file_name: nil)

      expect(existing_person.completed_profile?).to eql(false)
    end

    it 'has completed profile with long bio' do
      existing_person.bio = 'Software engineer participating in Hackoberfest and trying to have a long bio!'
      expect(existing_person.completed_profile?).to eql(true)
    end

    it 'has completed profile with three topics' do
      1.upto(3).each do |i|
        FactoryGirl.create(:news, user: existing_person.user)
      end

      expect(existing_person.completed_profile?).to eql(true)
    end

  end
end
