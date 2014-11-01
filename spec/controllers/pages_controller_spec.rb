require 'spec_helper'

describe PagesController, type: :controller do
  render_views

  it "#index" do
    get :index

    expect(response).to render_template(:index)
    expect(response).to have_http_status(:success)
  end
end
