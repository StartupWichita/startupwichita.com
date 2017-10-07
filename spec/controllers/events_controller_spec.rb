require 'rails_helper'

describe EventsController, type: :controller do
  render_views

  context "unauthenticated" do
    describe "#index" do
      it "shows a list of current and future Events" do
        expect(Event).to receive(:upcoming)
        get :index
      end
    end

    describe "#destroy" do
      it "prevents people not signed in from deleting events" do
        event = create(:event)

        delete :destroy, id: event.id

        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  context "authenticated" do
    describe "#create" do
      context "success" do
        it "creates an Event" do
          user = build(:user)
          event = create(:event)
          request.env["devise.mapping"] = Devise.mappings[:user]
          sign_in user

          post :create, event: FactoryGirl.attributes_for(:event)

          expect(assigns(:event)).to_not be_a_new(Event)
        end
      end
    end

    describe "#destroy" do
      context "success" do
        it "allows admin to destroy event" do
          admin = build(:user, admin: true)
          event = create(:event)
          sign_in(admin)

          delete :destroy, id: event.id

          expect(response).to redirect_to(events_path)
        end

        it "it allows user to delete their own event" do
          user = build(:user, admin: false)
          event = create(:event, user: user)
          sign_in(user)

          delete :destroy, id: event.id

          expect(response).to redirect_to(events_path)

        end
      end

      context "failure" do
        it "prevents user from deleting an event that isn't theirs" do
          user_1 = build(:user, admin: false)
          user_2 = build(:user, admin: false)
          event = create(:event, user: user_2)
          sign_in(user_1)

          delete :destroy, id: event.id

          expect(response).to redirect_to(event_path(event))
        end
      end
    end
  end
end
