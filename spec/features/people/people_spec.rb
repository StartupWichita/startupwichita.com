require 'rails_helper'

RSpec.feature "People", type: :feature do
  context "user logged in as admin" do

    before(:each) do
      admin = create(:user, admin: true)
      sign_in(admin)
    end

    scenario "Can edit a person" do
      person = create(:person, email: "test-567@test.com")
      last_name = person.last_name

      visit profile_path(person)
      expect(page).to have_content last_name

      click_link "Edit"

      expect(page).to have_text "Featured Person"

      fill_in "person_last_name", with: "New Last Name!"
      click_button "Update Person"

      expect(page).not_to have_content last_name
      expect(page).to have_css(".title", :text => "#{person.first_name} New Last Name!")
    end

    scenario "Can create a person" do
      visit people_path

      expect(page).to have_css(".btn", :text => 'Add a new person')
      click_link 'Add a new person'

      expect(page).to have_css "form#new_person"

      fill_in "person_first_name", with: "Test"
      fill_in "person_last_name", with: "Person"
      fill_in "person_email", with: "test1234@test.com"

      click_button "Create Person"

      expect(page).to have_css(".title", :text => "Test Person")
    end
  end

  context "user logged in as non-admin" do
      before(:each) do
        @user = create(:user, admin: false)
        sign_in(@user)
      end

    scenario "can edit their own profile" do
      person = create(:person, email: "test-567@test.com", user: @user)
      last_name = person.last_name

      visit profile_path(person)

      expect(page).to have_content last_name
      expect(page).to have_css(".btn", :text => "Edit")
      click_link "Edit"

      expect(page).to_not have_text "Featured Person"

      fill_in "person_last_name", with: "New Last Name!"
      click_button "Update Person"

      expect(page).not_to have_content last_name
      expect(page).to have_css(".title", :text => "#{person.first_name} New Last Name!")
    end

    scenario "cannot edit another person's page" do
      person = create(:person)

      visit profile_path(person)

      expect(page).to_not have_css(".btn", :text => "Edit")
    end

    scenario "cannot create a new person" do
      visit people_path

      expect(page).to_not have_css(".btn", :text => 'Add a new person')
    end
  end
end
