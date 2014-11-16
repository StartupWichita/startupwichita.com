require 'spec_helper'

describe PeopleController, type: :controller do
  render_views

  context "unauthenticated" do
    describe "#index" do
      it "shows a list of all users in the system" do
        expect(User).to receive(:all)

        get :index
      end
    end
  end
end
