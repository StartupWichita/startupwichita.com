require 'rails_helper'

describe NewsController, type: :controller do
  render_views

  context "unauthenticated" do

  end

  context "authenticated" do
    let(:user) { FactoryGirl.create(:user) }
    let(:news) { FactoryGirl.create(:news) }

    before(:each) do
      request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end

    describe "#create" do
      context "success" do
        it "creates a News record" do
          post :create, news: FactoryGirl.attributes_for(:news)

          expect(assigns(:news)).to_not be_a_new(News)
        end
      end
    end

    describe "#destroy" do
      let(:news) { FactoryGirl.create(:news) }

      context "success" do
        it "succeeds" do
          delete :destroy, id: news.id

          expect(response).to redirect_to(news_index_path)
        end
      end
    end
  end
end
