FactoryGirl.define do  factory :person_email do
    person nil
recipient_email "MyString"
sender_email "MyString"
message "MyText"
sender_phone "MyString"
  end
  factory :person_role do
    name "MyString"
  end
  factory :person do
    user nil
first_name "MyString"
last_name "MyString"
email "MyString"
website "MyString"
company_name "MyString"
title "MyString"
twitter_username "MyString"
bio "MyText"
avatar ""
  end

  factory :user do
    sequence(:email) { |n| "test-#{n}@startupwichita.com" }
    password 'f4k3p455w0rd'
    password_confirmation 'f4k3p455w0rd'
  end

  factory :event do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
    starts_at Time.now
    ends_at 3.hours.from_now
    address '216 N Mosley, Suite 120, Wichita, KS 67226'
  end

  factory :news do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end

  factory :resource do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end

  factory :topic do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end
end
