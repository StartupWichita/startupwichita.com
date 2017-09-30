require 'rails_helper'

describe AtWhoController, type: :controller do
  render_views

  describe ".index" do
    it "returns a list of profiles" do
      create :person, first_name: 'Alice', last_name: 'Aaronson'
      create :person, first_name: 'Bob', last_name: 'Brown'

      get :index

      expect(response.body).to include_unordered_json [
        {
          slug: 'alice-aaronson',
          full_name: 'Alice Aaronson',
        },
        {
          slug: 'bob-brown',
          full_name: 'Bob Brown',
        }
      ]
    end
  end
end
