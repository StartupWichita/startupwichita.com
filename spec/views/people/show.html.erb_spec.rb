require 'rails_helper'

RSpec.describe "people/show", :type => :view do
  before(:each) do
    @person = assign(:person, Person.create!(
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
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/First Name/)
    expect(rendered).to match(/Last Name/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Website/)
    expect(rendered).to match(/Company Name/)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/Twitter Username/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(//)
  end
end
