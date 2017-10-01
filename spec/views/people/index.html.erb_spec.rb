require 'spec_helper'

RSpec.describe "people/index", :type => :view do
  before(:each) do
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
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "First Name".to_s, :count => 2
    assert_select "tr>td", :text => "Last Name".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Website".to_s, :count => 2
    assert_select "tr>td", :text => "Company Name".to_s, :count => 2
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Twitter Username".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
  end
end
