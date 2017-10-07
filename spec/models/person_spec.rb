RSpec.describe Person do
  let(:existing_person) { create(:person) }

  describe '#update_profile_score' do
    let(:new_person) { create(:person) }

    it 'updates the score after create' do
      expect(new_person.profile_score).to_not eq(0)
    end

    it 'updates the score after an update' do
      expect { existing_person.update_attributes(avatar_file_name: nil) }.to change { existing_person.profile_score }.from(96).to(95)
    end
  end

  describe '#default_scope' do
    let!(:missing_email_phone) { create(:person) }
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
