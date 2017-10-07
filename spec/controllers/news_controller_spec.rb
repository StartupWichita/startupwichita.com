require 'rails_helper'

describe NewsController, type: :controller do
  render_views

  context "unauthenticated" do

  end

  context "authenticated" do
    describe "#create" do
      context "success" do
        it "creates a News record" do
          user = build(:user)
          sign_in user
          count = News.count

          post :create, news: FactoryGirl.attributes_for(:news)

          expect(News.count).to eq(count + 1)
          expect(assigns(:news).user).to eq(user)
          expect(response).to redirect_to(news_path assigns(:news).id)
        end
      end
    end

    describe "#destroy" do
      context "success" do
        it "allows admin to destroy news" do
          admin = build(:user, admin: true)
          news = create(:news)
          sign_in(admin)

          delete :destroy, id: news.id

          expect(response).to redirect_to(news_index_path)
        end

        it "it allows user to delete their own news" do
          user = build(:user, admin: false)
          news = create(:news, user: user)
          sign_in(user)

          delete :destroy, id: news.id

          expect(response).to redirect_to(news_index_path)

        end
      end

      context "failure" do
        it "prevents user from deleting news that isn't theirs" do
          user_1 = build(:user, admin: false)
          user_2 = build(:user, admin: false)
          news = create(:news, user: user_2)
          sign_in(user_1)

          delete :destroy, id: news.id

          expect(response).to redirect_to(news_path(news))
        end
      end
    end
  end
end
