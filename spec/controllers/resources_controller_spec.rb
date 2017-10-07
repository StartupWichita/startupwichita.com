require 'rails_helper'

describe ResourcesController, type: :controller do
  render_views

  context "unauthenticated" do

  end

  context "authenticated" do
    describe "#create" do
      context "success" do
        it "creates a Resource record" do
          user = build(:user)
          sign_in user
          count = Resource.count

          post :create, resource: FactoryGirl.attributes_for(:resource)

          expect(Resource.count).to eq(count + 1)
          expect(assigns(:resource).user).to eq(user)
          expect(response).to redirect_to(resource_path assigns(:resource).id)
        end
      end
    end

   describe "#destroy" do
         context "success" do
           it "allows admin to destroy resource" do
             admin = build(:user, admin: true)
             resource = create(:resource)
             sign_in(admin)

             delete :destroy, id: resource.id

             expect(response).to redirect_to(resources_path)
           end

           it "it allows user to delete their own resource" do
             user = build(:user, admin: false)
             resource = create(:resource, user: user)
             sign_in(user)

             delete :destroy, id: resource.id

             expect(response).to redirect_to(resources_path)

           end
         end

         context "failure" do
           it "prevent user from deleting a resource that isn't theirs" do
             user_1 = build(:user, admin: false)
             user_2 = build(:user, admin: false)
             resource = create(:resource, user: user_2)
             sign_in(user_1)

             delete :destroy, id: resource.id

             expect(response).to redirect_to(resource_path(resource))
           end
         end
       end
  end
end
