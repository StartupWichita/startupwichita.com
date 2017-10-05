require 'spec_helper'

describe EventsController, type: :controller do
  render_views

  context "unauthenticated" do
    describe "#index" do
      it "shows a list of current and future Events" do
        expect(Event).to receive(:upcoming)
        expect(Event).to receive(:recent)
        expect(Event).to receive(:all)

        get :index
      end
    end
  end

  context "authenticated" do
    let(:user) { FactoryGirl.create(:user) }
    let(:event) { FactoryGirl.create(:event) }

    before(:each) do
      request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end

    describe "#create" do
      context "success" do
        it "creates an Event" do
          post :create, event: FactoryGirl.attributes_for(:event)

          expect(assigns(:event)).to_not be_a_new(Event)
        end
      end
    end

    describe "#destroy" do
      let(:topic) { FactoryGirl.create(:topic, user: user) }
      let(:event) { FactoryGirl.create(:event, topic: topic) }

      context "success" do
        it "succeeds" do
          delete :destroy, id: event.id

          expect(response).to redirect_to(events_path)
        end
      end
    end
  end
end
