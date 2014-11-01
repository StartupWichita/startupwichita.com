require 'spec_helper'

describe ResourcesController, type: :controller do
  render_views

  context "unauthenticated" do

  end

  context "authenticated" do
    let(:user) { FactoryGirl.create(:user) }
    let(:resource) { FactoryGirl.create(:resource) }

    before(:each) do
      request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end

    describe "#create" do
      context "success" do
        it "creates a Resource record" do
          post :create, resource: FactoryGirl.attributes_for(:resource)

          expect(assigns(:resource)).to_not be_a_new(Resource)
        end
      end
    end

    describe "#destroy" do
      let(:resource) { FactoryGirl.create(:resource) }

      context "success" do
        it "succeeds" do
          delete :destroy, id: resource.id

          expect(response).to redirect_to(resources_path)
        end
      end
    end
  end
end
