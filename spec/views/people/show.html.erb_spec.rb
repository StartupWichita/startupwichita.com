require 'spec_helper'

RSpec.describe "people/show", :type => :view do
  let(:user) { FactoryGirl.create(:user) }
  before(:each) do
    sign_in(user)
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
    assign(:person_email, PersonEmail.new)
  end

  it "renders the correct form attributes" do
    render
    assert_select 'input[name=person_email[sender_name]]', 1
    assert_select 'input[name=person_email[sender_email]]', 1
    assert_select 'input[name=person_email[sender_phone]]', 1
    assert_select 'input[name=person_email[message]]', 1
  end
end
