require 'spec_helper'

describe VotesController, type: :controller do
  render_views
  let(:votable_owner) { FactoryGirl.create(:user) }
  let(:votable) { FactoryGirl.create(:event, user: votable_owner) }

  context "authenticated" do
    let(:user) { FactoryGirl.create(:user) }
    let(:my_votable) { FactoryGirl.create(:event, user: user) }

    before(:each) do
      request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end

    describe "#create" do
      it "upvotes item the current user cannot edit" do
        expect(user.voted_up_on?(votable)).to eq(false)

        post :create, upvote: 1, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:ok)
        expect(user.voted_up_on?(votable)).to eq(true)
      end

      it "does not upvote item the current user can edit" do
        expect(user.voted_up_on?(my_votable)).to eq(false)

        post :create, upvote: 1, votable_type: my_votable.class.name, votable_id: my_votable.id

        expect(response).to have_http_status(:forbidden)
        expect(user.voted_up_on?(my_votable)).to eq(false)
      end

      it "downvotes item the current user cannot edit" do
        expect(user.voted_down_on?(votable)).to eq(false)

        post :create, downvote: 1, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:ok)
        expect(user.voted_down_on?(votable)).to eq(true)
      end

      it "does not downvote item the current user can edit" do
        expect(user.voted_down_on?(my_votable)).to eq(false)

        post :create, downvote: 1, votable_type: my_votable.class.name, votable_id: my_votable.id

        expect(response).to have_http_status(:forbidden)
        expect(user.voted_down_on?(my_votable)).to eq(false)
      end
    end

    describe "#destroy" do
      it "removes an upvote" do
        votable.liked_by user
        expect(user.voted_for?(votable)).to eq(true)

        delete :destroy, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:ok)
        expect(user.voted_for?(votable)).to eq(false)
      end

      it "removes a downvote" do
        votable.disliked_by user
        expect(user.voted_for?(votable)).to eq(true)

        delete :destroy, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:ok)
        expect(user.voted_for?(votable)).to eq(false)
      end
    end
  end

  context "unauthenticated" do
    describe "#create" do
      it "redirects" do
        post :create, upvote: 1, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:redirect)
      end
    end

    describe "#destroy" do
      it "redirects" do
        delete :destroy, votable_type: votable.class.name, votable_id: votable.id

        expect(response).to have_http_status(:redirect)
      end
    end
  end
end
