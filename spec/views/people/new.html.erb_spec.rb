require 'rails_helper'

RSpec.describe "people/new", :type => :view do
  before(:each) do
    assign(:person, Person.new(
      :user => nil,
      :first_name => "MyString",
      :last_name => "MyString",
      :email => "MyString",
      :website => "MyString",
      :company_name => "MyString",
      :title => "MyString",
      :twitter_username => "MyString",
      :bio => "MyText",
      :avatar => ""
    ))
  end

  it "renders new person form" do
    render

    assert_select "form[action=?][method=?]", people_path, "post" do

      assert_select "input#person_user_id[name=?]", "person[user_id]"

      assert_select "input#person_first_name[name=?]", "person[first_name]"

      assert_select "input#person_last_name[name=?]", "person[last_name]"

      assert_select "input#person_email[name=?]", "person[email]"

      assert_select "input#person_website[name=?]", "person[website]"

      assert_select "input#person_company_name[name=?]", "person[company_name]"

      assert_select "input#person_title[name=?]", "person[title]"

      assert_select "input#person_twitter_username[name=?]", "person[twitter_username]"

      assert_select "textarea#person_bio[name=?]", "person[bio]"

      assert_select "input#person_avatar[name=?]", "person[avatar]"
    end
  end
end
