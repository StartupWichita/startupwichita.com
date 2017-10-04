require 'spec_helper'

RSpec.describe "people/index", :type => :view do
  before(:each) do
    assign(:featured_people, [])
    assign(:people, [
      Person.create!(
        :user => nil,
        :first_name => "First Name",
        :last_name => "Last Name",
        :email => "Email",
        :website => "Website",
        :company_name => "Company Name",
        :title => "Title",
        :twitter_username => "Twitter Username",
        :bio => "MyText",
        :avatar => ""
      ),
      Person.create!(
        :user => nil,
        :first_name => "First Name",
        :last_name => "Last Name",
        :email => "Email",
        :website => "Website",
        :company_name => "Company Name",
        :title => "Title",
        :twitter_username => "Twitter Username",
        :bio => "MyText",
        :avatar => ""
      )
    ])
  end

  it "renders a list of people" do
    render
    assert_select "div.profile", :count => 2
  end
end
