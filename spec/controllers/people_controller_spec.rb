require 'rails_helper'

RSpec.describe PeopleController, :type => :controller do

  def valid_attributes
    attributes_for(:person)
  end

  def invalid_attributes
    { first_name: "Bob", last_name: nil }
  end

  def person_slug(person)
    "#{person.first_name}-#{person.last_name}".downcase
  end

  describe "GET index" do
    it "correctly assigns featured and non featured people" do
      featured_person = create(:person, featured: true)
      non_featured_person = create(:person, featured: false)

      get :index
      expect(assigns(:featured_people)).to eq([featured_person])
      expect(assigns(:people)).to eq([non_featured_person])
    end

    it "correctly filters people when given a tag" do
      tag = 'full stack developer'
      tagged_person = create(:person, role_list: [tag])
      un_tagged_person = create(:person, role_list: [])

      get :index, tag: tag

      expect(assigns(:people)).to eq([tagged_person])
    end
  end

  describe "GET show" do
    it "assigns the requested person as @person and @person_email" do
      person = create(:person)
      person_email = create(:person_email, person: person)

      get :show, slug: person_slug(person)

      expect(assigns(:person)).to eq(person)
      expect(assigns(:person_email)).to be_a PersonEmail
    end
  end


  describe "POST create" do
    context "as an admin" do
      describe "with valid params" do
        it "creates a new Person" do
          person = build(:person)
          admin = build(:user, admin: true)
          sign_in(admin)
          count = Person.count

          post :create, person: valid_attributes

          expect(Person.count).to eq(count + 1)
          expect(response).to redirect_to profile_path(slug: person_slug(person))
        end
      end

      describe "with invalid params" do
        it "does not create a new Person" do
          admin = build(:user, admin: true)
          sign_in(admin)
          count = Person.count

          post :create, person: invalid_attributes

          expect(Person.count).to eq(count)
          expect(response).to render_template :new
        end
      end
    end

      context "as a non-admin" do
        describe "when logged in as a user" do
          it "does not create a new user" do
            user = build(:user, admin: false)
            sign_in(user)
            count = Person.count

            post :create, person: valid_attributes

            expect(Person.count).to eq(count)
            expect(response).to redirect_to people_path
          end
        end

        describe "when not not logged in" do
          it "redirects to sign_in page" do
            sign_in nil

            post :create, person: valid_attributes

            expect(response).to redirect_to new_user_session_path
          end
        end
      end
    end

    describe "PUT update" do
      let(:person) { create(:person, first_name: 'Bob', last_name: 'Smith')}

      describe "when not logged in" do
        it "redirects to sign in page" do
          put :update, id: person.id, person: { first_name: "Updated First Name"}
          person.reload

          expect(person.first_name).to eq "Bob"
          expect(response).to redirect_to new_user_session_path
        end
      end

      describe "with valid params" do
        it "lets admin update the requested person" do
          admin = build(:user, admin: true)
          sign_in(admin)

          put :update, { id: person.id, person: { first_name: 'Updated First Name' }}
          person.reload

          expect(person.first_name).to eq 'Updated First Name'
          expect(person.last_name).to eq 'Smith'
        end

        it "lets signed in person update their own profile" do
          user = build(:user, admin: false, id: person.user_id)
          sign_in(user)

          put :update, { id: person.id, person: { first_name: 'Updated First Name'}}
          person.reload

          expect(person.first_name).to eq 'Updated First Name'
          expect(person.last_name).to eq 'Smith'
        end

        it "prevents signed in person from updating someone else's profile" do
          person_2 = create(:person, first_name: "Test")
          user = build(:user, admin: false, id: person.user_id)
          sign_in(user)

          put :update, { id: person_2.id, person: {first_name: "Bob" }}

          expect(person_2.first_name).to eq "Test"
          expect(response).to redirect_to people_path
        end
      end

      describe "with invalid params" do
        it "does not update person" do
          admin = build(:user, admin: true)
          sign_in(admin)

          put :update, {id: person.id, person: {last_name: nil }}
          person.reload

          expect(person.last_name).to eq "Smith"
          expect(response).to render_template :edit
        end
      end
    end

  describe "GET claim" do
    it "correctly assigns person" do
      person = create(:person)

      get :claim, { slug: person_slug(person) }

      expect(assigns(:person)).to eq person
    end
  end

  describe "POST claim_people" do
     # Not sure what is happening here but I feel like a lot of the logic
     # should be moved out of the controller
  end

  describe "GET feed" do
    it "correctly responds to rss format" do
      person = create(:person)

      get :feed, format: :rss

      expect(response.content_type).to include('application/rss+xml')
      expect(response).to render_template 'feed'
    end
  end
end
